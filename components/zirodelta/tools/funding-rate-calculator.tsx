"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const INTERVALS: Record<string, { label: string; periodsPerDay: number }> = {
  "1h": { label: "1 Hour", periodsPerDay: 24 },
  "4h": { label: "4 Hours", periodsPerDay: 6 },
  "8h": { label: "8 Hours", periodsPerDay: 3 },
}

function fmt(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}

export function FundingRateCalculator() {
  const [positionSize, setPositionSize] = useState("10000")
  const [fundingRate, setFundingRate] = useState("0.01")
  const [interval, setInterval] = useState("8h")
  const [makerFee, setMakerFee] = useState("0.02")
  const [takerFee, setTakerFee] = useState("0.05")

  const results = useMemo(() => {
    const size = parseFloat(positionSize) || 0
    const rate = parseFloat(fundingRate) / 100
    const maker = parseFloat(makerFee) / 100
    const taker = parseFloat(takerFee) / 100
    const { periodsPerDay } = INTERVALS[interval]

    const perPeriod = size * rate
    const daily = perPeriod * periodsPerDay
    const weekly = daily * 7
    const monthly = daily * 30
    const yearly = daily * 365

    // Entry + exit fees (taker both sides by default)
    const totalFees = size * taker * 2

    return {
      perPeriod,
      daily,
      weekly,
      monthly,
      yearly,
      totalFees,
      netDaily: daily - (totalFees / 365),
      netWeekly: weekly - (totalFees / 52),
      netMonthly: monthly - (totalFees / 12),
      netYearly: yearly - totalFees,
      makerFeeAmt: size * maker,
      takerFeeAmt: size * taker,
    }
  }, [positionSize, fundingRate, interval, makerFee, takerFee])

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Position Size ($)</label>
          <Input
            type="number"
            value={positionSize}
            onChange={(e) => setPositionSize(e.target.value)}
            placeholder="10000"
            min="0"
            step="100"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Funding Rate (%)</label>
          <Input
            type="number"
            value={fundingRate}
            onChange={(e) => setFundingRate(e.target.value)}
            placeholder="0.01"
            step="0.001"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Funding Interval</label>
          <Select value={interval} onValueChange={setInterval}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INTERVALS).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fee inputs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Maker Fee (%)</label>
          <Input
            type="number"
            value={makerFee}
            onChange={(e) => setMakerFee(e.target.value)}
            placeholder="0.02"
            step="0.001"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Taker Fee (%)</label>
          <Input
            type="number"
            value={takerFee}
            onChange={(e) => setTakerFee(e.target.value)}
            placeholder="0.05"
            step="0.001"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Entry Fee (taker)</label>
          <div className="flex h-9 items-center rounded-md border border-input bg-muted/30 px-3 text-sm text-muted-foreground">
            ${fmt(results.takerFeeAmt)}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Total Fees (entry+exit)</label>
          <div className="flex h-9 items-center rounded-md border border-input bg-muted/30 px-3 text-sm text-muted-foreground">
            ${fmt(results.totalFees)}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([
          ["Per Period", results.perPeriod],
          ["Daily", results.daily],
          ["Weekly", results.weekly],
          ["Monthly", results.monthly],
        ] as const).map(([label, value]) => (
          <Card key={label} className="py-3">
            <CardContent className="px-4 py-0">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={`text-lg font-semibold tabular-nums ${value >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                ${fmt(value)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Net profit table */}
      <Card className="py-0">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm">Net Profit After Fees</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">Fees</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {([
                ["Daily", results.daily, results.totalFees / 365, results.netDaily],
                ["Weekly", results.weekly, results.totalFees / 52, results.netWeekly],
                ["Monthly", results.monthly, results.totalFees / 12, results.netMonthly],
                ["Yearly", results.yearly, results.totalFees, results.netYearly],
              ] as const).map(([period, gross, fees, net]) => (
                <TableRow key={period}>
                  <TableCell className="font-medium">{period}</TableCell>
                  <TableCell className="text-right tabular-nums">${fmt(gross as number)}</TableCell>
                  <TableCell className="text-right tabular-nums text-red-400">-${fmt(fees as number)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${(net as number) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    ${fmt(net as number)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
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

const INTERVALS: Record<string, { label: string; periodsPerYear: number }> = {
  "1h": { label: "1 Hour", periodsPerYear: 8760 },
  "4h": { label: "4 Hours", periodsPerYear: 2190 },
  "8h": { label: "8 Hours", periodsPerYear: 1095 },
}

const SCENARIOS = [
  { label: "Deep Negative", rate: -0.05, color: "text-red-400" },
  { label: "Neutral", rate: 0.01, color: "text-muted-foreground" },
  { label: "Moderate", rate: 0.03, color: "text-emerald-400" },
  { label: "Hot", rate: 0.1, color: "text-emerald-300" },
  { label: "Extreme", rate: 0.3, color: "text-yellow-400" },
]

function calcAPR(rate: number, periodsPerYear: number): number {
  return rate * periodsPerYear
}

function calcAPY(rate: number, periodsPerYear: number): number {
  return (Math.pow(1 + rate / 100, periodsPerYear) - 1) * 100
}

function fmtPct(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%"
}

export function APYEstimator() {
  const [rate, setRate] = useState(0.01)
  const [interval, setInterval] = useState("8h")

  const { periodsPerYear } = INTERVALS[interval]

  const { apr, apy } = useMemo(() => ({
    apr: calcAPR(rate, periodsPerYear),
    apy: calcAPY(rate, periodsPerYear),
  }), [rate, periodsPerYear])

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Funding Rate</label>
            <span className="text-sm font-semibold tabular-nums">{rate.toFixed(4)}%</span>
          </div>
          <Slider
            value={[rate]}
            onValueChange={([v]) => setRate(v)}
            min={-0.1}
            max={0.3}
            step={0.001}
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>-0.1%</span>
            <span>0%</span>
            <span>0.1%</span>
            <span>0.2%</span>
            <span>0.3%</span>
          </div>
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

      {/* APR vs APY cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="py-4">
          <CardContent className="px-4 py-0 text-center">
            <p className="text-xs text-muted-foreground mb-1">Simple APR</p>
            <p className={`text-3xl font-bold tabular-nums ${apr >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {fmtPct(apr)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">rate x {periodsPerYear} periods/yr</p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0 text-center">
            <p className="text-xs text-muted-foreground mb-1">Compounded APY</p>
            <p className={`text-3xl font-bold tabular-nums ${apy >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {fmtPct(apy)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">(1 + r)^{periodsPerYear} - 1</p>
          </CardContent>
        </Card>
      </div>

      {/* Scenario table */}
      <Card className="py-0">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm">Scenario Comparison</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scenario</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">APR</TableHead>
                <TableHead className="text-right">APY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SCENARIOS.map((s) => (
                <TableRow key={s.label}>
                  <TableCell className={`font-medium ${s.color}`}>{s.label}</TableCell>
                  <TableCell className="text-right tabular-nums">{s.rate}%</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtPct(calcAPR(s.rate, periodsPerYear))}</TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${s.color}`}>
                    {fmtPct(calcAPY(s.rate, periodsPerYear))}
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

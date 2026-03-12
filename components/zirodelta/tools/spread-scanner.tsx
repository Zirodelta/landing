"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { RefreshCw, WifiOff } from "lucide-react"

interface Rate {
  exchange: string
  symbol: string
  funding_rate: number
  last_updated: string
}

interface APIResponse {
  success: boolean
  data: { rates: Rate[] }
  meta?: { timestamp: string; version: string; fallback?: boolean }
}

export function SpreadScanner() {
  const [rates, setRates] = useState<Rate[]>([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [exchangeFilter, setExchangeFilter] = useState("all")
  const [pairFilter, setPairFilter] = useState("all")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchRates = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/funding-rates", { cache: "no-store" })
      if (!res.ok) {
        setOffline(true)
        setRates([])
        return
      }
      const json: APIResponse = await res.json()
      if (json.meta?.fallback) {
        setOffline(true)
        setRates([])
        return
      }
      setOffline(false)
      setRates(json.data.rates)
    } catch {
      setOffline(true)
      setRates([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
  }, [fetchRates])

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchRates, 30_000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoRefresh, fetchRates])

  const exchanges = [...new Set(rates.map((r) => r.exchange))].sort()
  const pairs = [...new Set(rates.map((r) => r.symbol))].sort()

  const filtered = rates
    .filter((r) => exchangeFilter === "all" || r.exchange === exchangeFilter)
    .filter((r) => pairFilter === "all" || r.symbol === pairFilter)
    .sort((a, b) => Math.abs(b.funding_rate) - Math.abs(a.funding_rate))

  return (
    <div className="space-y-4">
      {/* Offline banner */}
      {offline && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <WifiOff className="size-4 text-red-400 shrink-0" />
          <span className="text-sm font-medium text-red-400">Engine Offline</span>
          <span className="text-xs text-red-400/70">Live funding rate data is currently unavailable.</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={exchangeFilter} onValueChange={setExchangeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Exchange" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Exchanges</SelectItem>
            {exchanges.map((ex) => (
              <SelectItem key={ex} value={ex}>{ex}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={pairFilter} onValueChange={setPairFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Pair" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pairs</SelectItem>
            {pairs.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchRates}
          disabled={loading}
          className="gap-1.5"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>

        <Button
          variant={autoRefresh ? "default" : "outline"}
          size="sm"
          onClick={() => setAutoRefresh(!autoRefresh)}
          className="gap-1.5"
        >
          {autoRefresh ? "Auto: ON" : "Auto: OFF"}
        </Button>

        {!offline && (
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} rate{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Table */}
      {!offline && (
        <Card className="py-0">
          <CardContent className="px-0 py-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exchange</TableHead>
                  <TableHead>Pair</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && rates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No rates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r, i) => (
                    <TableRow key={`${r.exchange}-${r.symbol}-${i}`}>
                      <TableCell className="font-medium">{r.exchange}</TableCell>
                      <TableCell>{r.symbol}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            r.funding_rate > 0
                              ? "border-emerald-500/30 text-emerald-400"
                              : r.funding_rate < 0
                                ? "border-red-500/30 text-red-400"
                                : ""
                          }
                        >
                          {r.funding_rate > 0 ? "+" : ""}{r.funding_rate.toFixed(4)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {new Date(r.last_updated).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

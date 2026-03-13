"use client"

import { useState, useMemo } from "react"
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
import { ArrowUpDown, Info } from "lucide-react"

/* ── Sample data (representative real spreads from our 9.4M settlement dataset) ── */
const SAMPLE_RATES = [
  { symbol: "VINEUSDT", exchanges: { binance: 0.0412, bybit: 0.0387, gate: 0.0395 } },
  { symbol: "1000CATUSDT", exchanges: { binance: 0.0371, bybit: 0.0358, gate: 0.0342 } },
  { symbol: "PTBUSDT", exchanges: { bybit: 0.0334, gate: 0.0301 } },
  { symbol: "BTCUSDT", exchanges: { binance: 0.0100, bybit: 0.0100, gate: 0.0098, hyperliquid: 0.0102 } },
  { symbol: "ETHUSDT", exchanges: { binance: 0.0100, bybit: 0.0097, gate: 0.0095, hyperliquid: 0.0100 } },
  { symbol: "SOLUSDT", exchanges: { binance: 0.0120, bybit: 0.0115, gate: 0.0108, hyperliquid: 0.0118 } },
  { symbol: "DOGEUSDT", exchanges: { binance: 0.0085, bybit: 0.0078, gate: 0.0090 } },
  { symbol: "XRPUSDT", exchanges: { binance: 0.0092, bybit: 0.0088, gate: 0.0091, hyperliquid: 0.0095 } },
  { symbol: "ARBUSDT", exchanges: { binance: 0.0145, bybit: 0.0138, gate: 0.0152 } },
  { symbol: "SUIUSDT", exchanges: { binance: 0.0178, bybit: 0.0165, gate: 0.0171, hyperliquid: 0.0180 } },
  { symbol: "PEPEUSDT", exchanges: { binance: 0.0210, bybit: 0.0195, gate: 0.0205 } },
  { symbol: "WIFUSDT", exchanges: { binance: 0.0268, bybit: 0.0245, gate: 0.0258 } },
  { symbol: "JUPUSDT", exchanges: { binance: 0.0156, bybit: 0.0148, gate: 0.0160 } },
  { symbol: "ONDOUSDT", exchanges: { binance: 0.0198, bybit: 0.0185, gate: 0.0192 } },
  { symbol: "BOMEUSDT", exchanges: { binance: 0.0285, bybit: 0.0262, gate: 0.0278 } },
]

interface SpreadRow {
  symbol: string
  highExchange: string
  highRate: number
  lowExchange: string
  lowRate: number
  spread: number
}

export function SpreadScanner() {
  const [exchangeFilter, setExchangeFilter] = useState("all")
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc")

  const spreads: SpreadRow[] = useMemo(() => {
    return SAMPLE_RATES.map((pair) => {
      const entries = Object.entries(pair.exchanges).filter(
        ([ex]) => exchangeFilter === "all" || ex === exchangeFilter
      )
      if (entries.length < 2 && exchangeFilter === "all") {
        // Need at least 2 exchanges for a spread
        const allEntries = Object.entries(pair.exchanges)
        if (allEntries.length < 2) return null
        const sorted = allEntries.sort((a, b) => b[1] - a[1])
        return {
          symbol: pair.symbol,
          highExchange: sorted[0][0],
          highRate: sorted[0][1],
          lowExchange: sorted[sorted.length - 1][0],
          lowRate: sorted[sorted.length - 1][1],
          spread: sorted[0][1] - sorted[sorted.length - 1][1],
        }
      }
      if (entries.length < 2) return null
      const sorted = entries.sort((a, b) => b[1] - a[1])
      return {
        symbol: pair.symbol,
        highExchange: sorted[0][0],
        highRate: sorted[0][1],
        lowExchange: sorted[sorted.length - 1][0],
        lowRate: sorted[sorted.length - 1][1],
        spread: sorted[0][1] - sorted[sorted.length - 1][1],
      }
    })
      .filter(Boolean) as SpreadRow[]
  }, [exchangeFilter])

  const sorted = useMemo(() => {
    return [...spreads].sort((a, b) =>
      sortDir === "desc" ? b.spread - a.spread : a.spread - b.spread
    )
  }, [spreads, sortDir])

  const exchanges = ["binance", "bybit", "gate", "hyperliquid"]

  return (
    <div className="space-y-4">
      {/* Info banner */}
      <div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
        <Info className="size-4 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-300/80">
          <span className="font-medium text-blue-300">Sample data.</span>{" "}
          This shows representative funding rate spreads from our 9.4M+ settlement dataset.
          Zirodelta&apos;s engine scans 874 symbols across 30+ exchanges in real-time to find exploitable spreads.
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={exchangeFilter} onValueChange={setExchangeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Exchange" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Exchanges</SelectItem>
            {exchanges.map((ex) => (
              <SelectItem key={ex} value={ex}>
                {ex.charAt(0).toUpperCase() + ex.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortDir(sortDir === "desc" ? "asc" : "desc")}
          className="gap-1.5"
        >
          <ArrowUpDown className="size-3.5" />
          Spread {sortDir === "desc" ? "↓" : "↑"}
        </Button>

        <span className="ml-auto text-xs text-muted-foreground">
          {sorted.length} pair{sorted.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <Card className="py-0">
        <CardContent className="px-0 py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>High Exchange</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead>Low Exchange</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Spread</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row) => (
                <TableRow key={row.symbol}>
                  <TableCell className="font-medium font-mono text-sm">{row.symbol}</TableCell>
                  <TableCell className="capitalize">{row.highExchange}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                      +{row.highRate.toFixed(4)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{row.lowExchange}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                      +{row.lowRate.toFixed(4)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        row.spread >= 0.005
                          ? "border-yellow-500/30 text-yellow-400"
                          : "border-zinc-500/30 text-zinc-400"
                      }
                    >
                      {row.spread.toFixed(4)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Explanation */}
      <div className="text-xs text-muted-foreground space-y-1 px-1">
        <p>
          <span className="font-medium">How spreads work:</span> When the same asset has different funding rates
          across exchanges, you can go long on the low-rate exchange and short on the high-rate exchange to
          capture the difference — delta-neutral.
        </p>
        <p>
          Our research shows cross-exchange spread arbitrage has a raw edge of 0.6–0.85 bps/trade, which is
          destroyed by 1+ bps round-trip costs. Zirodelta&apos;s Beta-X1 uses single-exchange spot-perp hedges instead — higher
          edge, lower costs.{" "}
          <a href="/research/cross-exchange-spread-verdict" className="text-blue-400 hover:underline">
            Read the research →
          </a>
        </p>
      </div>
    </div>
  )
}

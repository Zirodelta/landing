"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"

interface RateRow {
  exchange: string
  symbol: string
  funding_rate: number
  annualized_rate: number
  interval_hours: number
  settlement_time: string
}

type Tab = "positive" | "negative"
type ExchangeFilter = "all" | "binance" | "bybit" | "kucoin" | "hyperliquid"

const EXCHANGES: { value: ExchangeFilter; label: string }[] = [
  { value: "all", label: "All Exchanges" },
  { value: "binance", label: "Binance" },
  { value: "bybit", label: "Bybit" },
  { value: "kucoin", label: "KuCoin" },
  { value: "hyperliquid", label: "Hyperliquid" },
]

function symbolToSlug(symbol: string): string {
  const s = symbol.toLowerCase()
  if (s.endsWith("usdt")) return s.slice(0, -4) + "-usdt"
  if (s.endsWith("usd")) return s.slice(0, -3) + "-usd"
  if (s.endsWith("usdc")) return s.slice(0, -4) + "-usdc"
  return s
}

function symbolToLabel(symbol: string): string {
  const s = symbol.toUpperCase()
  if (s.endsWith("USDT")) return s.slice(0, -4) + "/USDT"
  if (s.endsWith("USD")) return s.slice(0, -3) + "/USD"
  if (s.endsWith("USDC")) return s.slice(0, -4) + "/USDC"
  return s
}

function formatRate(rate: number): string {
  return (rate * 100).toFixed(4) + "%"
}

function formatAnnualized(rate: number): string {
  return (rate * 100).toFixed(2) + "%"
}

function formatTime(time: string): string {
  const d = new Date(time + "Z")
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

function exchangeLabel(exchange: string): string {
  const map: Record<string, string> = {
    binance: "Binance",
    bybit: "Bybit",
    kucoin: "KuCoin",
    hyperliquid: "Hyperliquid",
  }
  return map[exchange] || exchange
}

const QUERY_POSITIVE = `SELECT exchange, symbol, funding_rate, annualized_rate, interval_hours, settlement_time FROM funding_rate_settlements WHERE (exchange, symbol, settlement_time) IN (SELECT exchange, symbol, max(settlement_time) FROM funding_rate_settlements WHERE settlement_time >= now() - INTERVAL 24 HOUR GROUP BY exchange, symbol) AND funding_rate > 0 ORDER BY annualized_rate DESC LIMIT 20 FORMAT JSONEachRow`

const QUERY_NEGATIVE = `SELECT exchange, symbol, funding_rate, annualized_rate, interval_hours, settlement_time FROM funding_rate_settlements WHERE (exchange, symbol, settlement_time) IN (SELECT exchange, symbol, max(settlement_time) FROM funding_rate_settlements WHERE settlement_time >= now() - INTERVAL 24 HOUR GROUP BY exchange, symbol) AND funding_rate < 0 ORDER BY annualized_rate ASC LIMIT 20 FORMAT JSONEachRow`

function parseRows(text: string): RateRow[] {
  return text
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}

export function LeaderboardClient() {
  const [positive, setPositive] = useState<RateRow[]>([])
  const [negative, setNegative] = useState<RateRow[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [tab, setTab] = useState<Tab>("positive")
  const [filter, setFilter] = useState<ExchangeFilter>("all")

  const fetchData = useCallback(async () => {
    try {
      const [posRes, negRes] = await Promise.all([
        fetch("https://api.zirodelta.xyz/", { method: "POST", body: QUERY_POSITIVE }),
        fetch("https://api.zirodelta.xyz/", { method: "POST", body: QUERY_NEGATIVE }),
      ])
      if (posRes.ok) {
        const text = await posRes.text()
        if (text.trim()) setPositive(parseRows(text))
      }
      if (negRes.ok) {
        const text = await negRes.text()
        if (text.trim()) setNegative(parseRows(text))
      }
      setLastRefresh(new Date())
    } catch {
      // keep stale data on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 60_000)
    return () => clearInterval(id)
  }, [fetchData])

  const rows = (tab === "positive" ? positive : negative).filter(
    (r) => filter === "all" || r.exchange === filter
  )

  return (
    <>
      {/* Hero */}
      <header className="mb-10">
        <h1
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Highest Funding Rates Right Now
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-4">
          Live leaderboard of the most extreme funding rates across perpetual
          futures markets. Data from 9.4M+ settlement records, updated every 60
          seconds.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/rates/calendar"
            className="text-[#009B88] hover:underline"
          >
            Settlement Calendar →
          </Link>
          <Link href="/rates" className="text-[#009B88] hover:underline">
            Browse by Exchange →
          </Link>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {/* Tabs */}
        <div className="flex rounded-lg border border-white/[0.06] overflow-hidden">
          <button
            onClick={() => setTab("positive")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "positive"
                ? "bg-[#009B88]/15 text-[#009B88]"
                : "text-white/50 hover:text-white/70"
            }`}
          >
            Highest Positive
          </button>
          <button
            onClick={() => setTab("negative")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "negative"
                ? "bg-red-500/15 text-red-400"
                : "text-white/50 hover:text-white/70"
            }`}
          >
            Most Negative
          </button>
        </div>

        {/* Exchange filter */}
        <div className="flex flex-wrap gap-2">
          {EXCHANGES.map((ex) => (
            <button
              key={ex.value}
              onClick={() => setFilter(ex.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === ex.value
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Refresh indicator */}
        <div className="sm:ml-auto flex items-center gap-2">
          {lastRefresh && (
            <span className="text-[10px] text-white/25 tabular-nums">
              {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#009B88] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#009B88]" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Live
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0a0f14] overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-5 w-8 rounded bg-white/[0.06]" />
                <div className="h-5 w-32 rounded bg-white/[0.06]" />
                <div className="h-5 w-20 rounded bg-white/[0.06]" />
                <div className="h-5 w-24 rounded bg-white/[0.06]" />
                <div className="h-5 flex-1 rounded bg-white/[0.06]" />
              </div>
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-sm">
            No data available for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-white/30 px-4 py-3 w-12">
                    #
                  </th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-white/30 px-4 py-3">
                    Symbol
                  </th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-white/30 px-4 py-3">
                    Exchange
                  </th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-white/30 px-4 py-3">
                    Current Rate
                  </th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-white/30 px-4 py-3">
                    Annualized
                  </th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-white/30 px-4 py-3 hidden sm:table-cell">
                    Interval
                  </th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-white/30 px-4 py-3 hidden md:table-cell">
                    Last Settlement
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const slug = symbolToSlug(row.symbol)
                  const isPos = row.funding_rate >= 0
                  const rateColor = isPos ? "#009B88" : "#ef4444"
                  return (
                    <tr
                      key={`${row.exchange}-${row.symbol}`}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-white/30 tabular-nums">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/rates/${row.exchange}/${slug}`}
                          className="font-semibold text-foreground hover:text-[#009B88] transition-colors"
                        >
                          {symbolToLabel(row.symbol)}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {exchangeLabel(row.exchange)}
                      </td>
                      <td
                        className="px-4 py-3 text-right font-mono font-semibold tabular-nums"
                        style={{ color: rateColor }}
                      >
                        {formatRate(row.funding_rate)}
                      </td>
                      <td
                        className="px-4 py-3 text-right font-mono font-bold tabular-nums"
                        style={{ color: rateColor }}
                      >
                        {formatAnnualized(row.annualized_rate)}
                      </td>
                      <td className="px-4 py-3 text-right text-white/50 hidden sm:table-cell">
                        {row.interval_hours}h
                      </td>
                      <td className="px-4 py-3 text-right text-white/40 text-xs hidden md:table-cell">
                        {formatTime(row.settlement_time)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SEO content */}
      <div className="mt-12 space-y-6 text-sm text-white/50 leading-relaxed max-w-3xl">
        <h2
          className="text-xl font-extrabold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Understanding Extreme Funding Rates
        </h2>
        <p>
          Funding rates reflect the cost of holding perpetual futures positions.
          When rates are highly positive, long traders pay short traders — a
          signal that the market is overleveraged to the upside. When rates are
          deeply negative, shorts pay longs, indicating bearish crowding.
        </p>
        <p>
          Extreme funding rates create opportunities. Arbitrageurs can collect
          funding by taking the opposite side of a crowded trade while hedging
          on a different exchange. This leaderboard surfaces the most extreme
          rates in real time, helping traders identify where the edge is right
          now.
        </p>
        <p>
          Data is sourced from {">"}9.4 million funding rate settlements across
          Binance, Bybit, KuCoin, and Hyperliquid. The table shows the latest
          settlement for each pair within the last 24 hours, ranked by
          annualized rate.
        </p>
      </div>
    </>
  )
}

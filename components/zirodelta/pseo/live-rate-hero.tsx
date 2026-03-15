"use client"

import { useEffect, useState, useCallback } from "react"

interface RateData {
  exchange: string
  symbol: string
  funding_rate: number
  annualized_rate: number
  interval_hours: number
  settlement_time: string
}

interface LiveRateHeroProps {
  exchange: string
  pair: string
  exchangeName: string
  pairLabel: string
}

function pairSlugToSymbol(pair: string): string {
  return pair.replace("-", "").toUpperCase()
}

function formatRate(rate: number): string {
  return (rate * 100).toFixed(4) + "%"
}

function formatAnnualized(rate: number): string {
  return (rate * 100).toFixed(2) + "%"
}

function formatSettlementTime(time: string): string {
  const d = new Date(time + "Z")
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

function getCountdown(settlementTime: string, intervalHours: number): string {
  const last = new Date(settlementTime + "Z").getTime()
  const next = last + intervalHours * 3600_000
  const now = Date.now()
  const diff = next - now

  if (diff <= 0) return "Settlement due"

  const h = Math.floor(diff / 3600_000)
  const m = Math.floor((diff % 3600_000) / 60_000)
  const s = Math.floor((diff % 60_000) / 1000)

  return `${h}h ${m}m ${s}s`
}

function Skeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0a0f14] p-6 sm:p-8 mb-12 animate-pulse">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="h-4 w-24 rounded bg-white/10" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="col-span-2 sm:col-span-1">
          <div className="h-3 w-20 rounded bg-white/10 mb-3" />
          <div className="h-12 w-40 rounded bg-white/10" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-3 w-20 rounded bg-white/10 mb-3" />
            <div className="h-7 w-24 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function LiveRateHero({
  exchange,
  pair,
  exchangeName,
  pairLabel,
}: LiveRateHeroProps) {
  const [data, setData] = useState<RateData | null>(null)
  const [error, setError] = useState(false)
  const [countdown, setCountdown] = useState("")

  const symbol = pairSlugToSymbol(pair)

  const fetchRate = useCallback(async () => {
    try {
      const query = `SELECT exchange, symbol, funding_rate, annualized_rate, interval_hours, settlement_time FROM funding_rate_settlements WHERE exchange='${exchange}' AND symbol='${symbol}' ORDER BY settlement_time DESC LIMIT 1 FORMAT JSONEachRow`
      const res = await fetch("https://api.zirodelta.xyz/", {
        method: "POST",
        body: query,
      })
      if (!res.ok) throw new Error("API error")
      const text = await res.text()
      if (!text.trim()) throw new Error("Empty response")
      const parsed: RateData = JSON.parse(text.trim().split("\n")[0])
      setData(parsed)
      setError(false)
    } catch {
      setError(true)
    }
  }, [exchange, symbol])

  useEffect(() => {
    fetchRate()
  }, [fetchRate])

  // Countdown timer
  useEffect(() => {
    if (!data) return
    const tick = () =>
      setCountdown(getCountdown(data.settlement_time, data.interval_hours))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [data])

  if (!data && !error) return <Skeleton />
  if (error) return null // graceful fallback — page content shows as normal

  if (!data) return null

  const isPositive = data.funding_rate >= 0
  const rateColor = isPositive ? "#009B88" : "#ef4444"
  const glowColor = isPositive
    ? "rgba(0, 155, 136, 0.15)"
    : "rgba(239, 68, 68, 0.15)"

  return (
    <div
      className="rounded-2xl border border-white/[0.06] p-6 sm:p-8 mb-12 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 30% 0%, ${glowColor}, transparent 60%), #0a0f14`,
      }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span
          className="relative flex h-2.5 w-2.5"
          aria-hidden="true"
        >
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: rateColor }}
          />
          <span
            className="relative inline-flex h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: rateColor }}
          />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Live — {exchangeName} {pairLabel}
        </span>
      </div>

      {/* Rate grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-end">
        {/* Current Rate — hero number */}
        <div className="col-span-2 sm:col-span-1">
          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-1">
            Current Rate
          </p>
          <p
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: rateColor, fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {formatRate(data.funding_rate)}
          </p>
        </div>

        {/* Annualized */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-1">
            Annualized
          </p>
          <p
            className="text-xl sm:text-2xl font-bold"
            style={{ color: rateColor }}
          >
            {formatAnnualized(data.annualized_rate)}
          </p>
        </div>

        {/* Interval */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-1">
            Interval
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white/90">
            {data.interval_hours}h
          </p>
        </div>

        {/* Next Settlement */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-1">
            Next Settlement
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white/90 tabular-nums">
            {countdown}
          </p>
          <p className="text-[10px] text-white/30 mt-0.5">
            Last: {formatSettlementTime(data.settlement_time)}
          </p>
        </div>
      </div>
    </div>
  )
}

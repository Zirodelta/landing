"use client"

import { useEffect, useRef, useState } from "react"

interface FundingRate {
  exchange: string
  symbol: string
  funding_rate: number
  last_updated: string | null
}

const fallbackRates: FundingRate[] = [
  { exchange: "Binance", symbol: "BTCUSDT", funding_rate: 0.0042, last_updated: null },
  { exchange: "Bybit", symbol: "ETHUSDT", funding_rate: -0.0071, last_updated: null },
  { exchange: "OKX", symbol: "SOLUSDT", funding_rate: 0.0098, last_updated: null },
  { exchange: "Hyperliquid", symbol: "BTCUSD", funding_rate: 0.0112, last_updated: null },
  { exchange: "KuCoin", symbol: "BTCUSDT", funding_rate: -0.0318, last_updated: null },
  { exchange: "dYdX", symbol: "ETHUSDT", funding_rate: 0.0063, last_updated: null },
  { exchange: "Bitget", symbol: "BTCUSDT", funding_rate: -0.0029, last_updated: null },
  { exchange: "Gate.io", symbol: "SOLUSDT", funding_rate: 0.0084, last_updated: null },
  { exchange: "MEXC", symbol: "BTCUSDT", funding_rate: 0.0037, last_updated: null },
  { exchange: "BingX", symbol: "ETHUSDT", funding_rate: -0.0056, last_updated: null },
  { exchange: "GMX", symbol: "BTCUSD", funding_rate: 0.0079, last_updated: null },
  { exchange: "Vertex", symbol: "ETHUSDT", funding_rate: -0.0012, last_updated: null },
]

function formatRate(rate: number): string {
  const percentage = (rate * 100).toFixed(1)
  return rate >= 0 ? `+${percentage}%` : `${percentage}%`
}

function formatSymbol(symbol: string): string {
  // Convert BTCUSDT -> BTC, ETHUSDT -> ETH
  return symbol.replace(/USDT?$|USD$/, "")
}

export function ExchangeTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [rates, setRates] = useState<FundingRate[]>(fallbackRates)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/funding-rates")
        const data = await response.json()
        if (data.success && data.data?.rates && data.data.rates.length > 0) {
          setRates(data.data.rates.slice(0, 20)) // Top 20 rates
        }
      } catch (error) {
        console.error("Failed to fetch funding rates:", error)
        // Keep fallback values
      }
    }

    fetchRates()
    // Refresh every 60 seconds
    const interval = setInterval(fetchRates, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let offset = 0

    const animate = () => {
      offset -= 0.5
      if (Math.abs(offset) >= el.scrollWidth / 2) {
        offset = 0
      }
      el.style.transform = `translateX(${offset}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [rates])

  // Duplicate for seamless scroll
  const items = [...rates, ...rates]

  return (
    <div className="relative overflow-hidden border-y border-border bg-secondary/30 py-3">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />

      <div ref={scrollRef} className="flex gap-8 whitespace-nowrap">
        {items.map((rate, i) => {
          const isPositive = rate.funding_rate >= 0
          return (
            <div key={`${rate.exchange}-${rate.symbol}-${i}`} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {rate.exchange}
              </span>
              <span className="text-xs text-muted-foreground/60">
                {formatSymbol(rate.symbol)}
              </span>
              <span
                className={`font-mono text-xs font-medium ${
                  isPositive ? "text-primary" : "text-orange-400"
                }`}
              >
                {formatRate(rate.funding_rate)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

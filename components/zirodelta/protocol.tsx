"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface Opportunity {
  symbol: string
  long_exchange: string
  short_exchange: string
  long_rate: number
  short_rate: number
  spread: number
  spread_percent: string
  expected_apr: number
  updated_at: string
}

export function Protocol() {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await fetch("/api/top-opportunity")
        const json = await res.json()
        if (json.success && json.data) {
          setIsUpdating(true)
          // Small delay for smooth transition
          setTimeout(() => {
            setOpportunity(json.data)
            setIsUpdating(false)
          }, 150)
        }
      } catch (err) {
        console.error("Failed to fetch opportunity:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOpportunity()
    const interval = setInterval(fetchOpportunity, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  // Format rate as percentage with sign
  const formatRate = (rate: number) => {
    const percent = (rate * 100).toFixed(1)
    return rate >= 0 ? `+${percent}%` : `${percent}%`
  }

  // Use real data or fallback
  const longExchange = opportunity?.long_exchange || "Hyperliquid"
  const shortExchange = opportunity?.short_exchange || "KuCoin"
  const longRate = opportunity ? formatRate(opportunity.long_rate) : "+11.2%"
  const shortRate = opportunity ? formatRate(opportunity.short_rate) : "-31.8%"
  const spreadPercent = opportunity?.spread_percent || "43.0"

  return (
    <section id="protocol" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div>
            <span className="mb-4 inline-block text-xs font-semibold tracking-widest text-primary uppercase">
              The Protocol
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              The engine generates revenue{" "}
              <span className="text-gradient">first</span>
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Typical yield protocols need users to transact before they earn
              anything. We capture funding rate spreads between exchanges — that
              money flows every 8 hours whether anyone deposits or not.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              The vault distributes profit. It doesn&apos;t create it. We&apos;re an
              execution business, not a DeFi app.
            </p>
            <a
              href="#how-it-works"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Visual — Funding Flow Diagram */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-8">
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Live Funding Flow
                  </span>
                  {opportunity?.symbol && (
                    <span className="font-mono text-xs text-muted-foreground">
                      {opportunity.symbol}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-xs text-primary">
                    {isLoading ? "Loading..." : "Live"}
                  </span>
                </span>
              </div>

              {/* Flow visualization */}
              <div
                className={`space-y-4 transition-opacity duration-150 ${
                  isUpdating ? "opacity-50" : "opacity-100"
                }`}
              >
                <FlowRow
                  exchange={longExchange}
                  rate={longRate}
                  positive
                  label="Long"
                />
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-16 bg-border" />
                    <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                      <span className="font-mono text-xs font-semibold text-primary">
                        {spreadPercent}% spread
                      </span>
                    </div>
                    <div className="h-px w-16 bg-border" />
                  </div>
                </div>
                <FlowRow
                  exchange={shortExchange}
                  rate={shortRate}
                  positive={false}
                  label="Short"
                />
              </div>

              {/* Result */}
              <div className="mt-8 rounded-xl border border-border bg-background/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Delta captured
                  </span>
                  <span className="font-mono text-lg font-bold text-primary">
                    +{spreadPercent}%
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Net exposure
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    0.00
                  </span>
                </div>
                {opportunity?.expected_apr && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Est. APR
                    </span>
                    <span className="font-mono text-sm text-primary">
                      {opportunity.expected_apr.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Background decoration */}
            <div
              className="pointer-events-none absolute -right-4 -top-4 h-full w-full rounded-2xl border border-primary/10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowRow({
  exchange,
  rate,
  positive,
  label,
}: {
  exchange: string
  rate: string
  positive: boolean
  label: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4">
      <div className="flex items-center gap-3">
        <div
          className={`h-3 w-3 rounded-full ${
            positive ? "bg-primary" : "bg-muted-foreground"
          }`}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{exchange}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
      <span
        className={`font-mono text-sm font-semibold ${
          positive ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {rate}
      </span>
    </div>
  )
}

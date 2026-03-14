"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Protocol() {
  return (
    <section id="protocol" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div>
            <span className="mb-4 inline-block text-xs font-semibold tracking-widest text-primary uppercase">
              The Strategy
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Collect funding rates{" "}
              <span className="text-gradient">automatically</span>
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Perpetual futures pay a &quot;funding rate&quot; every few hours — shorts
              collect when rates are positive. We buy the spot token and short
              the perp. Zero price exposure. Pure yield from the rate differential.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              At <Link href="/learn/zirodelta-vs-ethena" className="text-primary hover:text-foreground transition-colors underline decoration-1 underline-offset-2">Ethena</Link>&apos;s scale ($2B+), you&apos;re limited to BTC and ETH.
              At our scale, we access <Link href="/rates" className="text-primary hover:text-foreground transition-colors underline decoration-1 underline-offset-2">874 symbols</Link> — including mid-caps with
              50-200%+ annualized funding that big funds can&apos;t touch.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
              >
                See the engine pipeline
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Compare exchanges →
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link href="/learn" className="text-primary hover:text-foreground transition-colors underline decoration-1 underline-offset-2">
                Learn how we differ from Ethena, Pendle, and lending protocols →
              </Link>
            </p>
          </div>

          {/* Visual — Spot vs Perp Diagram */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-8">
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Delta-Neutral Hedge
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    Same exchange, same symbol
                  </span>
                </div>
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-xs text-primary">Active</span>
                </span>
              </div>

              {/* Hedge structure */}
              <div className="space-y-4">
                <FlowRow
                  side="SPOT"
                  action="Buy"
                  detail="Own the token"
                  positive
                />
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-border" />
                    <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                      <span className="font-mono text-xs font-semibold text-primary">
                        Δ = 0
                      </span>
                    </div>
                    <div className="h-px w-12 bg-border" />
                  </div>
                </div>
                <FlowRow
                  side="PERP"
                  action="Short"
                  detail="Collect funding"
                  positive={false}
                />
              </div>

              {/* Result */}
              <div className="mt-8 rounded-xl border border-border bg-background/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Price exposure
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    0.00 (hedged)
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Funding income
                  </span>
                  <span className="font-mono text-sm text-primary">
                    Every 1-8 hours
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Stress-tested APY
                  </span>
                  <span className="font-mono text-lg font-bold text-primary">
                    19–44%
                  </span>
                </div>
              </div>
            </div>

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
  side,
  action,
  detail,
  positive,
}: {
  side: string
  action: string
  detail: string
  positive: boolean
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
          <span className="text-sm font-medium text-foreground">{side}</span>
          <span className="text-xs text-muted-foreground">{detail}</span>
        </div>
      </div>
      <span
        className={`font-mono text-sm font-semibold ${
          positive ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {action}
      </span>
    </div>
  )
}

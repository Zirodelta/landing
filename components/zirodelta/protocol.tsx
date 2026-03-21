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
              The Products
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Funding rates, decoded —{" "}
              <span className="text-gradient">and tradeable</span>
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Every few hours, crypto derivatives markets settle a fee called a funding rate. <strong className="text-foreground">Settled</strong> turns each settlement into a prediction market — bet YES or NO on whether the rate will be positive or negative before it locks.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Don't want to trade? Let <strong className="text-foreground">Zidee</strong> do it for you. Our free sniper bot scans exchanges for extreme funding rate opportunities and executes arbitrage automatically — using your own exchange keys, zero profit share.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
              >
                Learn how it works
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Compare with other yield options →
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link href="/learn" className="text-primary hover:text-foreground transition-colors underline decoration-1 underline-offset-2">
                Learn about the strategy →
              </Link>
            </p>
          </div>

          {/* Visual — Product Overview */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-8">
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Live Products
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    Both available now
                  </span>
                </div>
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-xs text-primary">Live</span>
                </span>
              </div>

              {/* Product rows */}
              <div className="space-y-4">
                <FlowRow
                  side="SETTLED"
                  action="Trade"
                  detail="Prediction markets on funding rates"
                  positive
                />
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-border" />
                    <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                      <span className="font-mono text-xs font-semibold text-primary">
                        OR
                      </span>
                    </div>
                    <div className="h-px w-12 bg-border" />
                  </div>
                </div>
                <FlowRow
                  side="ZIDEE BOT"
                  action="Automate"
                  detail="Free funding rate arbitrage bot"
                  positive={false}
                />
              </div>

              {/* Stats */}
              <div className="mt-8 rounded-xl border border-border bg-background/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active markets
                  </span>
                  <span className="font-mono text-sm text-primary">
                    7,000+
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Exchanges covered
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    5 live
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Cost to use
                  </span>
                  <span className="font-mono text-lg font-bold text-primary">
                    Free
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

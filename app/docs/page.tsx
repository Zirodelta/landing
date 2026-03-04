import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation | Zirodelta",
  description:
    "Technical documentation for Zirodelta's autonomous funding rate arbitrage engine.",
}

function Phase({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border last:hidden" />
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary/50 bg-primary/10 text-[10px] font-bold text-primary" style={{ fontFamily: 'var(--font-mono)' }}>
        {number}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        {title}
      </h3>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-primary">
      {children}
    </code>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground font-medium">{children}</span>
}

function PrincipleCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-5">
      <h4 className="text-sm font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        {/* Title */}
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Technical Documentation
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Engine Architecture
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Zirodelta runs an autonomous funding rate arbitrage engine called{" "}
            <Highlight>FarmingLoop</Highlight>. It executes every 30 minutes,
            scanning 31+ exchanges for profitable funding rate spreads and
            managing positions algorithmically.
          </p>
        </div>

        {/* Pipeline */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-foreground mb-8" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Pipeline Overview
          </h2>

          <Phase number="0" title="Collect">
            <p>
              Connects to <Highlight>31 exchanges</Highlight> in parallel,
              fetching current funding rates, payment intervals, and next funding
              timestamps for every perpetual futures pair. Intervals are{" "}
              <Highlight>fetched dynamically</Highlight> per pair — never
              hardcoded. If an exchange changes a pair from 8h to 4h settlements,
              the engine picks it up automatically. Stores in a time-series
              database for downstream analysis.
            </p>
          </Phase>

          <Phase number="1" title="Scan & Score">
            <p>
              Fetches market depth data — open interest, 24h volume, bid/ask
              spread — and calculates maximum safe position sizes per pair per
              exchange.
            </p>
            <p>
              Then computes cross-exchange delta opportunities with{" "}
              <Highlight>settlement-aware scoring</Highlight>:
            </p>

            <div className="mt-2 space-y-3 rounded-lg border border-border bg-card/30 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Matched Intervals
                </p>
                <p>
                  Both exchanges pay on the same schedule. Standard spread
                  calculation — the exchange with the higher rate becomes the
                  short leg (collecting side).
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Mismatched Intervals
                </p>
                <p>
                  Conservative spread estimation. The fastest-settling exchange
                  is assigned to the <Highlight>collecting side</Highlight> — so
                  you bank real money sooner and re-evaluate each epoch:
                </p>
                <ul className="mt-2 space-y-1 pl-4 list-disc marker:text-primary/50">
                  <li>Both rates positive → shorts collect → fastest = short</li>
                  <li>Both rates negative → longs collect → fastest = long</li>
                  <li>Mixed signs → both sides collect → best case scenario</li>
                </ul>
              </div>
            </div>
            <p>
              Each opportunity includes{" "}
              <Highlight>break-even analysis</Highlight>: how many funding
              sessions needed to recover entry fees.
            </p>
          </Phase>

          <Phase number="2" title="Think">
            <p>
              Runs 6 sequential safety checks before committing capital:
            </p>
            <ol className="mt-2 space-y-1.5 pl-4 list-decimal marker:text-primary/50">
              <li>Consecutive failure detection — back off if 3+ cycles failed</li>
              <li>Existing position health — rebalance if spreads compressed</li>
              <li>Opportunity availability — hold if no profitable deltas</li>
              <li>
                Quality threshold — minimum{" "}
                <Code>3%</Code> annualized spread
              </li>
              <li>
                Position count — max <Code>25</Code> concurrent hedges
              </li>
              <li>
                Capital utilization — max <Code>80%</Code> deployed
              </li>
            </ol>
            <p className="mt-3">
              Decision output: <Code>enter</Code>, <Code>rebalance</Code>, or{" "}
              <Code>hold</Code>.
            </p>
          </Phase>

          <Phase number="3" title="Rebalance">
            <p>If existing positions have deteriorated:</p>
            <ul className="mt-2 space-y-1 pl-4 list-disc marker:text-primary/50">
              <li>
                <Highlight>Funding flip</Highlight> (spread went negative) →
                urgency routing to emergency close
              </li>
              <li>
                <Highlight>Spread compressed</Highlight> (below threshold) →
                smart exit via TWAP
              </li>
            </ul>
            <p className="mt-2">
              Uses the same interval-aware spread formula as Phase 1 — no math
              contradictions between entry and exit evaluation.
            </p>

            <div className="mt-3 rounded-lg border border-border bg-card/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Minimum Hold Period
              </p>
              <p>
                No position is closed until at least one{" "}
                <Highlight>collecting-side settlement</Highlight> has occurred.
                The collecting side is always the fastest-settling exchange — so
                if the short leg settles hourly and the long leg every 8 hours,
                the engine waits at least 1 hour before evaluating.
              </p>
              <p className="mt-2">
                After collecting, if the spread looks bad: close{" "}
                <Highlight>before</Highlight> the slow side pays — don&apos;t
                wait to lose money. Emergency overrides (hard negative spreads)
                bypass the hold period entirely.
              </p>
            </div>
          </Phase>

          <Phase number="4" title="Allocate">
            <p>
              <Highlight>Position-aware</Highlight> greedy knapsack allocation.
              Before building a plan, the engine fetches all open hedges and
              applies three layers of intelligence:
            </p>

            <div className="mt-2 space-y-3 rounded-lg border border-border bg-card/30 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Route Deduplication
                </p>
                <p>
                  Won&apos;t open the same (symbol, short exchange, long exchange)
                  twice. Different venue pairs for the same asset are allowed —
                  they&apos;re independent routes with different risk profiles.
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Capacity Subtraction
                </p>
                <p>
                  Deducts already-deployed capital from available exchange capacity
                  before allocating new positions. Prevents over-concentration on
                  a single exchange or symbol.
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Rotation Scoring
                </p>
                <p>
                  When a better opportunity appears for the same asset on different
                  venues, the engine calculates full rotation cost: exit fees +
                  entry fees + withdrawal + deposit + bridge fees. Only rotates if
                  the spread improvement recovers all costs within 3 days.
                </p>
              </div>
            </div>
            <p className="mt-2">
              The allocation is <Highlight>additive only</Highlight> — it fills
              empty slots and proposes rotations. It never closes profitable
              positions. Closing is exclusively handled by Rebalance and the
              Real-Time Guard.
            </p>
          </Phase>

          <Phase number="5" title="Track">
            <p>
              Records actual funding payments received on all open positions. Not
              projected revenue —{" "}
              <Highlight>real settled cash</Highlight>.
            </p>
          </Phase>

          <Phase number="6" title="Split">
            <p>Net revenue after costs is distributed:</p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              <div className="rounded-md border border-border bg-card/30 p-3 text-center">
                <p className="text-2xl font-bold text-primary">60%</p>
                <p className="mt-1 text-xs">Vault Yield</p>
              </div>
              <div className="rounded-md border border-border bg-card/30 p-3 text-center">
                <p className="text-2xl font-bold text-foreground">25%</p>
                <p className="mt-1 text-xs">Growth & Ops</p>
              </div>
              <div className="rounded-md border border-border bg-card/30 p-3 text-center">
                <p className="text-2xl font-bold text-foreground">15%</p>
                <p className="mt-1 text-xs">Buyback & Burn</p>
              </div>
            </div>
          </Phase>

          <Phase number="7" title="Record">
            <p>
              Logs the complete cycle outcome — action taken, deltas found,
              positions opened/closed, capital utilization, funding collected,
              errors, duration. Feeds the failure detection in Phase 2 of the
              next cycle.
            </p>
          </Phase>
        </section>

        {/* Guard */}
        <section className="mb-20">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Real-Time Guard
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Independent of the 30-minute loop,{" "}
              <Highlight>FundingGuardService</Highlight> monitors all open
              positions via exchange websockets in real-time. If a rate flips
              between cycles, it triggers an immediate exit — no waiting for the
              next scan.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Key Design Principles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PrincipleCard title="Cash Flow Velocity > APR">
              The engine prioritizes real money movement speed over annualized
              rate projections. A lower rate with hourly settlement beats a
              higher rate with 8-hour settlement because you collect cash sooner
              and re-evaluate faster.
            </PrincipleCard>
            <PrincipleCard title="Conservative on Mismatched Intervals">
              When pairing exchanges with different payment schedules, the engine
              uses the minimum rate as the spread estimate. This understates
              projected returns but avoids overcommitting to positions with
              timing risk.
            </PrincipleCard>
            <PrincipleCard title="No Entry/Exit Contradictions">
              All spread calculations — scoring, allocation, rebalance, guard —
              use the identical interval-aware formula. The engine never enters a
              position using one model and evaluates it with another.
            </PrincipleCard>
            <PrincipleCard title="Additive Allocation, Subtractive Exit">
              The farming loop only adds new positions or rotates when the math
              proves it. Closing positions is exclusively handled by rebalance
              and the real-time guard. This separation prevents churn — the
              engine never closes a profitable position to reopen the same thing.
            </PrincipleCard>
            <PrincipleCard title="Rotation Must Pay for Itself">
              Switching from one exchange route to another costs real money:
              trading fees, withdrawal, deposit, and bridge costs. The engine
              only rotates if the spread improvement recovers the full rotation
              cost within 3 days. Small improvements are not worth the friction.
            </PrincipleCard>
            <PrincipleCard title="Zero Hardcoded Assumptions">
              Funding intervals, settlement schedules, and exchange parameters
              are all fetched dynamically. The engine never assumes a pair pays
              every 8 hours — it asks the exchange every cycle. Data quality at
              the source is non-negotiable.
            </PrincipleCard>
          </div>
        </section>
      </main>
    </div>
  )
}

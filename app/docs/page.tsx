import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/zirodelta/footer"

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
      <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border last:hidden" />
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
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Zirodelta Home">
            <Image src="/zirodelta-full-white.svg" alt="Zirodelta" width={160} height={32} className="h-8 w-auto" priority />
          </Link>
          <a
            href="/whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
          >
            Read Whitepaper
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        {/* Title */}
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Technical Documentation
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Engine Architecture — v3
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Zirodelta runs an autonomous delta-neutral yield engine called{" "}
            <Highlight>Beta-X1</Highlight>. It buys spot and shorts the
            perpetual future on the same exchange, collecting funding rate
            payments while maintaining zero market exposure.
          </p>
        </div>

        {/* Strategy overview */}
        <section className="mb-20">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 mb-12">
            <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              The Strategy
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              When perpetual futures traders are net long (bullish), they pay a <Highlight>funding rate</Highlight> to
              short holders. Zirodelta captures this by holding spot (long exposure) and shorting the perp (short exposure)
              on the same exchange. The two legs cancel out — <Highlight>delta zero</Highlight> — while the funding
              payments flow in.
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-md border border-border bg-background/50 p-3">
                <p className="text-2xl font-bold text-primary">Δ = 0</p>
                <p className="mt-1 text-xs text-muted-foreground">Net exposure</p>
              </div>
              <div className="rounded-md border border-border bg-background/50 p-3">
                <p className="text-2xl font-bold text-foreground">19%</p>
                <p className="mt-1 text-xs text-muted-foreground">Backtested CAGR</p>
              </div>
              <div className="rounded-md border border-border bg-background/50 p-3">
                <p className="text-2xl font-bold text-foreground">3.48%</p>
                <p className="mt-1 text-xs text-muted-foreground">Max drawdown</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-8" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Pipeline Overview
          </h2>

          <Phase number="1" title="Collect Funding Settlements">
            <p>
              Every 4 hours, the <Code>FundingSettlementWorkflow</Code> connects to{" "}
              <Highlight>30+ exchanges</Highlight> in parallel and fetches actual funding rate
              settlement data — not projected rates, but confirmed payments with real timestamps.
            </p>
            <p>
              Over <Highlight>9.4 million settlement records</Highlight> across 874 symbols
              power every scoring decision. Data is stored in ClickHouse with deduplication
              via ReplacingMergeTree.
            </p>
          </Phase>

          <Phase number="2" title="Scan & Score">
            <p>
              The daily <Code>SpotPerpScanWorkflow</Code> identifies symbols where funding
              rates are persistently positive — meaning perp shorts consistently receive payments.
            </p>
            <div className="mt-2 space-y-3 rounded-lg border border-border bg-card/30 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Trailing Rate Filter
                </p>
                <p>
                  Only symbols with a trailing average rate above{" "}
                  <Code>MIN_TRAILING_RATE</Code> (0.03%/interval) qualify.
                  This filters out noise and ensures structural persistence.
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Spot Pair Verification
                </p>
                <p>
                  Every opportunity must have a corresponding spot market on the
                  same exchange. No spot pair = no hedge = no trade.
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Open Interest & Liquidity
                </p>
                <p>
                  Position sizes are capped at 2% of open interest to avoid
                  market impact. Symbols with insufficient OI are filtered out.
                </p>
              </div>
            </div>
          </Phase>

          <Phase number="3" title="Allocate">
            <p>
              The <Code>SpotPerpAllocationWorkflow</Code> takes scored opportunities and
              computes capital allocation with multiple safety layers:
            </p>
            <ul className="mt-2 space-y-1.5 pl-4 list-disc marker:text-primary/50">
              <li><Highlight>Max 20 concurrent positions</Highlight> — diversification over concentration</li>
              <li><Highlight>Max 20% per position</Highlight> — no single trade dominates</li>
              <li><Highlight>Max 20% per symbol</Highlight> — even across exchanges</li>
              <li><Highlight>10% reserve</Highlight> — always keep dry powder</li>
              <li><Highlight>Insurance fund</Highlight> deducted from available capital</li>
              <li><Highlight>Circuit breaker</Highlight> — halts trading if 7-day rolling DD exceeds threshold</li>
            </ul>
            <p className="mt-3">
              Fresh open interest data is fetched inline before sizing — not stale snapshots.
            </p>
          </Phase>

          <Phase number="4" title="Execute">
            <p>
              The <Code>ExecutionWorkflow</Code> opens both legs simultaneously:
            </p>
            <div className="mt-2 space-y-3 rounded-lg border border-border bg-card/30 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  SmartEntry
                </p>
                <p>
                  Attempts limit orders first (maker fees ~2 bps) with a 10-second timeout.
                  If not filled, falls back to market orders. Spread multiplier cap prevents
                  execution in wide-spread conditions.
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  Spot Buy + Perp Short
                </p>
                <p>
                  Long leg: buy spot token. Short leg: open short perpetual future.
                  Both on the <Highlight>same exchange</Highlight> — no cross-venue risk,
                  no withdrawal delays, no bridge fees.
                </p>
              </div>
            </div>
          </Phase>

          <Phase number="5" title="Monitor & Exit">
            <p>
              Two independent monitoring systems run continuously:
            </p>
            <div className="mt-2 space-y-3 rounded-lg border border-border bg-card/30 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  ExitScanWorkflow (Daily)
                </p>
                <p>
                  Evaluates every open position against four exit conditions:
                </p>
                <ul className="mt-2 space-y-1 pl-4 list-disc marker:text-primary/50">
                  <li><Highlight>Rate decay</Highlight> — funding rate dropped below exit threshold (original rate × decay factor)</li>
                  <li><Highlight>Stop loss</Highlight> — position PnL breached 1% loss limit</li>
                  <li><Highlight>Rotation</Highlight> — better opportunity found, and switching cost is recoverable</li>
                  <li><Highlight>Insurance deduction</Highlight> — losses covered by insurance fund</li>
                </ul>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                  FundingTrackingWorkflow (Hourly)
                </p>
                <p>
                  Records actual funding payments received on all positions.
                  Not projected — <Highlight>real settled cash</Highlight>. Feeds
                  the daily check and circuit breaker with ground truth data.
                </p>
              </div>
            </div>
          </Phase>

          <Phase number="6" title="Revenue Split">
            <p>
              Revenue distribution depends on the engine class:
            </p>
            <div className="mt-3 space-y-3">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Class A — Proprietary
                </p>
                <p className="text-sm text-muted-foreground">
                  Our own capital, our own engine. <Highlight>No split</Highlight> — 100%
                  retained. This is the core Beta-X1 instance.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Class B — Vault
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Pooled external capital. Net revenue after costs is distributed:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-md border border-border bg-background/50 p-3 text-center">
                    <p className="text-2xl font-bold text-primary">60%</p>
                    <p className="mt-1 text-xs">Depositor Yield</p>
                  </div>
                  <div className="rounded-md border border-border bg-background/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">25%</p>
                    <p className="mt-1 text-xs">Growth & Ops</p>
                  </div>
                  <div className="rounded-md border border-border bg-background/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">15%</p>
                    <p className="mt-1 text-xs">Buyback & Burn</p>
                  </div>
                </div>
              </div>
            </div>
          </Phase>
        </section>

        {/* Architecture */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Architecture
          </h2>
          <div className="rounded-lg border border-border bg-card/30 p-6 font-mono text-xs leading-relaxed text-muted-foreground overflow-x-auto">
            <pre>{`┌─────────────────────────────────────────────────────┐
│                   Temporal Server                    │
│                                                     │
│  ┌──────────────┐  ┌──────────────────────────────┐ │
│  │  heavy-queue  │  │         fast-queue            │ │
│  │               │  │                              │ │
│  │ • Settlement  │  │ • SpotPerpScan    (daily)    │ │
│  │   (every 4h)  │  │ • Allocation      (daily)    │ │
│  │ • Execution   │  │ • ExitScan        (daily)    │ │
│  │               │  │ • DailyCheck      (daily)    │ │
│  │               │  │ • FundingTracking (hourly)   │ │
│  └──────┬───────┘  └──────────┬───────────────────┘ │
│         │                     │                     │
│         └─────────┬───────────┘                     │
│                   │                                 │
│         ┌─────────▼─────────┐                       │
│         │    ClickHouse     │                       │
│         │                   │                       │
│         │ • 9.4M+           │                       │
│         │   settlements     │                       │
│         │ • opportunities   │                       │
│         │ • executions      │                       │
│         │ • spot_holdings   │                       │
│         └───────────────────┘                       │
└─────────────────────────────────────────────────────┘

Exchange Connectors: Binance, Bybit, Gate, KuCoin,
                     Hyperliquid + 25 more adapters`}</pre>
          </div>
        </section>

        {/* Principles */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Key Design Principles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PrincipleCard title="Same-Exchange Only">
              Both legs of every hedge live on the same exchange. No cross-venue
              risk, no withdrawal delays, no bridge fees. Simpler, safer, cheaper.
            </PrincipleCard>
            <PrincipleCard title="Positive Funding Only">
              We only enter when perp shorts receive funding — a structural condition
              driven by leveraged long demand. Negative funding (transient spikes)
              was tested and disproved by backtest.
            </PrincipleCard>
            <PrincipleCard title="Data Quality First">
              9.4M+ real settlement records with actual timestamps from exchange APIs.
              No synthetic data, no interpolation. Every scoring decision is grounded
              in confirmed payments.
            </PrincipleCard>
            <PrincipleCard title="Risk at the Architecture Level">
              Position limits, circuit breakers, insurance fund, stop losses, and
              rate decay exits are not optional add-ons — they are built into the
              workflow pipeline. You cannot skip them.
            </PrincipleCard>
            <PrincipleCard title="SmartEntry Reduces Slippage">
              Limit orders first (maker fees), market fallback after timeout.
              Spread cap prevents execution in illiquid conditions. Every basis
              point of entry cost matters at scale.
            </PrincipleCard>
            <PrincipleCard title="Full Auditability">
              Every trade, position, funding payment, and exit decision is recorded
              in ClickHouse with full timestamps. The transparency dashboard at{" "}
              <a href="https://transparency.zirodelta.ag" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                transparency.zirodelta.ag
              </a>{" "}
              makes this public.
            </PrincipleCard>
          </div>
        </section>

        {/* Research */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Research & Validation
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            v3 is the result of extensive backtesting, 40+ automated research experiments,
            and multiple strategy kills. Read the full research at{" "}
            <Link href="/research" className="text-primary hover:underline">/research</Link>.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Backtest (6.35 years)</p>
              <p className="text-sm text-muted-foreground">
                $300K → $933K. CAGR 19.55%, Sharpe 3.74, Max DD 3.48%.
                Stress-tested with basis risk and realistic execution costs.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Dead Strategies</p>
              <p className="text-sm text-muted-foreground">
                Cross-exchange spread arb (killed: costs &gt; edge), margin mode / negative
                funding (killed: 0% win rate in backtest), interval arbitrage (killed: no
                statistical edge).
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

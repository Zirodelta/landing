import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crosshair, Zap, Shield, Clock, TrendingUp, AlertTriangle, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Zidee — Funding Rate Sniper Bot",
  description: "One-tap funding rate scalps on Telegram. Scan extreme rates across 6 exchanges, enter delta-neutral, collect one settlement, auto-close. Backed by 9.4M settlement backtest.",
  openGraph: {
    images: [{ url: "/api/og?type=tool&title=Zidee+—+Funding+Rate+Sniper&label=Telegram+Bot", width: 1200, height: 630 }],
    title: "Zidee — Funding Rate Sniper Bot | Zirodelta",
    description: "One-tap funding rate scalps on Telegram. Scan extreme rates, enter delta-neutral, collect one settlement, auto-close.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zidee — Funding Rate Sniper Bot | Zirodelta",
    description: "One-tap funding rate scalps across 6 exchanges. 100% historical win rate at ≥0.3% threshold on extreme funding rates.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zidee — Funding Rate Sniper Bot",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Telegram",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "One-tap funding rate scalps on Telegram. Scan extreme rates across 6 exchanges, enter delta-neutral, auto-close after settlement.",
  url: "https://zirodelta.com/tools/funding-rate-sniper-bot",
}

const stats = [
  { label: "Settlements Analyzed", value: "9.4M", icon: TrendingUp },
  { label: "Historical Win Rate", value: "100%", icon: Crosshair },
  { label: "Avg Net Per Snipe", value: "+0.26%", icon: Zap },
  { label: "Opportunities / Day", value: "1.4", icon: Clock },
]

const steps = [
  {
    step: "1",
    title: "Scan",
    description: "Zidee scans 6 exchanges (Bybit, Binance, Gate.io, KuCoin, BingX, Hyperliquid) every hour for funding rates ≥ 0.3% per settlement. Only shows opportunities where both spot and perp markets exist.",
  },
  {
    step: "2",
    title: "Pick",
    description: "You see extreme rates with one-tap buttons. Pick the pair — only opportunities on your connected exchange appear.",
  },
  {
    step: "3",
    title: "Snipe",
    description: "Select your size ($50 — $1,000). Zidee opens a delta-neutral position: buy spot + short perpetual.",
  },
  {
    step: "4",
    title: "Collect & Close",
    description: "Funding settles. Zidee auto-closes 30 minutes after settlement. You get a PnL report. Done.",
  },
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        {/* Hero */}
        <div className="flex items-center gap-3 mb-2">
          <Crosshair className="size-8 text-primary" />
          <Badge variant="secondary">Telegram Bot</Badge>
          <Badge variant="outline" className="text-green-500 border-green-500/30">Beta</Badge>
        </div>
        <h1
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Zidee — Funding Rate Sniper
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          One-tap extreme funding rate scalps. Scan 6 exchanges (~2,250 tradeable pairs), enter delta-neutral,
          collect one funding payment, auto-close after settlement. Zero overnight risk.
        </p>
        <div className="mt-6 flex gap-4 flex-wrap">
          <a
            href="https://t.me/zidee_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Open in Telegram
            <ExternalLink className="size-4" />
          </a>
          <Link
            href="/research/sniper-one-settlement-scalp-backtest"
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
          >
            Read the Backtest
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-4 grid-cols-2 sm:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6 text-center">
                <s.icon className="size-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it works */}
        <h2
          className="mt-20 text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          How It Works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((s) => (
            <Card key={s.step}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {s.step}
                  </span>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* The Research */}
        <h2
          className="mt-20 text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Backed by Data
        </h2>
        <p className="mt-4 text-muted-foreground">
          We backtested this strategy across 9.4 million funding rate settlements over 6 years
          (Jan 2020 — Mar 2026) on Binance, Bybit, KuCoin, and Hyperliquid — filtered for symbols
          where both spot and perpetual markets exist (required for delta-neutral execution).
        </p>
        <div className="mt-6 rounded-lg border p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">At ≥ 0.3% threshold (spot-filtered)</p>
              <p className="text-lg font-semibold">3,409 tradeable opportunities over 6 years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win rate after 0.2% RT costs</p>
              <p className="text-lg font-semibold">100%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net per snipe (after fees)</p>
              <p className="text-lg font-semibold text-green-500">+0.262%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Conservative APY (1 snipe/day)</p>
              <p className="text-lg font-semibold">~96%</p>
            </div>
          </div>
          <div className="pt-2">
            <Link
              href="/research/sniper-one-settlement-scalp-backtest"
              className="text-sm text-primary hover:underline"
            >
              Read the full research →
            </Link>
          </div>
        </div>

        {/* Why extreme positive rates persist */}
        <h2
          className="mt-20 text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Why It Works
        </h2>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            Extreme positive funding rates are driven by <strong className="text-foreground">leverage demand</strong> —
            traders piling into long positions on trending tokens. This demand is structural and persists
            across multiple settlement periods.
          </p>
          <p>
            After an extreme settlement, <strong className="text-foreground">39% remain extreme</strong> and
            {" "}<strong className="text-foreground">65% stay elevated</strong> at the next settlement. Only 17% collapse to normal.
          </p>
          <p>
            Compare this to extreme <em>negative</em> rates (which we{" "}
            <Link href="/research/margin-mode-dead" className="text-primary hover:underline">
              tested and disproved
            </Link>
            ) — those mean-revert within one settlement. The asymmetry is why sniping positive extremes works
            while sniping negative extremes doesn&apos;t.
          </p>
        </div>

        {/* Security */}
        <h2
          className="mt-20 text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Security
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex gap-3">
            <Shield className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm">Trade-only keys</p>
              <p className="text-sm text-muted-foreground">Keys with withdrawal permission are rejected automatically.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Shield className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm">AES-256-GCM encryption</p>
              <p className="text-sm text-muted-foreground">API keys are encrypted per-user with derived keys. Never stored in plaintext.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Shield className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm">In-memory only</p>
              <p className="text-sm text-muted-foreground">Keys are decrypted only during trade execution. Never logged, never cached.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Shield className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm">DM-only connection</p>
              <p className="text-sm text-muted-foreground">The /connect flow only works in direct messages, never in group chats.</p>
            </div>
          </div>
        </div>

        {/* Supported Exchanges */}
        <h2
          className="mt-20 text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Supported Exchanges
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {["Bybit", "Binance", "Gate.io", "KuCoin", "BingX", "Hyperliquid"].map((ex) => (
            <Badge key={ex} variant="secondary" className="text-sm px-4 py-1.5">{ex}</Badge>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Connect multiple exchanges simultaneously. Zidee shows opportunities across all your connected exchanges.
        </p>

        {/* Disclaimer */}
        <div className="mt-20 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-6">
          <div className="flex gap-3">
            <AlertTriangle className="size-5 text-yellow-500 mt-0.5 shrink-0" />
            <div className="space-y-3">
              <p className="font-semibold text-sm">Disclaimer — Read Before Using</p>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Zidee is a trading tool, not financial advice. All backtested returns are based on historical data with
                  simplified cost assumptions. <strong className="text-foreground">Past performance does not guarantee future results.</strong>
                </p>
                <p>
                  The 100% historical win rate at ≥0.3% threshold does not include execution slippage, price drift during the hold period,
                  or spot-perp spread costs. Real-world returns will differ from backtested projections. Backtest is filtered
                  for symbols with both spot and perpetual markets (required for delta-neutral execution).
                </p>
                <p>
                  Cryptocurrency trading carries substantial risk. Funding rates, market conditions, exchange mechanics,
                  and liquidity can change without notice. You may lose some or all of your capital.
                </p>
                <p>
                  You are solely responsible for your trading decisions and any resulting gains or losses.
                  Never trade with funds you cannot afford to lose. Zirodelta is not liable for any losses
                  incurred through the use of this tool.
                </p>
                <p>
                  By using Zidee, you acknowledge that you have read and understood this disclaimer and accept
                  all associated risks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://t.me/zidee_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Sniping on Telegram
            <ExternalLink className="size-4" />
          </a>
          <p className="mt-3 text-sm text-muted-foreground">Free during beta. No sign-up required.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { PseoBreadcrumb } from "@/components/zirodelta/pseo/pseo-breadcrumb"

export const metadata: Metadata = {
  title: "Funding Rate Settlement Schedule — All Exchanges | Zirodelta",
  description:
    "Complete funding rate settlement calendar for Binance, Bybit, KuCoin, Hyperliquid, Gate, OKX, and 13 more exchanges. Know exactly when funding rates settle across CEX and DEX perpetual markets.",
  alternates: {
    canonical: "https://zirodelta.com/rates/calendar",
  },
  openGraph: {
    images: [{ url: "/api/og?type=calendar", width: 1200, height: 630 }],
    title: "Funding Rate Settlement Schedule — All Exchanges | Zirodelta",
    description:
      "Complete funding rate settlement calendar for Binance, Bybit, KuCoin, Hyperliquid, Gate, OKX, and 13 more exchanges.",
    url: "https://zirodelta.com/rates/calendar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funding Rate Settlement Schedule — All Exchanges",
    description:
      "Complete funding rate settlement calendar across CEX and DEX perpetual markets.",
  },
}

interface ExchangeSchedule {
  name: string
  slug: string
  type: "CEX" | "DEX"
  defaultInterval: string
  times: string[]
  note?: string
}

const schedules: ExchangeSchedule[] = [
  {
    name: "Binance",
    slug: "binance",
    type: "CEX",
    defaultInterval: "8h",
    times: ["00:00", "08:00", "16:00"],
  },
  {
    name: "Bybit",
    slug: "bybit",
    type: "CEX",
    defaultInterval: "8h",
    times: ["00:00", "08:00", "16:00"],
    note: "Some pairs settle every 4h or 1h",
  },
  {
    name: "OKX",
    slug: "okx",
    type: "CEX",
    defaultInterval: "8h",
    times: ["00:00", "08:00", "16:00"],
  },
  {
    name: "Gate",
    slug: "gate",
    type: "CEX",
    defaultInterval: "8h",
    times: ["00:00", "08:00", "16:00"],
  },
  {
    name: "KuCoin",
    slug: "kucoin",
    type: "CEX",
    defaultInterval: "8h",
    times: ["04:00", "12:00", "20:00"],
    note: "Some pairs settle every 4h or 1h",
  },
  {
    name: "Bitget",
    slug: "bitget",
    type: "CEX",
    defaultInterval: "8h",
    times: ["00:00", "08:00", "16:00"],
  },
  {
    name: "MEXC",
    slug: "mexc",
    type: "CEX",
    defaultInterval: "8h",
    times: ["00:00", "08:00", "16:00"],
  },
  {
    name: "BingX",
    slug: "bingx",
    type: "CEX",
    defaultInterval: "8h",
    times: ["00:00", "08:00", "16:00"],
  },
  {
    name: "Hyperliquid",
    slug: "hyperliquid",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "dYdX",
    slug: "dydx",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "Drift",
    slug: "drift",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "Aevo",
    slug: "aevo",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "GMX",
    slug: "gmx",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "Vertex",
    slug: "vertex",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "Apex",
    slug: "apex",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "RabbitX",
    slug: "rabbitx",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "Orderly",
    slug: "orderly",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "Paradex",
    slug: "paradex",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
  {
    name: "WooX",
    slug: "woox",
    type: "DEX",
    defaultInterval: "1h",
    times: ["Every hour on the hour"],
  },
]

const hours = Array.from({ length: 24 }, (_, i) => i)

function getSettlementHours(schedule: ExchangeSchedule): number[] {
  if (schedule.defaultInterval === "1h") return hours
  return schedule.times
    .filter((t) => t.includes(":"))
    .map((t) => parseInt(t.split(":")[0], 10))
}

export default function CalendarPage() {
  const cex = schedules.filter((s) => s.type === "CEX")
  const dex = schedules.filter((s) => s.type === "DEX")

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
        <PseoBreadcrumb
          items={[
            { label: "Funding Rates", href: "/rates" },
            { label: "Settlement Calendar" },
          ]}
        />

        {/* Hero */}
        <header className="mb-12">
          <h1
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Funding Rate Settlement Schedule
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4">
            Know exactly when funding rates settle on every major exchange.
            Settlement timing drives arbitrage windows — the gap between
            exchange schedules creates exploitable spreads.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="/rates/leaderboard"
              className="text-[#009B88] hover:underline"
            >
              View Leaderboard →
            </Link>
            <Link
              href="/rates"
              className="text-[#009B88] hover:underline"
            >
              Browse by Exchange →
            </Link>
          </div>
        </header>

        {/* 24h Timeline */}
        <section className="mb-16">
          <h2
            className="text-2xl font-extrabold tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            24-Hour Settlement Timeline (UTC)
          </h2>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0f14] overflow-x-auto">
            <div className="min-w-[800px] p-6">
              {/* Hour labels */}
              <div className="flex mb-1">
                <div className="w-28 shrink-0" />
                <div className="flex-1 grid grid-cols-24 gap-0">
                  {hours.map((h) => (
                    <div
                      key={h}
                      className="text-[10px] text-white/30 text-center"
                    >
                      {h.toString().padStart(2, "0")}
                    </div>
                  ))}
                </div>
              </div>

              {/* Exchange rows */}
              {schedules.map((s) => {
                const active = getSettlementHours(s)
                const is1h = s.defaultInterval === "1h"
                return (
                  <div key={s.slug} className="flex items-center py-1">
                    <div className="w-28 shrink-0 pr-3">
                      <Link
                        href={`/rates/${s.slug}`}
                        className="text-xs font-medium text-white/70 hover:text-[#009B88] transition-colors truncate block"
                      >
                        {s.name}
                      </Link>
                    </div>
                    <div className="flex-1 grid grid-cols-24 gap-0">
                      {hours.map((h) => {
                        const isActive = active.includes(h)
                        return (
                          <div key={h} className="flex justify-center">
                            <div
                              className={`w-3.5 h-3.5 rounded-sm ${
                                isActive
                                  ? is1h
                                    ? "bg-[#009B88]/40"
                                    : "bg-[#009B88]"
                                  : "bg-white/[0.03]"
                              }`}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {/* Legend */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-sm bg-[#009B88]" />
                  <span className="text-xs text-white/40">8h settlement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-sm bg-[#009B88]/40" />
                  <span className="text-xs text-white/40">1h settlement (every hour)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-sm bg-white/[0.03]" />
                  <span className="text-xs text-white/40">No settlement</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exchange Schedule Tables */}
        <section className="mb-16">
          <h2
            className="text-2xl font-extrabold tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            CEX Settlement Schedules
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cex.map((s) => (
              <div
                key={s.slug}
                className="rounded-2xl border border-white/[0.06] bg-[#0a0f14] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <Link
                    href={`/rates/${s.slug}`}
                    className="text-base font-bold text-foreground hover:text-[#009B88] transition-colors"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {s.name}
                  </Link>
                  <span className="text-xs font-mono text-[#009B88] bg-[#009B88]/10 px-2 py-0.5 rounded">
                    {s.defaultInterval}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {s.times.map((t) => (
                    <span
                      key={t}
                      className="text-sm font-mono text-white/70 bg-white/[0.04] px-2.5 py-1 rounded-lg"
                    >
                      {t} UTC
                    </span>
                  ))}
                </div>
                {s.note && (
                  <p className="text-xs text-white/30 mt-2">{s.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2
            className="text-2xl font-extrabold tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            DEX Settlement Schedules
          </h2>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0f14] p-5">
            <p className="text-sm text-white/50 mb-4">
              Decentralized exchanges typically settle funding rates every hour,
              providing more frequent rate adjustments and tighter alignment with
              market conditions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {dex.map((s) => (
                <Link
                  key={s.slug}
                  href={`/rates/${s.slug}`}
                  className="group rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition-all hover:border-[#009B88]/40 hover:bg-[#009B88]/[0.04]"
                >
                  <span className="block text-sm font-semibold text-foreground group-hover:text-[#009B88] transition-colors">
                    {s.name}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    1h · Every hour
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Settlement Timing Matters */}
        <section className="mb-16">
          <h2
            className="text-2xl font-extrabold tracking-tight text-foreground mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Why Settlement Timing Matters
          </h2>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0f14] p-6 space-y-4 text-white/70 text-sm leading-relaxed">
            <p>
              Funding rates are periodic payments between long and short
              perpetual futures traders. The settlement schedule determines
              when these payments occur — and creates windows of opportunity
              for arbitrage strategies.
            </p>
            <p>
              <strong className="text-white/90">Schedule misalignment creates edge.</strong>{" "}
              KuCoin settles at 04:00, 12:00, and 20:00 UTC while Binance
              settles at 00:00, 08:00, and 16:00 UTC. This 4-hour offset means
              rates on one exchange may have already priced in a move while the
              other hasn&apos;t — creating exploitable cross-exchange spreads.
            </p>
            <p>
              <strong className="text-white/90">Hourly DEX settlements compound faster.</strong>{" "}
              Hyperliquid and other DEXs settle every hour. A 0.01% hourly rate
              compounds to ~87.6% annualized versus ~10.95% for the same rate
              on an 8h schedule. This makes DEX funding rates particularly
              attractive for short-term strategies.
            </p>
            <p>
              <strong className="text-white/90">Timing informs position entry.</strong>{" "}
              Opening a position just before a favorable settlement captures the
              payment. Opening right after one means waiting 1–8 hours for the
              next. Knowing the schedule turns timing from guesswork into
              precision.
            </p>
          </div>
        </section>

        {/* JSON-LD FAQ schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "When do Binance funding rates settle?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Binance perpetual futures funding rates settle every 8 hours at 00:00, 08:00, and 16:00 UTC.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How often do Hyperliquid funding rates settle?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Hyperliquid settles funding rates every hour on the hour, providing 24 settlement events per day.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why does KuCoin have different settlement times than Binance?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "KuCoin settles at 04:00, 12:00, and 20:00 UTC — offset by 4 hours from Binance's 00:00, 08:00, 16:00 schedule. This misalignment creates cross-exchange arbitrage opportunities.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  )
}

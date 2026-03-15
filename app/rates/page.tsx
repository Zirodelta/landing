import type { Metadata } from "next"
import Link from "next/link"
import { getExchanges } from "@/lib/pseo"
import { RatesPageClient } from "@/components/zirodelta/rates-page-client"

export const metadata: Metadata = {
  title: "Funding Rates by Exchange",
  description:
    "Compare perpetual futures funding rates across 19 exchanges. Live data for CEX and DEX platforms including Binance, Bybit, OKX, Hyperliquid, dYdX, and more.",
  openGraph: {
    images: [{ url: "/api/og?type=rates", width: 1200, height: 630 }],
    title: "Funding Rates by Exchange | Zirodelta",
    description:
      "Compare perpetual futures funding rates across 19 exchanges. CEX and DEX platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funding Rates by Exchange | Zirodelta",
    description:
      "Compare perpetual futures funding rates across 19 exchanges.",
  },
}

export default function RatesIndexPage() {
  const exchanges = getExchanges()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
        <h1
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Funding Rates by Exchange
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore perpetual futures funding rates across centralized and
          decentralized exchanges. Select an exchange to view pair-level rates
          and analysis.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <Link
            href="/rates/leaderboard"
            className="text-[#009B88] hover:underline"
          >
            Live Leaderboard →
          </Link>
          <Link
            href="/rates/calendar"
            className="text-[#009B88] hover:underline"
          >
            Settlement Calendar →
          </Link>
        </div>
      </header>

      {/* Filtered Content */}
      <RatesPageClient exchanges={exchanges} />
    </div>
  )
}
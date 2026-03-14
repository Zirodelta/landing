import type { Metadata } from "next"
import { getExchanges } from "@/lib/pseo"
import { RatesPageClient } from "@/components/zirodelta/rates-page-client"

export const metadata: Metadata = {
  title: "Funding Rates by Exchange",
  description:
    "Compare perpetual futures funding rates across 19 exchanges. Live data for CEX and DEX platforms including Binance, Bybit, OKX, Hyperliquid, dYdX, and more.",
  openGraph: {
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
      </header>

      {/* Filtered Content */}
      <RatesPageClient exchanges={exchanges} />
    </div>
  )
}
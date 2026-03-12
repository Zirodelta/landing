import type { Metadata } from "next"
import { getExchanges } from "@/lib/pseo"
import { ExchangeCard } from "@/components/zirodelta/pseo/exchange-card"

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
  const cex = exchanges.filter((e) => e.type === "CEX")
  const dex = exchanges.filter((e) => e.type === "DEX")

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
      <header className="mb-12">
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

      {/* CEX Section */}
      <section className="mb-12">
        <h2
          className="text-xl font-bold text-foreground mb-6"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Centralized Exchanges
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cex.map((exchange) => (
            <ExchangeCard key={exchange.slug} exchange={exchange} />
          ))}
        </div>
      </section>

      {/* DEX Section */}
      <section>
        <h2
          className="text-xl font-bold text-foreground mb-6"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Decentralized Exchanges
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dex.map((exchange) => (
            <ExchangeCard key={exchange.slug} exchange={exchange} />
          ))}
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from "next"
import { LeaderboardClient } from "./leaderboard-client"
import { PseoBreadcrumb } from "@/components/zirodelta/pseo/pseo-breadcrumb"

const leaderboardJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Crypto Funding Rate Leaderboard",
  description: "Real-time ranking of highest funding rates across perpetual futures on Binance, Bybit, KuCoin, Hyperliquid, Gate, and more. Updated every 60 seconds.",
  url: "https://zirodelta.com/rates/leaderboard",
  license: "https://zirodelta.com/pact",
  creator: { "@type": "Organization", name: "Zirodelta", url: "https://zirodelta.com" },
  temporalCoverage: "2019-09-01/..",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Funding Rate", unitText: "percent per settlement" },
    { "@type": "PropertyValue", name: "Annualized Rate", unitText: "percent per year" },
  ],
  keywords: ["highest funding rate crypto", "funding rate leaderboard", "extreme funding rates", "crypto arbitrage opportunities"],
  measurementTechnique: "Direct exchange API collection",
  size: "9.4M+ settlement records",
}

export const metadata: Metadata = {
  title: "Highest Funding Rates Today — Live Crypto Leaderboard | Zirodelta",
  description:
    "Real-time funding rate leaderboard across Binance, Bybit, KuCoin, and Hyperliquid. See which perpetual futures have the highest rates right now. Updated every 60 seconds from 9.4M+ settlement records.",
  alternates: {
    canonical: "https://zirodelta.com/rates/leaderboard",
  },
  openGraph: {
    images: [{ url: "/api/og?type=leaderboard", width: 1200, height: 630 }],
    title: "Highest Funding Rates Today — Live Crypto Leaderboard | Zirodelta",
    description:
      "Real-time funding rate leaderboard across Binance, Bybit, KuCoin, and Hyperliquid. See which perpetual futures have the highest rates right now.",
    url: "https://zirodelta.com/rates/leaderboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Highest Funding Rates Today — Live Crypto Leaderboard",
    description:
      "Real-time funding rate leaderboard across Binance, Bybit, KuCoin, and Hyperliquid.",
  },
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(leaderboardJsonLd) }} />
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
        <PseoBreadcrumb
          items={[
            { label: "Funding Rates", href: "/rates" },
            { label: "Leaderboard" },
          ]}
        />
        <LeaderboardClient />
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { LeaderboardClient } from "./leaderboard-client"
import { PseoBreadcrumb } from "@/components/zirodelta/pseo/pseo-breadcrumb"

export const metadata: Metadata = {
  title: "Highest Funding Rates Today — Live Crypto Leaderboard | Zirodelta",
  description:
    "Real-time funding rate leaderboard across Binance, Bybit, KuCoin, and Hyperliquid. See which perpetual futures have the highest rates right now. Updated every 60 seconds from 9.4M+ settlement records.",
  alternates: {
    canonical: "https://zirodelta.com/rates/leaderboard",
  },
  openGraph: {
    title: "Highest Funding Rates Today — Live Crypto Leaderboard | Zirodelta",
    description:
      "Real-time funding rate leaderboard across Binance, Bybit, KuCoin, and Hyperliquid. See which perpetual futures have the highest rates right now.",
    url: "https://zirodelta.com/rates/leaderboard",
    images: [{ url: "https://zirodelta.com/og-image.jpg" }],
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

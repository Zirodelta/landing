import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Guides, comparisons, and research on funding rate arbitrage, delta-neutral yield, and automated crypto strategies from Zirodelta.",
  openGraph: {
    title: "Learn | Zirodelta",
    description:
      "Guides, comparisons, and research on funding rate arbitrage, delta-neutral yield, and automated crypto strategies.",
  },
}

const articles = [
  {
    title: "Zirodelta vs Ethena",
    description:
      "Multi-exchange funding rate arbitrage vs single-venue synthetic dollar. Which delta-neutral strategy fits your risk profile?",
    href: "/learn/zirodelta-vs-ethena",
    category: "Comparison",
  },
  {
    title: "Funding Rate Arbitrage vs Staking",
    description:
      "Market-neutral yield vs validator rewards. Comparing risk, returns, and capital efficiency for serious allocators.",
    href: "/learn/funding-rate-arbitrage-vs-staking",
    category: "Comparison",
  },
  {
    title: "Best Crypto Yield in a Bear Market",
    description:
      "When prices fall, most yield disappears. Funding rate arbitrage doesn't care about direction — it profits from volatility itself.",
    href: "/learn/best-crypto-yield-bear-market",
    category: "Constraint",
  },
  {
    title: "Delta-Neutral Yield Without Liquidation Risk",
    description:
      "How cross-exchange funding rate arbitrage eliminates single-point-of-failure liquidation while maintaining consistent yield.",
    href: "/learn/delta-neutral-yield-no-liquidation",
    category: "Constraint",
  },
  {
    title: "Automated Funding Rate Farming",
    description:
      "From manual rate-checking across exchanges to fully autonomous 24/7 execution. What automation changes about funding rate yield.",
    href: "/learn/automated-funding-rate-farming",
    category: "Use Case",
  },
  {
    title: "DAO Treasury Yield Strategies",
    description:
      "How DAOs and on-chain treasuries earn yield without directional exposure or governance token risk.",
    href: "/learn/dao-treasury-yield",
    category: "Use Case",
  },
]

const categoryColors: Record<string, string> = {
  Comparison: "border-blue-500/20 text-blue-400",
  Constraint: "border-amber-500/20 text-amber-400",
  "Use Case": "border-violet-500/20 text-violet-400",
}

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Learn
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Honest comparisons, real tradeoffs, and deep dives on funding rate
          arbitrage and delta-neutral yield. Built for people deciding, not
          browsing.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group flex flex-col rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-muted-foreground/30 hover:bg-card/80"
          >
            <span
              className={`mb-3 inline-flex self-start items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${
                categoryColors[article.category] || "border-border text-muted-foreground"
              }`}
            >
              {article.category}
            </span>
            <h2
              className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {article.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {article.description}
            </p>
            <span className="mt-4 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Read →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

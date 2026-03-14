import type { Metadata } from "next"
import { getAllArticles } from "@/lib/learn"
import { LearnPageClient } from "@/components/zirodelta/learn-page-client"

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

export default function LearnPage() {
  const articles = getAllArticles()

  if (articles.length === 0) {
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
        <p className="text-muted-foreground">Articles coming soon.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
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

      {/* Filtered Content */}
      <LearnPageClient articles={articles} />
    </div>
  )
}
import type { Metadata } from "next"
import Link from "next/link"
import { getAllArticles } from "@/lib/learn"

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

const categoryLabels: Record<string, string> = {
  comparison: "Comparison",
  constraint: "Constraint",
  "use-case": "Use Case",
  general: "Guide",
}

const categoryColors: Record<string, string> = {
  comparison: "border-blue-500/20 text-blue-400",
  constraint: "border-amber-500/20 text-amber-400",
  "use-case": "border-violet-500/20 text-violet-400",
  general: "border-border text-muted-foreground",
}

export default function LearnPage() {
  const articles = getAllArticles()

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

      {articles.length === 0 ? (
        <p className="text-muted-foreground">Articles coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-muted-foreground/30 hover:bg-card/80"
            >
              <span
                className={`mb-3 inline-flex self-start items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${
                  categoryColors[article.category] ||
                  categoryColors.general
                }`}
              >
                {categoryLabels[article.category] || article.category}
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
      )}
    </div>
  )
}

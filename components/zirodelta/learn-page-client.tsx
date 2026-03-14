"use client"

import Link from "next/link"
import { ArticleFilters } from "@/components/zirodelta/article-filters"
import type { ArticleMeta } from "@/lib/learn"

interface LearnPageClientProps {
  articles: ArticleMeta[]
}

const categoryLabels: Record<string, string> = {
  all: "All",
  comparison: "Comparison",
  constraint: "Constraint",
  "use-case": "Use Case",
  general: "Guide",
  strategy: "Strategy",
  tools: "Tools",
}

const categoryColors: Record<string, string> = {
  comparison: "border-blue-500/20 text-blue-400",
  constraint: "border-amber-500/20 text-amber-400",
  "use-case": "border-violet-500/20 text-violet-400",
  general: "border-border text-muted-foreground",
  strategy: "border-green-500/20 text-green-400",
  tools: "border-cyan-500/20 text-cyan-400",
}

const topicTags = [
  "Funding Rate",
  "Arbitrage",
  "Bot",
  "Exchange", 
  "Risk",
  "Comparison",
]

export function LearnPageClient({ articles }: LearnPageClientProps) {
  return (
    <ArticleFilters
      items={articles}
      categoryConfig={{
        categories: categoryLabels,
        colors: categoryColors,
      }}
      showTopicTags={true}
      topicTags={topicTags}
      searchPlaceholder="Search articles..."
      showCount={true}
      pageTitle="articles"
      stickyFilters={true}
    >
      {(filteredArticles) => (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
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
    </ArticleFilters>
  )
}
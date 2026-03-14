"use client"

import Link from "next/link"
import { ArticleFilters } from "@/components/zirodelta/article-filters"
import type { ResearchMeta } from "@/lib/research"

interface ResearchPageClientProps {
  articles: ResearchMeta[]
}

const statusColors: Record<string, string> = {
  conclusive: "border-red-500/20 text-red-400",
  validated: "border-green-500/20 text-green-400",
  published: "border-blue-500/20 text-blue-400",
  methodology: "border-violet-500/20 text-violet-400",
}

const statusLabels: Record<string, string> = {
  conclusive: "Conclusive",
  validated: "Validated", 
  published: "Published",
  methodology: "Methodology",
}

const categoryColors: Record<string, string> = {
  "strategy-kill": "border-red-500/20 text-red-400",
  backtest: "border-amber-500/20 text-amber-400",
  "strategy-validation": "border-green-500/20 text-green-400",
  methodology: "border-violet-500/20 text-violet-400",
  overview: "border-blue-500/20 text-blue-400",
}

const categoryLabels: Record<string, string> = {
  all: "All",
  "strategy-kill": "Strategy Kill",
  backtest: "Backtest",
  "strategy-validation": "Strategy Validation",
  methodology: "Methodology",
  overview: "Overview",
}

export function ResearchPageClient({ articles }: ResearchPageClientProps) {
  return (
    <ArticleFilters
      items={articles}
      categoryConfig={{
        categories: categoryLabels,
        colors: categoryColors,
      }}
      showTopicTags={false}
      searchPlaceholder="Search research..."
      showCount={true}
      pageTitle="research articles"
      stickyFilters={true}
    >
      {(filteredArticles) => (
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/research/${article.slug}`}
              className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {/* Status badge */}
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                    statusColors[article.status] || statusColors.published
                  }`}
                >
                  {statusLabels[article.status] || article.status}
                </span>
                {/* Category badge */}
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                    categoryColors[article.category] || "border-border text-muted-foreground"
                  }`}
                >
                  {article.category.replace(/-/g, " ")}
                </span>
                {/* Date */}
                <span className="text-xs text-muted-foreground ml-auto">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {article.title}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {article.description}
              </p>

              {article.keyFinding && (
                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Key Finding
                  </span>
                  <p className="mt-1 text-sm text-foreground">
                    {article.keyFinding}
                  </p>
                </div>
              )}

              {article.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </ArticleFilters>
  )
}
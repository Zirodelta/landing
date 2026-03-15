import type { Metadata } from "next"
import { getAllResearch } from "@/lib/research"
import { ResearchPageClient } from "@/components/zirodelta/research-page-client"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Published quantitative research from Zirodelta — backtests, strategy analysis, and the evidence behind every decision we make.",
  openGraph: {
    images: [{ url: "/api/og?type=research", width: 1200, height: 630 }],
    title: "Research | Zirodelta",
    description:
      "Backtests, strategy analysis, dead-end documentation, and stress tests. Every claim backed by data.",
  },
}

export default function ResearchPage() {
  const articles = getAllResearch()

  if (articles.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Research
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Every strategy decision backed by data. We publish our dead ends too —
            because knowing what doesn&apos;t work is as valuable as knowing what does.
          </p>
        </header>
        <p className="text-muted-foreground">Research articles coming soon.</p>
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
          Research
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Every strategy decision backed by data. We publish our dead ends too —
          because knowing what doesn&apos;t work is as valuable as knowing what does.
        </p>
      </header>

      {/* Filtered Content */}
      <ResearchPageClient articles={articles} />
    </div>
  )
}
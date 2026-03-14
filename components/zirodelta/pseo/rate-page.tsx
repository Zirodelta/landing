import Link from "next/link"
import type { FundingRatePage } from "@/content/pseo/schemas/types"
import { PseoBreadcrumb } from "./pseo-breadcrumb"
import { PseoFaq } from "./pseo-faq"
import { Badge } from "@/components/ui/badge"
import { getAllComparisons, getAllPseoArticles } from "@/lib/pseo"
import { FundingRateChart } from "./funding-rate-chart"
import { PositiveRateGauge } from "./positive-rate-gauge"
import { ExchangeComparisonBars } from "./exchange-comparison-bars"
import { MonthlyHeatmap } from "./monthly-heatmap"

export function RatePageRenderer({ page }: { page: FundingRatePage }) {
  const { exchange, pair, content, related_pairs } = page
  
  // Get related comparisons involving this exchange
  const allComparisons = getAllComparisons()
  const relatedComparisons = allComparisons
    .filter(comp => comp.slug.includes(exchange.slug))
    .slice(0, 4)
  
  // Get relevant learn articles
  const allArticles = getAllPseoArticles()
  const relatedArticles = allArticles
    .filter(article => 
      article.title.toLowerCase().includes('funding') || 
      article.title.toLowerCase().includes('arbitrage') ||
      article.title.toLowerCase().includes('rate')
    )
    .slice(0, 3)

  return (
    <article className="mx-auto max-w-5xl px-6 lg:px-8">
      <PseoBreadcrumb
        items={[
          { label: "Funding Rates", href: "/rates" },
          { label: exchange.name, href: `/rates/${exchange.slug}` },
          { label: `${pair.base}/${pair.quote}` },
        ]}
      />

      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <Badge
            variant="outline"
            className={
              exchange.type === "DEX"
                ? "border-violet-500/20 text-violet-400"
                : "border-blue-500/20 text-blue-400"
            }
          >
            {exchange.type}
          </Badge>
          <Badge variant="outline" className="border-border text-muted-foreground">
            {pair.base}/{pair.quote}
          </Badge>
        </div>
        <h1
          className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {exchange.name} {pair.base}/{pair.quote} Funding Rate
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {content.intro}
        </p>
      </header>

      {/* Visual Data Components */}
      {page.visualData && (
        <section className="mb-16">
          <h2
            className="text-2xl font-extrabold tracking-tight text-foreground mb-8"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Data Insights
          </h2>
          
          {/* Top row - Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Monthly trend chart */}
            {page.visualData.monthlyTrend && (
              <FundingRateChart 
                monthlyData={page.visualData.monthlyTrend}
                className="col-span-full"
              />
            )}
          </div>
          
          {/* Second row - Gauge and Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Positive rate gauge */}
            <PositiveRateGauge 
              positivePct={page.visualData.positivePct}
              totalSettlements={page.visualData.totalSettlements}
            />
            
            {/* Exchange comparison */}
            {page.visualData.crossExchange && (
              <ExchangeComparisonBars 
                exchanges={page.visualData.crossExchange}
              />
            )}
          </div>
          
          {/* Third row - Heatmap */}
          {page.visualData.monthlyTrend && (
            <MonthlyHeatmap 
              months={page.visualData.monthlyTrend.map((m) => ({
                month: m.month,
                avgRatePct: m.annualizedPct / 365 * 30, // Approximate monthly rate
                annualizedPct: m.annualizedPct,
                positivePct: m.positivePct || 0
              }))}
              className="col-span-full"
            />
          )}
        </section>
      )}

      {/* Main content + sidebar */}
      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        <div>
          {/* How Funding Works */}
          <section className="mb-10">
            <h2
              className="text-2xl font-extrabold tracking-tight text-foreground mt-12 mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              How Funding Works on {exchange.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {content.how_funding_works}
            </p>
          </section>

          {/* Why This Pair */}
          <section className="mb-10">
            <h2
              className="text-2xl font-extrabold tracking-tight text-foreground mt-12 mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Why {pair.base}/{pair.quote}?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {content.why_this_pair}
            </p>
          </section>

          {/* Dynamic sections */}
          {content.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2
                className="text-2xl font-extrabold tracking-tight text-foreground mt-12 mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}

          {/* FAQ */}
          <PseoFaq items={content.faq} />
          
          {/* Related Section */}
          <section className="mt-16 pt-8 border-t border-border">
            <h2
              className="text-2xl font-extrabold tracking-tight text-foreground mb-6"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Related
            </h2>
            
            {relatedComparisons.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Exchange Comparisons
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedComparisons.map((comp) => (
                    <Link
                      key={comp.slug}
                      href={`/compare/${comp.slug}`}
                      className="group rounded-lg border border-border bg-card/50 p-4 transition-all duration-200 hover:border-muted-foreground/30"
                    >
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {comp.exchange_a.name} vs {comp.exchange_b.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Compare fees and mechanics
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Learn More
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/learn/${article.slug}`}
                      className="group rounded-lg border border-border bg-card/50 p-4 transition-all duration-200 hover:border-muted-foreground/30"
                    >
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Learn article
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar - related pairs */}
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <h3
              className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Related Pairs on {exchange.name}
            </h3>
            <div className="space-y-2">
              {related_pairs.map((pairSlug) => (
                <Link
                  key={pairSlug}
                  href={`/rates/${exchange.slug}/${pairSlug}`}
                  className="block rounded-lg border border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/30 hover:text-foreground"
                >
                  {pairSlug.replace("-", "/").toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}

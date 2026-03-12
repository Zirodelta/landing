import Link from "next/link"
import type { FundingRatePage } from "@/content/pseo/schemas/types"
import { PseoBreadcrumb } from "./pseo-breadcrumb"
import { PseoFaq } from "./pseo-faq"
import { Badge } from "@/components/ui/badge"

export function RatePageRenderer({ page }: { page: FundingRatePage }) {
  const { exchange, pair, content, related_pairs } = page

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

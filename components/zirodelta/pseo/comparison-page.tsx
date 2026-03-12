import { PseoBreadcrumb } from "./pseo-breadcrumb"
import { PseoFaq } from "./pseo-faq"
import { Badge } from "@/components/ui/badge"
import type { ExchangeComparisonPage } from "@/content/pseo/schemas/types"

export function ComparisonPageRenderer({
  page,
}: {
  page: ExchangeComparisonPage
}) {
  const { exchange_a, exchange_b, fee_comparison, rate_mechanics, verdict } =
    page

  return (
    <article className="mx-auto max-w-5xl px-6 lg:px-8">
      <PseoBreadcrumb
        items={[
          { label: "Compare", href: "/compare" },
          {
            label: `${exchange_a.name} vs ${exchange_b.name}`,
          },
        ]}
      />

      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-blue-500/20 text-blue-400"
          >
            Comparison
          </Badge>
        </div>
        <h1
          className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {exchange_a.name} vs {exchange_b.name}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Side-by-side comparison of funding rate mechanics, fees, and perpetual
          trading on {exchange_a.name} and {exchange_b.name}.
        </p>
      </header>

      {/* Verdict Banner */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 mb-12">
        <h2
          className="text-sm font-bold uppercase tracking-wider text-primary mb-2"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Verdict
        </h2>
        <p className="text-foreground leading-relaxed">{verdict}</p>
      </div>

      {/* Fee Comparison Table */}
      <section className="mb-12">
        <h2
          className="text-2xl font-extrabold tracking-tight text-foreground mb-6"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Fee Comparison
        </h2>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto rounded-lg border border-border">
          <table className="w-full">
            <thead className="border-b border-border bg-card/80">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-foreground">
                  Metric
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-foreground">
                  {exchange_a.name}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-foreground">
                  {exchange_b.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  Maker Fee
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.maker.a}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.maker.b}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  Taker Fee
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.taker.a}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.taker.b}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  Funding Interval
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.funding_interval.a}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.funding_interval.b}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  Settlement
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.settlement.a}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {fee_comparison.settlement.b}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="sm:hidden space-y-4">
          {[
            { label: "Maker Fee", a: fee_comparison.maker.a, b: fee_comparison.maker.b },
            { label: "Taker Fee", a: fee_comparison.taker.a, b: fee_comparison.taker.b },
            { label: "Funding Interval", a: fee_comparison.funding_interval.a, b: fee_comparison.funding_interval.b },
            { label: "Settlement", a: fee_comparison.settlement.a, b: fee_comparison.settlement.b },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-lg border border-border bg-card/50 p-4"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {row.label}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">{exchange_a.name}: </span>
                  <span className="text-foreground">{row.a}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{exchange_b.name}: </span>
                  <span className="text-foreground">{row.b}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strengths & Weaknesses side by side */}
      <section className="mb-12">
        <h2
          className="text-2xl font-extrabold tracking-tight text-foreground mb-6"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Strengths & Weaknesses
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[exchange_a, exchange_b].map((ex) => (
            <div key={ex.slug} className="space-y-4">
              <h3
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {ex.name}
              </h3>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Strengths
                </div>
                <ul className="space-y-1">
                  {ex.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-emerald-400 mt-0.5">›</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                  Weaknesses
                </div>
                <ul className="space-y-1">
                  {ex.weaknesses.map((w, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-red-400 mt-0.5">›</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rate Mechanics */}
      <section className="mb-12">
        <h2
          className="text-2xl font-extrabold tracking-tight text-foreground mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Rate Mechanics
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {rate_mechanics}
        </p>
      </section>

      {/* FAQ */}
      <PseoFaq items={page.faq} />
    </article>
  )
}

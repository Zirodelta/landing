import type { Metadata } from "next"
import Link from "next/link"
import { getAllComparisons, getExchanges } from "@/lib/pseo"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Compare Exchanges — Funding Rate Mechanics",
  description:
    "Side-by-side comparisons of perpetual futures funding rates, fees, and mechanics across major crypto exchanges.",
  openGraph: {
    images: [{ url: "/api/og?type=compare", width: 1200, height: 630 }],
    title: "Compare Exchanges | Zirodelta",
    description:
      "Side-by-side comparisons of perpetual futures funding rates across exchanges.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Exchanges | Zirodelta",
    description:
      "Side-by-side comparisons of perpetual futures funding rates across exchanges.",
  },
}

export default function CompareIndexPage() {
  const comparisons = getAllComparisons()
  const exchanges = getExchanges()

  // If no generated comparisons yet, show all possible pairings
  if (comparisons.length === 0) {
    // Show top exchange pairings as placeholders
    const topExchanges = exchanges.slice(0, 8)
    const pairs: { a: (typeof exchanges)[0]; b: (typeof exchanges)[0] }[] = []
    for (let i = 0; i < topExchanges.length; i++) {
      for (let j = i + 1; j < topExchanges.length; j++) {
        pairs.push({ a: topExchanges[i], b: topExchanges[j] })
      }
    }

    return (
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Compare Exchanges
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Side-by-side comparisons of funding rate mechanics, fee structures,
            and perpetual trading across major crypto exchanges.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pairs.map(({ a, b }) => {
            const slug = `${a.slug}-vs-${b.slug}`
            return (
              <Link
                key={slug}
                href={`/compare/${slug}`}
                className="group flex flex-col rounded-lg border border-border bg-card/50 p-5 transition-all hover:border-muted-foreground/30 hover:bg-card/80"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={
                      a.type === "DEX"
                        ? "border-violet-500/20 text-violet-400"
                        : "border-blue-500/20 text-blue-400"
                    }
                  >
                    {a.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs</span>
                  <Badge
                    variant="outline"
                    className={
                      b.type === "DEX"
                        ? "border-violet-500/20 text-violet-400"
                        : "border-blue-500/20 text-blue-400"
                    }
                  >
                    {b.type}
                  </Badge>
                </div>
                <h2
                  className="text-base font-bold text-foreground group-hover:text-primary transition-colors"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {a.name} vs {b.name}
                </h2>
                <span className="mt-3 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Compare →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Compare Exchanges
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Side-by-side comparisons of funding rate mechanics, fee structures,
          and perpetual trading across major crypto exchanges.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-card/50 p-5 transition-all hover:border-muted-foreground/30 hover:bg-card/80"
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className={
                  comp.exchange_a.type === "DEX"
                    ? "border-violet-500/20 text-violet-400"
                    : "border-blue-500/20 text-blue-400"
                }
              >
                {comp.exchange_a.type}
              </Badge>
              <span className="text-xs text-muted-foreground">vs</span>
              <Badge
                variant="outline"
                className={
                  comp.exchange_b.type === "DEX"
                    ? "border-violet-500/20 text-violet-400"
                    : "border-blue-500/20 text-blue-400"
                }
              >
                {comp.exchange_b.type}
              </Badge>
            </div>
            <h2
              className="text-base font-bold text-foreground group-hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {comp.exchange_a.name} vs {comp.exchange_b.name}
            </h2>
            <span className="mt-3 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Compare →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

import Link from "next/link"
import type { Exchange } from "@/content/pseo/schemas/types"

interface CrossExchangeLinksProps {
  currentExchangeSlug: string
  pairSlug: string
  pairLabel: string
  exchanges: Exchange[]
}

export function CrossExchangeLinks({
  currentExchangeSlug,
  pairSlug,
  pairLabel,
  exchanges,
}: CrossExchangeLinksProps) {
  const others = exchanges.filter((e) => e.slug !== currentExchangeSlug)
  if (others.length === 0) return null

  return (
    <section className="mb-12">
      <h2
        className="text-2xl font-extrabold tracking-tight text-foreground mb-2"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {pairLabel} on Other Exchanges
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Compare {pairLabel} funding rates across {others.length} exchanges
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {others.map((ex) => (
          <Link
            key={ex.slug}
            href={`/rates/${ex.slug}/${pairSlug}`}
            className="group rounded-lg border border-border bg-card/50 px-4 py-3 transition-all duration-200 hover:border-[#009B88]/40 hover:bg-[#009B88]/[0.04]"
          >
            <span className="block text-sm font-semibold text-foreground group-hover:text-[#009B88] transition-colors">
              {ex.name}
            </span>
            <span className="block text-xs text-muted-foreground mt-0.5">
              {ex.type} · {ex.rate_frequency}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/** Compact sidebar version */
export function CrossExchangeLinksSidebar({
  currentExchangeSlug,
  pairSlug,
  pairLabel,
  exchanges,
}: CrossExchangeLinksProps) {
  const others = exchanges.filter((e) => e.slug !== currentExchangeSlug)
  if (others.length === 0) return null

  return (
    <div className="mt-8">
      <h3
        className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {pairLabel} on Other Exchanges
      </h3>
      <div className="space-y-2">
        {others.map((ex) => (
          <Link
            key={ex.slug}
            href={`/rates/${ex.slug}/${pairSlug}`}
            className="block rounded-lg border border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-[#009B88]/40 hover:text-foreground"
          >
            <span className="font-medium">{ex.name}</span>
            <span className="text-xs ml-2 opacity-60">{ex.type}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

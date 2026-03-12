import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getExchanges,
  getPairs,
  getRatePage,
} from "@/lib/pseo"
import { RatePageRenderer } from "@/components/zirodelta/pseo/rate-page"

interface Props {
  params: Promise<{ exchange: string; pair: string }>
}

export async function generateStaticParams() {
  const exchanges = getExchanges()
  const pairs = getPairs()
  return exchanges.flatMap((ex) =>
    pairs.map((p) => ({ exchange: ex.slug, pair: p.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exchange, pair } = await params
  const page = getRatePage(exchange, pair)
  if (!page) {
    const exchanges = getExchanges()
    const pairs = getPairs()
    const ex = exchanges.find((e) => e.slug === exchange)
    const p = pairs.find((pp) => pp.slug === pair)
    if (!ex || !p) return {}
    const title = `${ex.name} ${p.base}/${p.quote} Funding Rate`
    const description = `${p.base}/${p.quote} perpetual funding rate on ${ex.name}. Explore rate mechanics, historical trends, and arbitrage opportunities.`
    return {
      title,
      description,
      openGraph: { title: `${title} | Zirodelta`, description, type: "article" },
      twitter: { card: "summary_large_image", title, description },
    }
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    openGraph: {
      title: `${page.seo.title} | Zirodelta`,
      description: page.seo.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  }
}

export default async function RatePage({ params }: Props) {
  const { exchange, pair } = await params

  const page = getRatePage(exchange, pair)

  if (!page) {
    // Fallback: show a placeholder if content hasn't been generated yet
    const exchanges = getExchanges()
    const pairs = getPairs()
    const ex = exchanges.find((e) => e.slug === exchange)
    const p = pairs.find((pp) => pp.slug === pair)
    if (!ex || !p) notFound()

    return (
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
        <h1
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {ex.name} {p.base}/{p.quote} Funding Rate
        </h1>
        <p className="text-lg text-muted-foreground">
          Detailed funding rate analysis for this pair is being generated.
          Check back soon.
        </p>
      </div>
    )
  }

  return <RatePageRenderer page={page} />
}

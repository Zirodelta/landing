import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getExchanges, getPairs } from "@/lib/pseo"
import { PseoBreadcrumb } from "@/components/zirodelta/pseo/pseo-breadcrumb"
import { Badge } from "@/components/ui/badge"

interface Props {
  params: Promise<{ exchange: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getExchanges().map((e) => ({ exchange: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exchange: slug } = await params
  const exchanges = getExchanges()
  const exchange = exchanges.find((e) => e.slug === slug)
  if (!exchange) return {}

  const title = `${exchange.name} Funding Rates — All Perpetual Pairs`
  const description = `Explore funding rates for all perpetual futures pairs on ${exchange.name}. ${exchange.description}`

  return {
    title,
    description,
    alternates: {
      canonical: `https://zirodelta.com/rates/${slug}`,
    },
    openGraph: {
      title: `${title} | Zirodelta`,
      description,
      images: [{ url: `/api/og?type=exchange&exchange=${slug}`, width: 1200, height: 630, alt: "Zirodelta" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?type=exchange&exchange=${slug}`],
    },
  }
}

const categoryLabels: Record<string, string> = {
  major: "Major",
  l1: "Layer 1",
  l2: "Layer 2",
  defi: "DeFi",
  meme: "Meme",
  ai: "AI",
  infra: "Infrastructure",
  "btc-eco": "BTC Ecosystem",
  gaming: "Gaming",
  nft: "NFT",
}

const categoryColors: Record<string, string> = {
  major: "border-amber-500/20 text-amber-400",
  l1: "border-blue-500/20 text-blue-400",
  l2: "border-violet-500/20 text-violet-400",
  defi: "border-emerald-500/20 text-emerald-400",
  meme: "border-pink-500/20 text-pink-400",
  ai: "border-cyan-500/20 text-cyan-400",
  infra: "border-border text-muted-foreground",
  "btc-eco": "border-orange-500/20 text-orange-400",
  gaming: "border-indigo-500/20 text-indigo-400",
  nft: "border-rose-500/20 text-rose-400",
}

export default async function ExchangePage({ params }: Props) {
  const { exchange: slug } = await params
  const exchanges = getExchanges()
  const exchange = exchanges.find((e) => e.slug === slug)

  if (!exchange) notFound()

  const pairs = getPairs()

  // Group pairs by category
  const grouped = pairs.reduce(
    (acc, pair) => {
      const cat = pair.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(pair)
      return acc
    },
    {} as Record<string, typeof pairs>
  )

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
      <PseoBreadcrumb
        items={[
          { label: "Funding Rates", href: "/rates" },
          { label: exchange.name },
        ]}
      />

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
          <span className="text-sm text-muted-foreground">
            {exchange.fee_tier} · {exchange.rate_frequency} funding
          </span>
        </div>
        <h1
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {exchange.name} Funding Rates
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {exchange.description}
        </p>
      </header>

      {/* Strengths & Weaknesses */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2
            className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ✓ Strengths
          </h2>
          <ul className="space-y-2">
            {exchange.strengths.map((s, i) => (
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
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
          <h2
            className="text-sm font-bold uppercase tracking-wider text-red-400 mb-3"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ✗ Weaknesses
          </h2>
          <ul className="space-y-2">
            {exchange.weaknesses.map((w, i) => (
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

      {/* Pairs by category */}
      {Object.entries(grouped).map(([category, catPairs]) => (
        <section key={category} className="mb-10">
          <h2
            className="text-xl font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {categoryLabels[category] || category}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {catPairs.map((pair) => (
              <Link
                key={pair.slug}
                href={`/rates/${exchange.slug}/${pair.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-card/50 px-4 py-3 transition-all hover:border-muted-foreground/30 hover:bg-card/80"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {pair.base}/{pair.quote}
                </span>
                <Badge
                  variant="outline"
                  className={
                    categoryColors[category] || categoryColors.infra
                  }
                >
                  {pair.volume_tier}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

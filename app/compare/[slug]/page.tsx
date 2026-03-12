import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllComparisons, getComparison, getExchanges } from "@/lib/pseo"
import { ComparisonPageRenderer } from "@/components/zirodelta/pseo/comparison-page"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  // Return empty — dynamicParams=true handles all routes on-demand
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getComparison(slug)

  if (page) {
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

  // Parse slug for fallback metadata
  const parts = slug.split("-vs-")
  if (parts.length === 2) {
    const exchanges = getExchanges()
    const a = exchanges.find((e) => e.slug === parts[0])
    const b = exchanges.find((e) => e.slug === parts[1])
    if (a && b) {
      const title = `${a.name} vs ${b.name} — Funding Rate Comparison`
      const description = `Compare perpetual futures funding rates, fees, and mechanics between ${a.name} and ${b.name}.`
      return {
        title,
        description,
        openGraph: { title: `${title} | Zirodelta`, description, type: "article" },
        twitter: { card: "summary_large_image", title, description },
      }
    }
  }

  return {}
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const page = getComparison(slug)

  if (!page) {
    // Parse slug and show placeholder
    const parts = slug.split("-vs-")
    if (parts.length === 2) {
      const exchanges = getExchanges()
      const a = exchanges.find((e) => e.slug === parts[0])
      const b = exchanges.find((e) => e.slug === parts[1])
      if (a && b) {
        return (
          <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
            <h1
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {a.name} vs {b.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Detailed comparison is being generated. Check back soon.
            </p>
          </div>
        )
      }
    }
    notFound()
  }

  return <ComparisonPageRenderer page={page} />
}

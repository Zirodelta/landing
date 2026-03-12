import type { MetadataRoute } from "next"
import { getExchanges, getPairs, getAllComparisons } from "@/lib/pseo"
import { getArticleSlugs } from "@/lib/learn"

const BASE_URL = "https://zirodelta.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const exchanges = getExchanges()
  const pairs = getPairs()
  const comparisons = getAllComparisons()
  const learnSlugs = getArticleSlugs()

  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/rates`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/docs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  // Exchange index pages: /rates/[exchange]
  const exchangePages: MetadataRoute.Sitemap = exchanges.map((ex) => ({
    url: `${BASE_URL}/rates/${ex.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // Rate pages: /rates/[exchange]/[pair]
  const ratePages: MetadataRoute.Sitemap = exchanges.flatMap((ex) =>
    pairs.map((p) => ({
      url: `${BASE_URL}/rates/${ex.slug}/${p.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  )

  // Comparison pages: /compare/[slug]
  const comparisonSlugs = comparisons.length > 0
    ? comparisons.map((c) => c.slug)
    : (() => {
        const slugs: string[] = []
        for (let i = 0; i < exchanges.length; i++) {
          for (let j = i + 1; j < exchanges.length; j++) {
            slugs.push(`${exchanges[i].slug}-vs-${exchanges[j].slug}`)
          }
        }
        return slugs
      })()

  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Learn articles: /learn/[slug]
  const learnPages: MetadataRoute.Sitemap = learnSlugs.map((slug) => ({
    url: `${BASE_URL}/learn/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...exchangePages,
    ...ratePages,
    ...comparisonPages,
    ...learnPages,
  ]
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticle, getArticleSlugs, getAllArticles } from "@/lib/learn"
import { DecisionPage } from "@/components/zirodelta/decision-page"
import { ArticleContent } from "@/components/zirodelta/article-content"
import { getExchanges } from "@/lib/pseo"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    openGraph: {
        images: [{ url: `/api/og?type=learn&title=${encodeURIComponent(article.title)}`, width: 1200, height: 630 }],
      title: `${article.title} | Zirodelta`,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  }
}

const categoryLabels: Record<string, string> = {
  comparison: "Comparison",
  constraint: "Constraint",
  "use-case": "Use Case",
  general: "Guide",
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article || (article.draft && process.env.NODE_ENV !== "development")) {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const allArticles = getAllArticles()
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3)
    .map((a) => ({
      title: a.title,
      href: `/learn/${a.slug}`,
      category: categoryLabels[a.category] || a.category,
    }))
  
  // Add relevant exchange rate links if this is a funding rate related article
  const exchanges = getExchanges()
  const rateLinks = article.title.toLowerCase().includes('funding') || 
                   article.title.toLowerCase().includes('arbitrage')
    ? exchanges.slice(0, 2).map(ex => ({
        title: `${ex.name} Funding Rates`,
        href: `/rates/${ex.slug}`,
        category: 'Explore Rates'
      }))
    : []
  
  const related = [...relatedArticles, ...rateLinks]

  return (
    <DecisionPage
      title={article.title}
      subtitle={article.description}
      description={article.description}
      bestFor={article.bestFor}
      notFor={article.notFor}
      publishedDate={article.publishedDate}
      updatedDate={article.updatedDate}
      category={categoryLabels[article.category] || article.category}
      related={related}
    >
      <ArticleContent content={article.content} />
    </DecisionPage>
  )
}

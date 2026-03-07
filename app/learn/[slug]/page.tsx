import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticle, getArticleSlugs } from "@/lib/learn"
import { DecisionPage } from "@/components/zirodelta/decision-page"

interface Props {
  params: Promise<{ slug: string }>
}

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
    >
      {/* MDX body content will go here once articles are written */}
      <div className="text-muted-foreground">
        <p>This article is coming soon.</p>
      </div>
    </DecisionPage>
  )
}

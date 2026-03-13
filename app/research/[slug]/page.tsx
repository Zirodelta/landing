import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getResearchBySlug, getAllResearchSlugs } from "@/lib/research"
import { ArticleContent } from "@/components/zirodelta/article-content"
import { Breadcrumb } from "@/components/zirodelta/breadcrumb"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllResearchSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getResearchBySlug(slug)
  if (!article) return { title: "Not Found" }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | Zirodelta Research`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedDate,
      tags: article.tags,
    },
  }
}

export default async function ResearchArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getResearchBySlug(slug)
  if (!article) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Research", href: "/research" },
          { label: article.title },
        ]}
      />

      <header className="mt-8 mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase">
            {article.status}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {article.updatedDate && (
            <span className="text-xs text-muted-foreground">
              · Updated{" "}
              {new Date(article.updatedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <h1
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {article.title}
        </h1>

        <p className="text-lg text-muted-foreground">
          {article.description}
        </p>

        {article.keyFinding && (
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 px-5 py-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Key Finding
            </span>
            <p className="mt-1 text-foreground font-medium">
              {article.keyFinding}
            </p>
          </div>
        )}

        {article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <ArticleContent content={article.content} />
    </div>
  )
}

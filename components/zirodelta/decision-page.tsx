import { Breadcrumb } from "./breadcrumb"
import { CTA } from "./cta"
import Link from "next/link"

interface RelatedArticle {
  title: string
  href: string
  category: string
}

interface DecisionPageProps {
  title: string
  subtitle: string
  description: string
  bestFor: string[]
  notFor: string[]
  publishedDate: string
  updatedDate?: string
  category: string
  related?: RelatedArticle[]
  children: React.ReactNode
}

export function DecisionPage({
  title,
  subtitle,
  description,
  bestFor,
  notFor,
  publishedDate,
  updatedDate,
  category,
  related,
  children,
}: DecisionPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedDate,
    dateModified: updatedDate || publishedDate,
    author: { "@type": "Organization", name: "Zirodelta" },
    publisher: {
      "@type": "Organization",
      name: "Zirodelta",
      url: "https://zirodelta.com",
    },
  }

  return (
    <article className="mx-auto max-w-4xl px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Learn", href: "/learn" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <header className="mb-12">
        <div className="mb-4 inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1">
          <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {category}
          </span>
        </div>
        <h1
          className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {subtitle}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={publishedDate}>
            Published{" "}
            {new Date(publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {updatedDate && (
            <>
              <span>·</span>
              <time dateTime={updatedDate}>
                Updated{" "}
                {new Date(updatedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </div>
      </header>

      {/* Best For / Not For */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2
            className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ✓ Best for
          </h2>
          <ul className="space-y-2">
            {bestFor.map((item, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-emerald-400 mt-0.5">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
          <h2
            className="text-sm font-bold uppercase tracking-wider text-red-400 mb-3"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ✗ Not for
          </h2>
          <ul className="space-y-2">
            {notFor.map((item, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-red-400 mt-0.5">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none mb-16 [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_strong]:text-foreground">
        {children}
      </div>

      {/* Related */}
      {related && related.length > 0 && (
        <section className="border-t border-border pt-12 mb-16">
          <h2
            className="text-xl font-bold text-foreground mb-6"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Related
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((article, i) => (
              <Link
                key={i}
                href={article.href}
                className="group rounded-lg border border-border bg-card/50 p-5 transition-colors hover:border-muted-foreground/30"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {article.category}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <CTA />
    </article>
  )
}

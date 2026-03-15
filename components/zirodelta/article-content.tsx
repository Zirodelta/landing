import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"

export function ArticleContent({ content }: { content: string }) {
  if (!content || content.trim() === "" || content.trim() === "Content coming soon.") {
    return (
      <p className="text-muted-foreground italic">This article is coming soon.</p>
    )
  }

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2
              className="text-2xl font-extrabold tracking-tight text-foreground mt-12 mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className="text-lg font-bold text-foreground mt-8 mb-3"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 mb-4 ml-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 mb-4 ml-4 list-decimal">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-muted-foreground leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="text-foreground font-semibold">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/30 pl-4 my-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-border my-8" />,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-border bg-card/80">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-border/50 last:border-0">{children}</tr>
          ),
          th: ({ children }) => (
            <th
              className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-foreground"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-muted-foreground">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Author Attribution */}
      <div className="mt-12 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">Z</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Zirodelta Research</p>
            <p className="text-xs text-muted-foreground">
              Analysis based on 9.4M+ funding rate settlements (2019-2026).{' '}
              <Link href="/about" className="text-primary hover:underline">
                Learn about our methodology
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

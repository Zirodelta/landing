import ReactMarkdown from "react-markdown"

export function ArticleContent({ content }: { content: string }) {
  if (!content || content.trim() === "" || content.trim() === "Content coming soon.") {
    return (
      <p className="text-muted-foreground italic">This article is coming soon.</p>
    )
  }

  return (
    <ReactMarkdown
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
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

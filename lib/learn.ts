import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content/learn")

export interface ArticleMeta {
  title: string
  slug: string
  description: string
  category: string
  bestFor: string[]
  notFor: string[]
  publishedDate: string
  updatedDate?: string
  draft?: boolean
}

export interface Article extends ArticleMeta {
  content: string
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))

  const articles = files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8")
      const { data } = matter(raw)
      return {
        title: data.title || "",
        slug: data.slug || filename.replace(/\.mdx$/, ""),
        description: data.description || "",
        category: data.category || "general",
        bestFor: data.bestFor || [],
        notFor: data.notFor || [],
        publishedDate: data.publishedDate || "",
        updatedDate: data.updatedDate,
        draft: data.draft ?? false,
      } as ArticleMeta
    })
    .filter((a) => !a.draft || process.env.NODE_ENV === "development")
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    )

  return articles
}

export function getArticle(slug: string): Article | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, "utf-8")
  const { data, content } = matter(raw)

  return {
    title: data.title || "",
    slug: data.slug || slug,
    description: data.description || "",
    category: data.category || "general",
    bestFor: data.bestFor || [],
    notFor: data.notFor || [],
    publishedDate: data.publishedDate || "",
    updatedDate: data.updatedDate,
    draft: data.draft ?? false,
    content,
  }
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

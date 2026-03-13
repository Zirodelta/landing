import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content/research")

export interface ResearchMeta {
  title: string
  slug: string
  description: string
  category: string
  status: string
  date: string
  updatedDate?: string
  tags: string[]
  keyFinding?: string
  draft?: boolean
}

export interface ResearchArticle extends ResearchMeta {
  content: string
}

export function getAllResearch(): ResearchMeta[] {
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
        category: data.category || "research",
        status: data.status || "published",
        date: data.date || "",
        updatedDate: data.updatedDate,
        tags: data.tags || [],
        keyFinding: data.keyFinding,
        draft: data.draft || false,
      } as ResearchMeta
    })
    .filter((a) => !a.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return articles
}

export function getResearchBySlug(slug: string): ResearchArticle | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    title: data.title || "",
    slug: data.slug || slug,
    description: data.description || "",
    category: data.category || "research",
    status: data.status || "published",
    date: data.date || "",
    updatedDate: data.updatedDate,
    tags: data.tags || [],
    keyFinding: data.keyFinding,
    draft: data.draft || false,
    content,
  }
}

export function getAllResearchSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

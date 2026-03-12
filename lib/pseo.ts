import fs from "fs"
import path from "path"

import type {
  FundingRatePage,
  ExchangeComparisonPage,
  PseoLearnArticle,
  Exchange,
  Pair,
  Audience,
} from "@/content/pseo/schemas/types"

// Re-export types for consumers
export type {
  FundingRatePage,
  ExchangeComparisonPage,
  PseoLearnArticle,
  Exchange,
  Pair,
  Audience,
}

const PSEO_DIR = path.join(process.cwd(), "content/pseo")
const GENERATED_DIR = path.join(PSEO_DIR, "generated")
const TAXONOMY_DIR = path.join(PSEO_DIR, "taxonomy")

// --- Taxonomy readers ---

export function getExchanges(): Exchange[] {
  const raw = fs.readFileSync(path.join(TAXONOMY_DIR, "exchanges.json"), "utf-8")
  return JSON.parse(raw)
}

export function getPairs(): Pair[] {
  const raw = fs.readFileSync(path.join(TAXONOMY_DIR, "pairs.json"), "utf-8")
  return JSON.parse(raw)
}

export function getAudiences(): Audience[] {
  const raw = fs.readFileSync(path.join(TAXONOMY_DIR, "audiences.json"), "utf-8")
  return JSON.parse(raw)
}

// --- Funding Rate Pages ---

function rateDir(): string {
  return path.join(GENERATED_DIR, "rates")
}

export function getAllRatePages(): FundingRatePage[] {
  const dir = rateDir()
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8")
      return JSON.parse(raw) as FundingRatePage
    })
}

export function getRatePage(
  exchange: string,
  pair: string
): FundingRatePage | null {
  const filepath = path.join(rateDir(), `${exchange}_${pair}.json`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf-8")
  return JSON.parse(raw) as FundingRatePage
}

// --- Exchange Comparison Pages ---

function comparisonDir(): string {
  return path.join(GENERATED_DIR, "comparisons")
}

export function getAllComparisons(): ExchangeComparisonPage[] {
  const dir = comparisonDir()
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8")
      return JSON.parse(raw) as ExchangeComparisonPage
    })
}

export function getComparison(slug: string): ExchangeComparisonPage | null {
  const filepath = path.join(comparisonDir(), `${slug}.json`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf-8")
  return JSON.parse(raw) as ExchangeComparisonPage
}

// --- pSEO Learn Articles ---

function articlesDir(): string {
  return path.join(GENERATED_DIR, "articles")
}

export function getAllPseoArticles(): PseoLearnArticle[] {
  const dir = articlesDir()
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8")
      return JSON.parse(raw) as PseoLearnArticle
    })
}

export function getPseoArticle(slug: string): PseoLearnArticle | null {
  const filepath = path.join(articlesDir(), `${slug}.json`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf-8")
  return JSON.parse(raw) as PseoLearnArticle
}

// --- Static params helpers ---

export function generateRatePageParams(): { exchange: string; pair: string }[] {
  const exchanges = getExchanges()
  const pairs = getPairs()
  return exchanges.flatMap((ex) =>
    pairs.map((p) => ({ exchange: ex.slug, pair: p.slug }))
  )
}

export function generateComparisonParams(): { slug: string }[] {
  return getAllComparisons().map((c) => ({ slug: c.slug }))
}

export function generatePseoArticleParams(): { slug: string }[] {
  return getAllPseoArticles().map((a) => ({ slug: a.slug }))
}

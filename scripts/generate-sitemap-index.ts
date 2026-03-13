/**
 * Generate sitemap index + sub-sitemaps as static XML files.
 * 
 * Output:
 *   public/sitemap-index.xml    (index pointing to sub-sitemaps)
 *   public/sitemap-static.xml   (static pages + tools + exchange indexes)
 *   public/sitemap-rates.xml    (950 rate pages)
 *   public/sitemap-compare.xml  (comparisons + learn articles)
 * 
 * Usage: npx tsx scripts/generate-sitemap-index.ts
 */

import * as fs from "fs"
import * as path from "path"

const BASE_URL = "https://zirodelta.com"
const PUBLIC_DIR = path.join(process.cwd(), "public")

// Import data helpers
const pseoPath = path.join(process.cwd(), "lib", "pseo.ts")
// We'll inline the data since we can't easily import TS modules here

// Read exchange/pair data from generated JSON files
const CONTENT_DIR = path.join(process.cwd(), "content", "pseo", "generated")

function getExchangeSlugs(): string[] {
  const ratesDir = path.join(CONTENT_DIR, "rates")
  if (!fs.existsSync(ratesDir)) return []
  return fs.readdirSync(ratesDir).filter(f => 
    fs.statSync(path.join(ratesDir, f)).isDirectory()
  )
}

function getPairSlugs(exchange: string): string[] {
  const dir = path.join(CONTENT_DIR, "rates", exchange)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => f.replace(".json", ""))
}

function getComparisonSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, "comparisons")
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => f.replace(".json", ""))
}

function getLearnSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "learn")
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(f => f.replace(/\.mdx?$/, ""))
}

function getResearchSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "research")
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(f => f.replace(/\.mdx?$/, ""))
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function buildUrlset(urls: Array<{url: string, changefreq: string, priority: number}>): string {
  const now = new Date().toISOString()
  const entries = urls.map(u => `  <url>
    <loc>${xmlEscape(u.url)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

function buildSitemapIndex(sitemaps: string[]): string {
  const now = new Date().toISOString()
  const entries = sitemaps.map(s => `  <sitemap>
    <loc>${xmlEscape(s)}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`
}

// ── Generate ───────────────────────────────────────────────────────────

const exchanges = getExchangeSlugs()
const comparisons = getComparisonSlugs()
const learnSlugs = getLearnSlugs()
const researchSlugs = getResearchSlugs()

console.log(`Exchanges: ${exchanges.length}`)
console.log(`Comparisons: ${comparisons.length}`)
console.log(`Learn articles: ${learnSlugs.length}`)
console.log(`Research articles: ${researchSlugs.length}`)

// 1. Static sitemap (pages + tools + exchange indexes)
const staticUrls = [
  { url: BASE_URL, changefreq: "weekly", priority: 1.0 },
  { url: `${BASE_URL}/rates`, changefreq: "daily", priority: 0.9 },
  { url: `${BASE_URL}/compare`, changefreq: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/learn`, changefreq: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/research`, changefreq: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/pact`, changefreq: "monthly", priority: 0.3 },
  { url: `${BASE_URL}/docs`, changefreq: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/tools`, changefreq: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/tools/funding-rate-calculator`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/apy-estimator`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/spread-scanner`, changefreq: "daily", priority: 0.7 },
  ...exchanges.map(ex => ({ url: `${BASE_URL}/rates/${ex}`, changefreq: "daily", priority: 0.8 })),
]
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-static.xml"), buildUrlset(staticUrls))
console.log(`sitemap-static.xml: ${staticUrls.length} URLs`)

// 2. Rates sitemap (the bulk — one per exchange/pair)
const rateUrls: Array<{url: string, changefreq: string, priority: number}> = []
for (const ex of exchanges) {
  const pairs = getPairSlugs(ex)
  for (const pair of pairs) {
    rateUrls.push({ url: `${BASE_URL}/rates/${ex}/${pair}`, changefreq: "daily", priority: 0.7 })
  }
}
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-rates.xml"), buildUrlset(rateUrls))
console.log(`sitemap-rates.xml: ${rateUrls.length} URLs`)

// 3. Compare + Learn + Research sitemap
const compareUrls = [
  ...comparisons.map(slug => ({ url: `${BASE_URL}/compare/${slug}`, changefreq: "weekly", priority: 0.7 })),
  ...learnSlugs.map(slug => ({ url: `${BASE_URL}/learn/${slug}`, changefreq: "monthly", priority: 0.8 })),
  { url: `${BASE_URL}/research`, changefreq: "weekly", priority: 0.8 },
  ...researchSlugs.map(slug => ({ url: `${BASE_URL}/research/${slug}`, changefreq: "monthly", priority: 0.8 })),
]
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-compare.xml"), buildUrlset(compareUrls))
console.log(`sitemap-compare.xml: ${compareUrls.length} URLs`)

// 4. Sitemap index
const sitemapIndex = buildSitemapIndex([
  `${BASE_URL}/sitemap-static.xml`,
  `${BASE_URL}/sitemap-rates.xml`,
  `${BASE_URL}/sitemap-compare.xml`,
])
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-index.xml"), sitemapIndex)
console.log(`\nsitemap-index.xml: 3 sub-sitemaps`)

const total = staticUrls.length + rateUrls.length + compareUrls.length
console.log(`Total URLs: ${total}`)

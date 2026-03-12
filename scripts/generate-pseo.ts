#!/usr/bin/env npx tsx
/**
 * pSEO Content Generator
 *
 * Uses Gemini 2.0 Flash to generate structured JSON content for funding rate pages,
 * exchange comparisons, and learn articles.
 *
 * Usage:
 *   npx tsx scripts/generate-pseo.ts --type rates
 *   npx tsx scripts/generate-pseo.ts --type comparisons --limit 10
 *   npx tsx scripts/generate-pseo.ts --type rates --exchange binance --dry-run
 *   npx tsx scripts/generate-pseo.ts --type learn --limit 5
 */

import fs from "fs"
import path from "path"
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"
import pLimit from "p-limit"

import type {
  Exchange,
  Pair,
  FundingRatePage,
  ExchangeComparisonPage,
} from "../content/pseo/schemas/types"

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2)

function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`)
  if (idx === -1) return undefined
  return args[idx + 1]
}

const TYPE = getArg("type") || "rates"
const DRY_RUN = args.includes("--dry-run")
const EXCHANGE_FILTER = getArg("exchange")
const LIMIT = getArg("limit") ? parseInt(getArg("limit")!, 10) : undefined

if (!["rates", "comparisons", "learn"].includes(TYPE)) {
  console.error(`Invalid --type: ${TYPE}. Use rates|comparisons|learn`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
if (!API_KEY && !DRY_RUN) {
  console.error("Set GEMINI_API_KEY or GOOGLE_API_KEY environment variable")
  process.exit(1)
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null

const TAXONOMY_DIR = path.join(__dirname, "../content/pseo/taxonomy")
const OUTPUT_DIR = path.join(__dirname, "../content/pseo/generated")

const exchanges: Exchange[] = JSON.parse(
  fs.readFileSync(path.join(TAXONOMY_DIR, "exchanges.json"), "utf-8")
)
const pairs: Pair[] = JSON.parse(
  fs.readFileSync(path.join(TAXONOMY_DIR, "pairs.json"), "utf-8")
)

const limit = pLimit(20)

// ---------------------------------------------------------------------------
// Retry with exponential backoff
// ---------------------------------------------------------------------------

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 5
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err: unknown) {
      const status =
        err && typeof err === "object" && "status" in err
          ? (err as { status: number }).status
          : 0
      const isRetryable = status === 429 || status === 503 || status >= 500

      if (!isRetryable || attempt === maxRetries) throw err

      const delay = Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 60000)
      console.log(`  ↳ Rate limited (${status}), retrying in ${Math.round(delay / 1000)}s...`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error("Unreachable")
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function validateRatePage(data: unknown): data is FundingRatePage {
  const d = data as FundingRatePage
  return !!(
    d?.exchange?.slug &&
    d?.exchange?.name &&
    d?.pair?.slug &&
    d?.pair?.base &&
    d?.seo?.title &&
    d?.seo?.description &&
    d?.content?.intro &&
    d?.content?.how_funding_works &&
    d?.content?.why_this_pair &&
    Array.isArray(d?.content?.sections) &&
    Array.isArray(d?.content?.faq) &&
    Array.isArray(d?.related_pairs)
  )
}

function validateComparison(data: unknown): data is ExchangeComparisonPage {
  const d = data as ExchangeComparisonPage
  return !!(
    d?.slug &&
    d?.exchange_a?.slug &&
    d?.exchange_b?.slug &&
    d?.fee_comparison &&
    d?.rate_mechanics &&
    d?.verdict &&
    Array.isArray(d?.faq) &&
    d?.seo?.title
  )
}

// ---------------------------------------------------------------------------
// Gemini schemas for structured output
// ---------------------------------------------------------------------------

const ratePageSchema = {
  type: SchemaType.OBJECT,
  properties: {
    exchange: {
      type: SchemaType.OBJECT,
      properties: {
        slug: { type: SchemaType.STRING },
        name: { type: SchemaType.STRING },
        type: { type: SchemaType.STRING },
      },
      required: ["slug", "name", "type"],
    },
    pair: {
      type: SchemaType.OBJECT,
      properties: {
        slug: { type: SchemaType.STRING },
        base: { type: SchemaType.STRING },
        quote: { type: SchemaType.STRING },
      },
      required: ["slug", "base", "quote"],
    },
    seo: {
      type: SchemaType.OBJECT,
      properties: {
        title: { type: SchemaType.STRING },
        description: { type: SchemaType.STRING },
        keywords: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
      },
      required: ["title", "description", "keywords"],
    },
    content: {
      type: SchemaType.OBJECT,
      properties: {
        intro: { type: SchemaType.STRING },
        how_funding_works: { type: SchemaType.STRING },
        why_this_pair: { type: SchemaType.STRING },
        sections: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              heading: { type: SchemaType.STRING },
              body: { type: SchemaType.STRING },
            },
            required: ["heading", "body"],
          },
        },
        faq: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              question: { type: SchemaType.STRING },
              answer: { type: SchemaType.STRING },
            },
            required: ["question", "answer"],
          },
        },
      },
      required: ["intro", "how_funding_works", "why_this_pair", "sections", "faq"],
    },
    related_pairs: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
  },
  required: ["exchange", "pair", "seo", "content", "related_pairs"],
}

const comparisonSchema = {
  type: SchemaType.OBJECT,
  properties: {
    slug: { type: SchemaType.STRING },
    exchange_a: {
      type: SchemaType.OBJECT,
      properties: {
        slug: { type: SchemaType.STRING },
        name: { type: SchemaType.STRING },
        type: { type: SchemaType.STRING },
        fee_tier: { type: SchemaType.STRING },
        rate_frequency: { type: SchemaType.STRING },
        strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        weaknesses: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      },
      required: ["slug", "name", "type", "fee_tier", "rate_frequency", "strengths", "weaknesses"],
    },
    exchange_b: {
      type: SchemaType.OBJECT,
      properties: {
        slug: { type: SchemaType.STRING },
        name: { type: SchemaType.STRING },
        type: { type: SchemaType.STRING },
        fee_tier: { type: SchemaType.STRING },
        rate_frequency: { type: SchemaType.STRING },
        strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        weaknesses: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      },
      required: ["slug", "name", "type", "fee_tier", "rate_frequency", "strengths", "weaknesses"],
    },
    fee_comparison: {
      type: SchemaType.OBJECT,
      properties: {
        maker: {
          type: SchemaType.OBJECT,
          properties: { a: { type: SchemaType.STRING }, b: { type: SchemaType.STRING } },
          required: ["a", "b"],
        },
        taker: {
          type: SchemaType.OBJECT,
          properties: { a: { type: SchemaType.STRING }, b: { type: SchemaType.STRING } },
          required: ["a", "b"],
        },
        funding_interval: {
          type: SchemaType.OBJECT,
          properties: { a: { type: SchemaType.STRING }, b: { type: SchemaType.STRING } },
          required: ["a", "b"],
        },
        settlement: {
          type: SchemaType.OBJECT,
          properties: { a: { type: SchemaType.STRING }, b: { type: SchemaType.STRING } },
          required: ["a", "b"],
        },
      },
      required: ["maker", "taker", "funding_interval", "settlement"],
    },
    rate_mechanics: { type: SchemaType.STRING },
    verdict: { type: SchemaType.STRING },
    faq: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: { type: SchemaType.STRING },
          answer: { type: SchemaType.STRING },
        },
        required: ["question", "answer"],
      },
    },
    seo: {
      type: SchemaType.OBJECT,
      properties: {
        title: { type: SchemaType.STRING },
        description: { type: SchemaType.STRING },
        keywords: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      },
      required: ["title", "description", "keywords"],
    },
  },
  required: ["slug", "exchange_a", "exchange_b", "fee_comparison", "rate_mechanics", "verdict", "faq", "seo"],
}

// ---------------------------------------------------------------------------
// Generation functions
// ---------------------------------------------------------------------------

async function generateRatePage(
  exchange: Exchange,
  pair: Pair
): Promise<FundingRatePage | null> {
  if (!genAI) return null

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: ratePageSchema,
    },
  })

  const relatedPairs = pairs
    .filter((p) => p.slug !== pair.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((p) => p.slug)

  const prompt = `Generate detailed, expert-level content for a funding rate page about the ${pair.base}/${pair.quote} perpetual futures pair on ${exchange.name} (${exchange.type}).

Exchange details:
- Fee tier: ${exchange.fee_tier}
- Funding rate frequency: ${exchange.rate_frequency}
- Description: ${exchange.description}
- Strengths: ${exchange.strengths.join(", ")}
- Weaknesses: ${exchange.weaknesses.join(", ")}

Pair: ${pair.base}/${pair.quote} (category: ${pair.category}, volume tier: ${pair.volume_tier})

Requirements:
- exchange.slug: "${exchange.slug}", exchange.name: "${exchange.name}", exchange.type: "${exchange.type}"
- pair.slug: "${pair.slug}", pair.base: "${pair.base}", pair.quote: "${pair.quote}"
- SEO title should be natural, include exchange name and pair, under 60 chars
- SEO description: 150-160 chars, include key terms
- SEO keywords: 6-10 relevant terms
- Content intro: 2-3 sentences overview
- how_funding_works: 3-4 sentences specific to this exchange's mechanics
- why_this_pair: 2-3 sentences on why this pair matters for funding rate arbitrage
- sections: exactly 3 sections with detailed body text (each 3-5 sentences). Topics: historical rate patterns, arbitrage opportunities, risk considerations
- faq: exactly 4 Q&A pairs, specific to this exchange+pair combo
- related_pairs: use these slugs exactly: ${JSON.stringify(relatedPairs)}

Write as a knowledgeable crypto analyst. Be specific, not generic. Include concrete details about this exchange's funding rate mechanics.`

  const result = await withRetry(async () => {
    const res = await model.generateContent(prompt)
    return res
  })

  const text = result.response.text()
  const data = JSON.parse(text)

  if (!validateRatePage(data)) {
    console.error(`  ✗ Validation failed for ${exchange.slug}/${pair.slug}`)
    return null
  }

  return data
}

async function generateComparison(
  a: Exchange,
  b: Exchange
): Promise<ExchangeComparisonPage | null> {
  if (!genAI) return null

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: comparisonSchema,
    },
  })

  const slug = `${a.slug}-vs-${b.slug}`

  const prompt = `Generate a detailed comparison page for perpetual futures trading between ${a.name} and ${b.name}.

Exchange A - ${a.name}:
- Type: ${a.type}, Fees: ${a.fee_tier}, Funding: ${a.rate_frequency}
- ${a.description}
- Strengths: ${a.strengths.join(", ")}
- Weaknesses: ${a.weaknesses.join(", ")}

Exchange B - ${b.name}:
- Type: ${b.type}, Fees: ${b.fee_tier}, Funding: ${b.rate_frequency}
- ${b.description}
- Strengths: ${b.strengths.join(", ")}
- Weaknesses: ${b.weaknesses.join(", ")}

Requirements:
- slug: "${slug}"
- exchange_a and exchange_b: include slug, name, type, fee_tier, rate_frequency, strengths (3), weaknesses (3)
- fee_comparison: maker/taker fees, funding_interval, settlement method for each
- rate_mechanics: 3-5 sentences comparing how funding rates work differently on each platform
- verdict: 2-3 sentences balanced verdict on which is better for what use case
- faq: exactly 4 Q&A pairs comparing the two exchanges
- SEO title: under 60 chars, include both exchange names
- SEO description: 150-160 chars
- SEO keywords: 6-10 terms

Write as a knowledgeable, neutral analyst. Be specific about the actual differences.`

  const result = await withRetry(async () => {
    const res = await model.generateContent(prompt)
    return res
  })

  const text = result.response.text()
  const data = JSON.parse(text)

  if (!validateComparison(data)) {
    console.error(`  ✗ Validation failed for ${slug}`)
    return null
  }

  return data
}

// ---------------------------------------------------------------------------
// File I/O
// ---------------------------------------------------------------------------

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function writeJson(filepath: string, data: unknown) {
  ensureDir(path.dirname(filepath))
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8")
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function generateRates() {
  let filteredExchanges = exchanges
  if (EXCHANGE_FILTER) {
    filteredExchanges = exchanges.filter((e) => e.slug === EXCHANGE_FILTER)
    if (filteredExchanges.length === 0) {
      console.error(`Exchange "${EXCHANGE_FILTER}" not found in taxonomy`)
      process.exit(1)
    }
  }

  const jobs: { exchange: Exchange; pair: Pair }[] = []
  for (const exchange of filteredExchanges) {
    for (const pair of pairs) {
      jobs.push({ exchange, pair })
    }
  }

  const total = LIMIT ? Math.min(jobs.length, LIMIT) : jobs.length
  const activeJobs = jobs.slice(0, total)

  console.log(`\n🔧 Generating ${total} rate pages${DRY_RUN ? " (dry run)" : ""}...\n`)

  let completed = 0
  let failed = 0

  const tasks = activeJobs.map(({ exchange, pair }) =>
    limit(async () => {
      const outPath = path.join(
        OUTPUT_DIR,
        "rates",
        exchange.slug,
        `${pair.slug}.json`
      )

      // Skip if already exists
      if (fs.existsSync(outPath)) {
        completed++
        console.log(`  ⏭ [${completed}/${total}] ${exchange.slug}/${pair.slug} (exists)`)
        return
      }

      if (DRY_RUN) {
        completed++
        console.log(`  📋 [${completed}/${total}] ${exchange.slug}/${pair.slug} (dry run)`)
        return
      }

      try {
        const page = await generateRatePage(exchange, pair)
        if (page) {
          writeJson(outPath, page)
          completed++
          console.log(`  ✓ [${completed}/${total}] ${exchange.slug}/${pair.slug}`)
        } else {
          failed++
          console.log(`  ✗ [${completed + failed}/${total}] ${exchange.slug}/${pair.slug} (null)`)
        }
      } catch (err) {
        failed++
        console.error(
          `  ✗ [${completed + failed}/${total}] ${exchange.slug}/${pair.slug}: ${err instanceof Error ? err.message : err}`
        )
      }
    })
  )

  await Promise.all(tasks)
  console.log(`\nDone: ${completed} generated, ${failed} failed\n`)
}

async function generateComparisons() {
  const jobs: { a: Exchange; b: Exchange }[] = []
  for (let i = 0; i < exchanges.length; i++) {
    for (let j = i + 1; j < exchanges.length; j++) {
      jobs.push({ a: exchanges[i], b: exchanges[j] })
    }
  }

  const total = LIMIT ? Math.min(jobs.length, LIMIT) : jobs.length
  const activeJobs = jobs.slice(0, total)

  console.log(`\n🔧 Generating ${total} comparison pages${DRY_RUN ? " (dry run)" : ""}...\n`)

  let completed = 0
  let failed = 0

  const tasks = activeJobs.map(({ a, b }) =>
    limit(async () => {
      const slug = `${a.slug}-vs-${b.slug}`
      const outPath = path.join(OUTPUT_DIR, "comparisons", `${slug}.json`)

      if (fs.existsSync(outPath)) {
        completed++
        console.log(`  ⏭ [${completed}/${total}] ${slug} (exists)`)
        return
      }

      if (DRY_RUN) {
        completed++
        console.log(`  📋 [${completed}/${total}] ${slug} (dry run)`)
        return
      }

      try {
        const page = await generateComparison(a, b)
        if (page) {
          writeJson(outPath, page)
          completed++
          console.log(`  ✓ [${completed}/${total}] ${slug}`)
        } else {
          failed++
          console.log(`  ✗ [${completed + failed}/${total}] ${slug} (null)`)
        }
      } catch (err) {
        failed++
        console.error(
          `  ✗ [${completed + failed}/${total}] ${slug}: ${err instanceof Error ? err.message : err}`
        )
      }
    })
  )

  await Promise.all(tasks)
  console.log(`\nDone: ${completed} generated, ${failed} failed\n`)
}

async function generateLearn() {
  // Learn articles use the same pattern but with a different schema
  // This is a placeholder for Phase 3 which will define article topics
  console.log("\n📚 Learn article generation will be available in Phase 3\n")
}

async function main() {
  console.log(`\npSEO Generator`)
  console.log(`Type: ${TYPE}`)
  if (EXCHANGE_FILTER) console.log(`Exchange: ${EXCHANGE_FILTER}`)
  if (LIMIT) console.log(`Limit: ${LIMIT}`)
  if (DRY_RUN) console.log(`Mode: DRY RUN`)

  switch (TYPE) {
    case "rates":
      await generateRates()
      break
    case "comparisons":
      await generateComparisons()
      break
    case "learn":
      await generateLearn()
      break
  }
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})

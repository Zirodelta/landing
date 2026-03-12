#!/usr/bin/env npx tsx
/**
 * pSEO Content Generator
 *
 * Uses Anthropic Claude to generate structured JSON content for funding rate pages,
 * exchange comparisons, and learn articles.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/generate-pseo.ts --type rates
 *   npx tsx scripts/generate-pseo.ts --type comparisons --limit 10
 *   npx tsx scripts/generate-pseo.ts --type rates --exchange binance --dry-run
 *   npx tsx scripts/generate-pseo.ts --type learn --limit 5
 */

import fs from "fs"
import path from "path"
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
const MODEL = getArg("model") || "claude-sonnet-4-20250514"

if (!["rates", "comparisons", "learn"].includes(TYPE)) {
  console.error(`Invalid --type: ${TYPE}. Use rates|comparisons|learn`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const API_KEY = process.env.ANTHROPIC_API_KEY
if (!API_KEY && !DRY_RUN) {
  console.error("Set ANTHROPIC_API_KEY environment variable")
  process.exit(1)
}

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"

const TAXONOMY_DIR = path.join(__dirname, "../content/pseo/taxonomy")
const OUTPUT_DIR = path.join(__dirname, "../content/pseo/generated")

const exchanges: Exchange[] = JSON.parse(
  fs.readFileSync(path.join(TAXONOMY_DIR, "exchanges.json"), "utf-8")
)
const pairs: Pair[] = JSON.parse(
  fs.readFileSync(path.join(TAXONOMY_DIR, "pairs.json"), "utf-8")
)

// Lower concurrency for Anthropic rate limits
const limit = pLimit(5)

// ---------------------------------------------------------------------------
// Anthropic API call
// ---------------------------------------------------------------------------

async function callAnthropic(prompt: string, systemPrompt: string): Promise<string> {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    const err = new Error(`Anthropic API ${response.status}: ${body}`) as Error & { status: number }
    err.status = response.status
    throw err
  }

  const data = (await response.json()) as {
    content: { type: string; text: string }[]
  }

  const text = data.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("")

  return text
}

// ---------------------------------------------------------------------------
// Retry with exponential backoff
// ---------------------------------------------------------------------------

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 5): Promise<T> {
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

      const delay = Math.min(
        1000 * Math.pow(2, attempt) + Math.random() * 1000,
        60000
      )
      console.log(
        `  ↳ Rate limited (${status}), retrying in ${Math.round(delay / 1000)}s...`
      )
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error("Unreachable")
}

// ---------------------------------------------------------------------------
// JSON extraction helper
// ---------------------------------------------------------------------------

function extractJSON(text: string): unknown {
  // Try direct parse first
  try {
    return JSON.parse(text)
  } catch {
    // Extract from markdown code block
    const match = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
    if (match) {
      return JSON.parse(match[1])
    }
    throw new Error("Could not extract JSON from response")
  }
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
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are a crypto market analyst generating structured JSON content for SEO pages about funding rate arbitrage.

CRITICAL: Respond with ONLY valid JSON. No markdown, no explanation, no text before or after. Just the JSON object.

Guidelines:
- Be specific and expert-level, not generic
- Include concrete details about exchange mechanics
- Write for an audience that understands perpetual futures
- SEO titles under 60 chars, descriptions 150-160 chars
- All content should be factual and avoid hype`

// ---------------------------------------------------------------------------
// Generation functions
// ---------------------------------------------------------------------------

async function generateRatePage(
  exchange: Exchange,
  pair: Pair
): Promise<FundingRatePage | null> {
  const relatedPairs = pairs
    .filter((p) => p.slug !== pair.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((p) => p.slug)

  const prompt = `Generate a JSON object for a funding rate page about ${pair.base}/${pair.quote} perpetual futures on ${exchange.name} (${exchange.type}).

Exchange: ${exchange.name} | Type: ${exchange.type} | Fees: ${exchange.fee_tier} | Funding: ${exchange.rate_frequency}
${exchange.description}
Strengths: ${exchange.strengths.join(", ")}
Weaknesses: ${exchange.weaknesses.join(", ")}

Pair: ${pair.base}/${pair.quote} | Category: ${pair.category} | Volume: ${pair.volume_tier}

Return this exact JSON structure:
{
  "exchange": { "slug": "${exchange.slug}", "name": "${exchange.name}", "type": "${exchange.type}" },
  "pair": { "slug": "${pair.slug}", "base": "${pair.base}", "quote": "${pair.quote}" },
  "seo": {
    "title": "<under 60 chars, include exchange + pair>",
    "description": "<150-160 chars with key terms>",
    "keywords": ["<6-10 relevant terms>"]
  },
  "content": {
    "intro": "<2-3 sentences overview>",
    "how_funding_works": "<3-4 sentences specific to ${exchange.name}'s mechanics>",
    "why_this_pair": "<2-3 sentences on why this pair matters for funding rate arbitrage>",
    "sections": [
      { "heading": "<topic>", "body": "<3-5 sentences>" },
      { "heading": "<topic>", "body": "<3-5 sentences>" },
      { "heading": "<topic>", "body": "<3-5 sentences>" }
    ],
    "faq": [
      { "question": "<specific to ${exchange.name} + ${pair.base}>", "answer": "<2-3 sentences>" },
      { "question": "...", "answer": "..." },
      { "question": "...", "answer": "..." },
      { "question": "...", "answer": "..." }
    ]
  },
  "related_pairs": ${JSON.stringify(relatedPairs)}
}

Sections should cover: historical rate patterns, arbitrage opportunities, risk considerations.`

  const text = await withRetry(() => callAnthropic(prompt, SYSTEM_PROMPT))
  const data = extractJSON(text)

  if (!validateRatePage(data)) {
    console.error(`  ✗ Validation failed for ${exchange.slug}/${pair.slug}`)
    return null
  }

  return data as FundingRatePage
}

async function generateComparison(
  a: Exchange,
  b: Exchange
): Promise<ExchangeComparisonPage | null> {
  const slug = `${a.slug}-vs-${b.slug}`

  const prompt = `Generate a JSON object comparing ${a.name} vs ${b.name} for perpetual futures funding rates.

Exchange A - ${a.name}: Type: ${a.type} | Fees: ${a.fee_tier} | Funding: ${a.rate_frequency}
${a.description}
Strengths: ${a.strengths.join(", ")} | Weaknesses: ${a.weaknesses.join(", ")}

Exchange B - ${b.name}: Type: ${b.type} | Fees: ${b.fee_tier} | Funding: ${b.rate_frequency}
${b.description}
Strengths: ${b.strengths.join(", ")} | Weaknesses: ${b.weaknesses.join(", ")}

Return this exact JSON structure:
{
  "slug": "${slug}",
  "exchange_a": {
    "slug": "${a.slug}", "name": "${a.name}", "type": "${a.type}",
    "fee_tier": "${a.fee_tier}", "rate_frequency": "${a.rate_frequency}",
    "strengths": ["<3 items>"], "weaknesses": ["<3 items>"]
  },
  "exchange_b": {
    "slug": "${b.slug}", "name": "${b.name}", "type": "${b.type}",
    "fee_tier": "${b.fee_tier}", "rate_frequency": "${b.rate_frequency}",
    "strengths": ["<3 items>"], "weaknesses": ["<3 items>"]
  },
  "fee_comparison": {
    "maker": { "a": "<fee>", "b": "<fee>" },
    "taker": { "a": "<fee>", "b": "<fee>" },
    "funding_interval": { "a": "<interval>", "b": "<interval>" },
    "settlement": { "a": "<method>", "b": "<method>" }
  },
  "rate_mechanics": "<3-5 sentences comparing how funding rates differ>",
  "verdict": "<2-3 sentences balanced verdict>",
  "faq": [
    { "question": "<comparing the two>", "answer": "<2-3 sentences>" },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ],
  "seo": {
    "title": "<under 60 chars, both names>",
    "description": "<150-160 chars>",
    "keywords": ["<6-10 terms>"]
  }
}`

  const text = await withRetry(() => callAnthropic(prompt, SYSTEM_PROMPT))
  const data = extractJSON(text)

  if (!validateComparison(data)) {
    console.error(`  ✗ Validation failed for ${slug}`)
    return null
  }

  return data as ExchangeComparisonPage
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

  console.log(
    `\n🔧 Generating ${total} rate pages${DRY_RUN ? " (dry run)" : ""} [model: ${MODEL}]...\n`
  )

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

      if (fs.existsSync(outPath)) {
        completed++
        console.log(
          `  ⏭ [${completed}/${total}] ${exchange.slug}/${pair.slug} (exists)`
        )
        return
      }

      if (DRY_RUN) {
        completed++
        console.log(
          `  📋 [${completed}/${total}] ${exchange.slug}/${pair.slug} (dry run)`
        )
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
          console.log(
            `  ✗ [${completed + failed}/${total}] ${exchange.slug}/${pair.slug} (null)`
          )
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

  console.log(
    `\n🔧 Generating ${total} comparison pages${DRY_RUN ? " (dry run)" : ""} [model: ${MODEL}]...\n`
  )

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
  console.log("\n📚 Learn article generation will be available in Phase 3\n")
}

async function main() {
  console.log(`\npSEO Generator (Anthropic)`)
  console.log(`Model: ${MODEL}`)
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

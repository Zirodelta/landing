// pSEO TypeScript interfaces — shared across all generated page types

// --- Funding Rate Page (per exchange+pair combo) ---

export interface FundingRatePageSeo {
  title: string
  description: string
  keywords: string[]
}

export interface FundingRateSection {
  heading: string
  body: string
}

export interface FundingRateFaq {
  question: string
  answer: string
}

export interface FundingRatePageContent {
  intro: string
  how_funding_works: string
  why_this_pair: string
  sections: FundingRateSection[]
  faq: FundingRateFaq[]
}

export interface FundingRatePage {
  exchange: {
    slug: string
    name: string
    type: "CEX" | "DEX"
  }
  pair: {
    slug: string
    base: string
    quote: string
  }
  seo: FundingRatePageSeo
  content: FundingRatePageContent
  related_pairs: string[]
}

// --- Exchange Comparison Page ---

export interface ExchangeProfile {
  slug: string
  name: string
  type: "CEX" | "DEX"
  fee_tier: string
  rate_frequency: string
  strengths: string[]
  weaknesses: string[]
}

export interface FeeComparison {
  maker: { a: string; b: string }
  taker: { a: string; b: string }
  funding_interval: { a: string; b: string }
  settlement: { a: string; b: string }
}

export interface ExchangeComparisonPage {
  slug: string
  exchange_a: ExchangeProfile
  exchange_b: ExchangeProfile
  fee_comparison: FeeComparison
  rate_mechanics: string
  verdict: string
  faq: FundingRateFaq[]
  seo: FundingRatePageSeo
}

// --- pSEO Learn Article ---

export interface PseoSectionItem {
  title: string
  description: string
}

export interface PseoSection {
  heading: string
  items: PseoSectionItem[]
}

export interface PseoLearnArticle {
  title: string
  slug: string
  description: string
  category: string
  bestFor: string[]
  notFor: string[]
  sections: PseoSection[]
  pro_tips: string[]
  faq: FundingRateFaq[]
}

// --- Taxonomy types ---

export interface Exchange {
  slug: string
  name: string
  type: "CEX" | "DEX"
  fee_tier: string
  rate_frequency: string
  description: string
  strengths: string[]
  weaknesses: string[]
}

export interface Pair {
  slug: string
  base: string
  quote: string
  category: string
  volume_tier: "mega" | "large" | "mid" | "small"
}

export interface Audience {
  slug: string
  name: string
  pain_points: string[]
  priorities: string[]
  language_style: string
}

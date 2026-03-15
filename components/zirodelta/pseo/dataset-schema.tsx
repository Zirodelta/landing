"use client"

interface DatasetSchemaProps {
  exchangeName: string
  exchangeSlug: string
  pairBase: string
  pairQuote: string
  pairSlug: string
  settlementCount?: number
  annualizedRate?: number
  positiveFrequency?: number
  intervalHours?: number
  dateStart?: string
  dateEnd?: string
}

export function DatasetSchema({
  exchangeName,
  exchangeSlug,
  pairBase,
  pairQuote,
  pairSlug,
  settlementCount,
  annualizedRate,
  positiveFrequency,
  intervalHours,
  dateStart = "2019-09-01",
  dateEnd = "2026-03-15",
}: DatasetSchemaProps) {
  const pair = `${pairBase}/${pairQuote}`
  const url = `https://zirodelta.com/rates/${exchangeSlug}/${pairSlug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${pair} Funding Rate Data on ${exchangeName}`,
    description: `Historical funding rate data for ${pair} perpetual futures on ${exchangeName}. ${settlementCount ? `${settlementCount.toLocaleString()} settlements analyzed` : "Multi-year data"} from ${dateStart} to ${dateEnd}.${annualizedRate ? ` Annualized rate: ${annualizedRate.toFixed(2)}%.` : ""}${positiveFrequency ? ` Positive rate frequency: ${positiveFrequency.toFixed(1)}%.` : ""}`,
    url,
    license: "https://zirodelta.com/pact",
    creator: {
      "@type": "Organization",
      name: "Zirodelta",
      url: "https://zirodelta.com",
    },
    temporalCoverage: `${dateStart}/${dateEnd}`,
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Funding Rate",
        description: `Perpetual futures funding rate for ${pair} on ${exchangeName}`,
        unitText: "percent per settlement",
      },
      ...(annualizedRate
        ? [
            {
              "@type": "PropertyValue",
              name: "Annualized Rate",
              value: annualizedRate,
              unitText: "percent per year",
            },
          ]
        : []),
      ...(intervalHours
        ? [
            {
              "@type": "PropertyValue",
              name: "Settlement Interval",
              value: intervalHours,
              unitText: "hours",
            },
          ]
        : []),
    ],
    distribution: {
      "@type": "DataDownload",
      contentUrl: url,
      encodingFormat: "text/html",
    },
    keywords: [
      `${pairBase} funding rate`,
      `${exchangeName} ${pair} perpetual`,
      "funding rate arbitrage",
      "crypto funding rates",
      `${exchangeName} futures`,
      "delta-neutral yield",
    ],
    measurementTechnique: "Direct exchange API collection",
    ...(settlementCount && {
      size: `${settlementCount} settlement records`,
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/** Organization schema for homepage */
export function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zirodelta",
    url: "https://zirodelta.com",
    logo: "https://zirodelta.com/zirodelta-full-white.svg",
    description:
      "Quantitative trading protocol that automates delta-neutral funding rate arbitrage across crypto exchanges.",
    sameAs: [
      "https://x.com/zirodelta",
      "https://discord.gg/Ur85YWJbd",
    ],
    foundingDate: "2024",
    knowsAbout: [
      "Funding rate arbitrage",
      "Delta-neutral trading",
      "Perpetual futures",
      "Quantitative trading",
      "Cross-exchange arbitrage",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/** WebApplication schema for tools */
export function WebAppSchema({
  name,
  description,
  url,
  category = "FinanceApplication",
}: {
  name: string
  description: string
  url: string
  category?: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Zirodelta",
      url: "https://zirodelta.com",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

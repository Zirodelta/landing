#!/usr/bin/env node
/**
 * Post-build JSON-LD injector.
 * Injects structured data into all HTML files in .vercel/output/static/
 * Runs after `next build` but before CF Pages serves the files.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://zirodelta.com/#organization',
    name: 'Zirodelta',
    url: 'https://zirodelta.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://zirodelta.com/zirodelta-full-white.svg',
      width: 160,
      height: 32,
    },
    description:
      'Autonomous funding rate arbitrage protocol. Delta-neutral cross-exchange yield capture across 19+ exchanges, transparent on Solana.',
    foundingDate: '2024',
    sameAs: [
      'https://x.com/zirodelta',
      'https://t.me/zirodelta',
      'https://discord.com/invite/YHW275Vpn3',
      'https://github.com/zirodelta',
    ],
    brand: {
      '@type': 'Brand',
      name: 'Zirodelta',
      url: 'https://zirodelta.com',
      logo: 'https://zirodelta.com/zirodelta-full-white.svg',
    },
    owns: [
      {
        '@type': 'WebApplication',
        name: 'Zirodelta Vault',
        url: 'https://zirodelta.ag',
        applicationCategory: 'FinanceApplication',
        description:
          'DeFi vault where $ZDLT holders deposit tokens and earn USDT yield from automated funding rate arbitrage.',
      },
      {
        '@type': 'WebApplication',
        name: 'Zirodelta Transparency Dashboard',
        url: 'https://transparency.zirodelta.com',
        applicationCategory: 'FinanceApplication',
        description:
          'Live performance data, balance history, and on-chain proofs for the Zirodelta protocol.',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://zirodelta.com/#website',
    name: 'Zirodelta',
    url: 'https://zirodelta.com',
    publisher: { '@id': 'https://zirodelta.com/#organization' },
    description:
      'A protocol that earns before you deposit. Autonomous funding rate arbitrage across 19+ exchanges.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zirodelta Protocol',
    url: 'https://zirodelta.com',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Solana',
    description:
      'Solana-native autonomous funding rate arbitrage engine. Captures cross-exchange funding rate spreads via delta-neutral hedging across 19+ perpetual futures exchanges.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Protocol revenue is distributed to vault depositors.',
    },
    creator: { '@id': 'https://zirodelta.com/#organization' },
    featureList: [
      'Delta-neutral funding rate arbitrage',
      'Cross-exchange execution across 19+ exchanges',
      'On-chain transparency via Solana',
      '8-hour epoch yield distribution',
      'PFRT/NFRT conditional rate tokenization',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: 'Zirodelta Whitepaper v4.3',
    url: 'https://zirodelta.com/whitepaper.pdf',
    description:
      'Technical whitepaper describing the Zirodelta protocol: funding rate arbitrage mechanics, vault architecture, tokenomics, and risk framework.',
    author: { '@id': 'https://zirodelta.com/#organization' },
    encodingFormat: 'application/pdf',
  },
]

// Build the injection string
const scripts = JSONLD.map(
  (schema) =>
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
).join('\n')

// Find all HTML files recursively
async function findHtmlFiles(dir) {
  const files = []
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await findHtmlFiles(fullPath)))
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath)
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }
  return files
}

async function main() {
  // Try multiple possible output directories
  const outputDirs = [
    '.vercel/output/static',
    'out',
    '.next/server/app',
  ]

  let injected = 0

  for (const dir of outputDirs) {
    const htmlFiles = await findHtmlFiles(dir)
    for (const file of htmlFiles) {
      const content = await readFile(file, 'utf-8')
      if (content.includes('application/ld+json')) {
        console.log(`  [skip] ${file} — already has JSON-LD`)
        continue
      }
      // Inject before </head>
      const updated = content.replace('</head>', `${scripts}\n</head>`)
      if (updated !== content) {
        await writeFile(file, updated)
        console.log(`  [injected] ${file}`)
        injected++
      }
    }
  }

  console.log(`\n✅ JSON-LD injected into ${injected} HTML file(s)`)
}

main().catch((err) => {
  console.error('❌ JSON-LD injection failed:', err)
  process.exit(1)
})

import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Montserrat, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700', '800', '900'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const siteUrl = 'https://zirodelta.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Zirodelta | Autonomous Funding Rate Arbitrage',
    template: '%s | Zirodelta',
  },
  description:
    'A protocol that earns before you deposit. Autonomous funding rate arbitrage across 19+ exchanges. Revenue-first. Delta-neutral. Zero exposure.',
  keywords: [
    'funding rate arbitrage',
    'crypto yield',
    'delta neutral',
    'DeFi',
    'perpetual futures',
    'automated trading',
    'cross-exchange arbitrage',
    'funding rate farming',
  ],
  authors: [{ name: 'Zirodelta' }],
  creator: 'Zirodelta',
  publisher: 'Zirodelta',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { rel: 'icon', url: '/icon-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/icon-512x512.png', sizes: '512x512' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Zirodelta',
    title: 'Zirodelta | A Protocol That Earns Before You Deposit',
    description:
      'Autonomous funding rate arbitrage across 19+ exchanges. Revenue-first. Delta-neutral. Zero exposure.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zirodelta - Autonomous Funding Rate Arbitrage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zirodelta',
    creator: '@zirodelta',
    title: 'Zirodelta | A Protocol That Earns Before You Deposit',
    description:
      'Autonomous funding rate arbitrage across 19+ exchanges. Revenue-first. Delta-neutral. Zero exposure.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = [
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable} ${playfair.variable}`}>
      <head>
        {jsonLd.map((data, i) => (
          <script
            key={`ld-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

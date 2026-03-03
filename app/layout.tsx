import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

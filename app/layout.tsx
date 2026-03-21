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
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Zirodelta | The Funding Rate Company',
    template: '%s | Zirodelta',
  },
  description:
    'Predict crypto funding rates on Settled. Automate arbitrage with Zidee. 9.4M+ settlements analyzed across 5 exchanges. Free tools, real data.',
  keywords: [
    'funding rate prediction',
    'crypto funding rate',
    'prediction market',
    'funding rate arbitrage',
    'perpetual futures',
    'delta neutral',
    'crypto trading tools',
    'Solana prediction market',
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
    title: 'Zirodelta | The Funding Rate Company',
    description:
      'Predict crypto funding rates on Settled. Automate arbitrage with Zidee. 9.4M+ settlements analyzed across 5 exchanges. Free tools, real data.',
    images: [
      {
        url: '/api/og?type=home',
        width: 1200,
        height: 630,
        alt: 'Zirodelta - Predict & Automate Crypto Funding Rates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zirodelta',
    creator: '@zirodelta',
    title: 'Zirodelta | The Funding Rate Company',
    description:
      'Predict crypto funding rates on Settled. Automate arbitrage with Zidee. 9.4M+ settlements analyzed across 5 exchanges.',
    images: ['/api/og?type=home'],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

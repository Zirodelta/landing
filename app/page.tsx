import Script from 'next/script'
import { Navbar } from "@/components/zirodelta/navbar"
import { Hero } from "@/components/zirodelta/hero"
import { ExchangeTicker } from "@/components/zirodelta/exchange-ticker"
import { Stats } from "@/components/zirodelta/stats"
import { Protocol } from "@/components/zirodelta/protocol"
import { HowItWorks } from "@/components/zirodelta/how-it-works"
import { Revenue } from "@/components/zirodelta/revenue"
import { Trust } from "@/components/zirodelta/trust"
import { CTA } from "@/components/zirodelta/cta"
import { Footer } from "@/components/zirodelta/footer"
import { Reveal } from "@/components/zirodelta/reveal"

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://zirodelta.com/#organization',
  name: 'Zirodelta',
  url: 'https://zirodelta.com',
  logo: { '@type': 'ImageObject', url: 'https://zirodelta.com/zirodelta-full-white.svg', width: 160, height: 32 },
  description: 'Autonomous funding rate arbitrage protocol. Delta-neutral cross-exchange yield capture across 19+ exchanges, transparent on Solana.',
  foundingDate: '2024',
  sameAs: ['https://x.com/zirodelta', 'https://t.me/zirodelta', 'https://discord.com/invite/YHW275Vpn3', 'https://github.com/zirodelta'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://zirodelta.com/#website',
  name: 'Zirodelta',
  url: 'https://zirodelta.com',
  publisher: { '@id': 'https://zirodelta.com/#organization' },
  description: 'A protocol that earns before you deposit. Autonomous funding rate arbitrage across 19+ exchanges.',
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <Hero />
      <ExchangeTicker />
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal delay={50}>
        <Protocol />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal delay={50}>
        <Revenue />
      </Reveal>
      <Reveal>
        <Trust />
      </Reveal>
      <Reveal direction="none">
        <CTA />
      </Reveal>
      <Footer />
    </main>
  )
}

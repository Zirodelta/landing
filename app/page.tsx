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
import { ClientJsonLd } from "@/app/components/client-jsonld"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <ClientJsonLd />
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

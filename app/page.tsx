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

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ExchangeTicker />
      <Stats />
      <Protocol />
      <HowItWorks />
      <Revenue />
      <Trust />
      <CTA />
      <Footer />
    </main>
  )
}

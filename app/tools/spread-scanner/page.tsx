import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"
import { SpreadScanner } from "@/components/zirodelta/tools/spread-scanner"

export const metadata: Metadata = {
  title: "Spread Scanner",
  description: "Live funding rate spread scanner across crypto exchanges. Find the highest funding rate arbitrage opportunities in real time.",
  openGraph: {
    images: [{ url: "/api/og?type=tool&title=Live+Spread+Scanner", width: 1200, height: 630 }],
    title: "Spread Scanner | Zirodelta",
    description: "Live funding rate spread scanner across crypto exchanges. Find the highest arbitrage opportunities.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spread Scanner | Zirodelta",
    description: "Live funding rate spread scanner across crypto exchanges. Find the highest arbitrage opportunities.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Funding Rate Spread Scanner",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Live funding rate spread scanner across crypto exchanges. Find the highest funding rate arbitrage opportunities.",
  url: "https://zirodelta.com/tools/spread-scanner",
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <h1
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Spread Scanner
        </h1>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">
          Live funding rates across exchanges, sorted by spread opportunity.
        </p>
        <SpreadScanner />
      </main>
      <Footer />
    </>
  )
}

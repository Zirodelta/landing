import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"
import { FundingRateCalculator } from "@/components/zirodelta/tools/funding-rate-calculator"

export const metadata: Metadata = {
  title: "Funding Rate Calculator",
  description: "Calculate funding rate earnings and net profit after trading fees for crypto perpetual futures. Free, client-side, no sign-up required.",
  openGraph: {
    title: "Funding Rate Calculator | Zirodelta",
    description: "Calculate funding rate earnings and net profit after trading fees for crypto perpetual futures.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funding Rate Calculator | Zirodelta",
    description: "Calculate funding rate earnings and net profit after trading fees for crypto perpetual futures.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Funding Rate Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate funding rate earnings and net profit after trading fees for crypto perpetual futures.",
  url: "https://zirodelta.com/tools/funding-rate-calculator",
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
          Funding Rate Calculator
        </h1>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">
          Estimate per-period and annualized earnings from funding rates, net of trading fees.
        </p>
        <FundingRateCalculator />
      </main>
      <Footer />
    </>
  )
}

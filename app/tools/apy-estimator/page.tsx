import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"
import { APYEstimator } from "@/components/zirodelta/tools/apy-estimator"

export const metadata: Metadata = {
  title: "APY Estimator",
  description: "Compare simple APR vs compounded APY for crypto funding rates. Visualize 5 market scenarios across different funding intervals.",
  openGraph: {
    title: "APY Estimator | Zirodelta",
    description: "Compare simple APR vs compounded APY for crypto funding rates across different intervals.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APY Estimator | Zirodelta",
    description: "Compare simple APR vs compounded APY for crypto funding rates across different intervals.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Funding Rate APY Estimator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Compare simple APR vs compounded APY for crypto funding rates across different intervals.",
  url: "https://zirodelta.com/tools/apy-estimator",
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
          APY Estimator
        </h1>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">
          See how funding rates translate to annualized returns — simple APR vs compounded APY.
        </p>
        <APYEstimator />
      </main>
      <Footer />
    </>
  )
}

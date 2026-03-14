import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"

export const metadata: Metadata = {
  title: {
    template: "%s | Zirodelta Rates",
    default: "Funding Rates | Zirodelta",
  },
  description:
    "Live funding rates, historical data, and analytics for crypto perpetual futures across all major exchanges.",
}

export default function RatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-16">{children}</div>
      <Footer />
    </>
  )
}
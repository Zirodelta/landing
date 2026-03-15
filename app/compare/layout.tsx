import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"

export const metadata: Metadata = {
  title: {
    template: "%s | Zirodelta",
    default: "Compare | Zirodelta",
  },
  description:
    "Compare funding rates, fees, and yields across crypto exchanges to find the best arbitrage opportunities.",
}

export default function CompareLayout({
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
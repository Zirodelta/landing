import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"

export const metadata: Metadata = {
  title: {
    template: "%s | Zirodelta Learn",
    default: "Learn | Zirodelta",
  },
  description:
    "Guides, comparisons, and research on funding rate arbitrage, delta-neutral yield, and automated crypto strategies.",
}

export default function LearnLayout({
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

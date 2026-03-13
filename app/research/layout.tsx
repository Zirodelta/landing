import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"

export const metadata: Metadata = {
  title: {
    template: "%s | Zirodelta Research",
    default: "Research | Zirodelta",
  },
  description:
    "Published research on funding rate strategies, backtests, and quantitative analysis from the Zirodelta engine team.",
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">{children}</main>
      <Footer />
    </>
  )
}

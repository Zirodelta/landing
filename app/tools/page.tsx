import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"
import { Calculator, TrendingUp, BarChart3, Crosshair } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Crypto Tools",
  description: "Free funding rate calculator, APY estimator, and live spread scanner for crypto perpetual futures traders.",
  openGraph: {
    title: "Free Crypto Tools | Zirodelta",
    description: "Free funding rate calculator, APY estimator, and live spread scanner for crypto perpetual futures traders.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Crypto Tools | Zirodelta",
    description: "Free funding rate calculator, APY estimator, and live spread scanner for crypto perpetual futures traders.",
  },
}

const tools = [
  {
    title: "Zidee — Funding Rate Sniper Bot",
    description: "One-tap extreme funding rate scalps on Telegram. Scan 6 exchanges (~2,250 pairs), enter delta-neutral, auto-close after settlement. Backed by 9.4M settlement backtest.",
    href: "/tools/funding-rate-sniper-bot",
    icon: Crosshair,
    badge: "NEW",
  },
  {
    title: "Funding Rate Calculator",
    description: "Calculate per-period, daily, weekly, monthly, and yearly earnings from funding rates. Includes entry/exit fee deductions.",
    href: "/tools/funding-rate-calculator",
    icon: Calculator,
  },
  {
    title: "APY Estimator",
    description: "Compare simple APR vs compounded APY across different funding rates and intervals. See 5 market scenarios side by side.",
    href: "/tools/apy-estimator",
    icon: TrendingUp,
  },
  {
    title: "Spread Scanner",
    description: "Live funding rate data from exchanges sorted by spread opportunity. Filter by pair and exchange.",
    href: "/tools/spread-scanner",
    icon: BarChart3,
  },
]

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <h1
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Tools
        </h1>
        <p className="mt-2 text-muted-foreground">
          Free calculators and scanners for funding rate arbitrage.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <tool.icon className="size-5 text-primary" />
                    {"badge" in tool && tool.badge && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{tool.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

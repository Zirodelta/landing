import type { Metadata } from "next"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "Built on Data, Not Hype. Zirodelta is a quantitative trading protocol that automates cross-exchange funding rate arbitrage.",
  openGraph: {
    images: [{ url: "/api/og?type=about", width: 1200, height: 630 }],
    title: "About | Zirodelta",
    description: "Built on Data, Not Hype. Zirodelta is a quantitative trading protocol that automates cross-exchange funding rate arbitrage.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Zirodelta",
    description: "Built on Data, Not Hype. Zirodelta is a quantitative trading protocol that automates cross-exchange funding rate arbitrage.",
  },
}

const stats = [
  { label: "Settlements analyzed", value: "9.4M+" },
  { label: "Symbols tracked", value: "876" },
  { label: "Years of data", value: "6+" },
  { label: "Exchanges monitored", value: "30+" },
]

const howItWorks = [
  {
    title: "Delta-neutral strategy",
    description: "Buy spot + short perp = zero price exposure"
  },
  {
    title: "Cross-exchange routing", 
    description: "When one venue's spread is bad, we check all others"
  },
  {
    title: "Smart venue selection",
    description: "The engine picks the best exchange pair automatically"
  },
  {
    title: "Automated 24/7",
    description: "Scan, allocate, execute, collect funding, rotate"
  },
]

const trustSignals = [
  {
    title: "Open research",
    description: "All backtest methodology published at /research"
  },
  {
    title: "Real data",
    description: "Every rate page shows actual settlement records, not projections"
  },
  {
    title: "Transparency dashboard",
    description: "Live at transparency.zirodelta.ag"
  },
  {
    title: "Free tools",
    description: "Zidee sniper bot is completely free - no token gate, no profit share"
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Built on Data, Not Hype
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Zirodelta is a quantitative trading protocol that automates cross-exchange funding rate arbitrage. 
              We earn yield by exploiting rate differences between exchanges - not by making directional bets.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 px-6 lg:px-8 bg-card/50 border-y border-border">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="text-2xl sm:text-3xl font-extrabold text-primary mb-1"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 space-y-16">
          {/* Our Data Section */}
          <section>
            <h2 
              className="text-3xl font-extrabold tracking-tight text-foreground mb-8"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Our Data
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our engine has processed <strong className="text-foreground">9.4M+ funding rate settlements</strong> across 
                    Binance, Bybit, KuCoin, and Hyperliquid.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We track <strong className="text-foreground">876 symbols across 30+ exchanges</strong>, 
                    building the most comprehensive funding rate dataset in crypto.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our dataset spans <strong className="text-foreground">September 2019 to present</strong> - 
                    over 6 years of continuous data collection and analysis.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Every number on this site comes from our own analysis</strong>, 
                    not third-party estimates or marketing projections.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How We Work Section */}
          <section>
            <h2 
              className="text-3xl font-extrabold tracking-tight text-foreground mb-8"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              How We Work
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {howItWorks.map((item, index) => (
                <Card key={index}>
                  <CardContent>
                    <h3 
                      className="text-lg font-bold text-foreground mb-3"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Why Trust Us Section */}
          <section>
            <h2 
              className="text-3xl font-extrabold tracking-tight text-foreground mb-8"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Why Trust Us
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {trustSignals.map((signal, index) => (
                <Card key={index}>
                  <CardContent>
                    <h3 
                      className="text-lg font-bold text-foreground mb-3"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {signal.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {signal.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 
              className="text-3xl font-extrabold tracking-tight text-foreground mb-8"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Team
            </h2>
            <Card>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Zirodelta is a lean team building at the intersection of quantitative finance 
                  and crypto infrastructure.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-muted-foreground">We're focused on building the best funding rate infrastructure in crypto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-muted-foreground">Wyoming LLC entity</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="https://github.com/zirodelta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://x.com/zirodelta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    X (@zirodelta)
                  </Link>
                  <Link
                    href="https://discord.com/invite/YHW275Vpn3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Discord
                  </Link>
                  <Link
                    href="https://t.me/zirodelta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Telegram
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
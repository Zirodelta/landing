import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/zirodelta/navbar"
import { Footer } from "@/components/zirodelta/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Technical documentation for Zirodelta products: Settled prediction markets and Zidee sniper bot.",
  openGraph: {
    title: "Documentation | Zirodelta",
    description: "Technical documentation for Zirodelta products: Settled prediction markets and Zidee sniper bot.",
  },
}

const products = [
  {
    name: "Settled",
    tagline: "Prediction markets for funding rates",
    description: "Binary YES/NO markets on whether a funding rate will be positive at the next settlement. Auto-resolves every 1–8 hours from exchange API data.",
    links: [
      { label: "Trade on Settled", href: "https://settled.pro", external: true },
      { label: "API Reference", href: "https://docs.settled.pro", external: true },
      { label: "Learn", href: "https://learn.settled.pro", external: true },
    ],
    details: [
      { label: "Markets", value: "7,000+ across 5 exchanges" },
      { label: "Settlement", value: "Every 1–8 hours" },
      { label: "Pricing", value: "LMSR automated market maker" },
      { label: "Resolution", value: "Triple-source oracle (2/3 consensus)" },
      { label: "Chain", value: "Solana (devnet)" },
      { label: "Token", value: "USDC" },
    ],
  },
  {
    name: "Zidee (Sniper Bot)",
    tagline: "Free funding rate arbitrage on Telegram",
    description: "Scans 5 exchanges every 30 seconds for extreme funding rates. Opens hedged spot+perp positions, closes after settlement. Users bring their own exchange API keys.",
    links: [
      { label: "Open in Telegram", href: "https://t.me/zidee_bot", external: true },
    ],
    details: [
      { label: "Price", value: "Free — always" },
      { label: "Strategy", value: "Delta-neutral spot+perp hedge" },
      { label: "Exchanges", value: "Binance, Bybit, KuCoin, Gate, Hyperliquid" },
      { label: "Scan interval", value: "30 seconds" },
      { label: "Close timing", value: "After funding settlement" },
      { label: "Custody", value: "Your keys, your exchange — we never hold funds" },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
        <h1 className="text-3xl font-bold text-foreground mb-2">Documentation</h1>
        <p className="text-muted-foreground mb-12">
          Technical overview of Zirodelta products. For detailed API docs, visit{" "}
          <a href="https://docs.settled.pro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            docs.settled.pro
          </a>.
        </p>

        <div className="space-y-16">
          {products.map((product) => (
            <section key={product.name}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
                <p className="text-primary text-sm font-medium mt-1">{product.tagline}</p>
                <p className="text-muted-foreground mt-3 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {product.details.map((d) => (
                  <div key={d.label} className="border border-border rounded-lg p-3 bg-card/50">
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {product.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="h-3.5 w-3.5" />}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Architecture Overview */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Architecture</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Settled backend</strong> — Go API server on Contabo VPS. PostgreSQL for trades/positions/users, 
              Redis for AMM state caching and rate limiting, ClickHouse for historical analytics. Oracle daemon 
              resolves markets every 30 seconds using triple-source consensus.
            </p>
            <p>
              <strong className="text-foreground">Settled frontend</strong> — Next.js on Vercel. Auto-deploys on push. 
              5,000+ static SEO pages (rates, predictions, intervals). Real-time prices via WebSocket.
            </p>
            <p>
              <strong className="text-foreground">Sniper bot</strong> — Python on Contabo. Telegram bot interface. 
              CCXT for multi-exchange execution. OU model for signal scoring. Users&apos; API keys encrypted at rest.
            </p>
            <p>
              <strong className="text-foreground">Data</strong> — 9.4M+ historical funding rate settlements since September 2019. 
              7,864 interval change events tracked across 4 exchanges. All queryable via ClickHouse.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

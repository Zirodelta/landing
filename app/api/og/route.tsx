import { ImageResponse } from "next/og"
import { type NextRequest } from "next/server"

export const runtime = "edge"

const SIZE = { width: 1200, height: 630 }

const EXCHANGE_NAMES: Record<string, string> = {
  binance: "Binance", bybit: "Bybit", okx: "OKX", gate: "Gate",
  kucoin: "KuCoin", bitget: "Bitget", mexc: "MEXC", bingx: "BingX",
  hyperliquid: "Hyperliquid", dydx: "dYdX", drift: "Drift", aevo: "Aevo",
  phemex: "Phemex", kraken: "Kraken", deribit: "Deribit", bitmex: "BitMEX",
  vertex: "Vertex", gmx: "GMX", paradex: "Paradex", coinex: "CoinEx",
  blofin: "BloFin", apex: "Apex", bluefin: "Bluefin", orderly: "Orderly",
}

function exName(s: string) {
  return EXCHANGE_NAMES[s] || s.charAt(0).toUpperCase() + s.slice(1)
}

function formatPair(slug: string): string {
  const parts = slug.split("-")
  if (parts.length >= 2) return `${parts[0].toUpperCase()}/${parts.slice(1).join("").toUpperCase()}`
  return slug.toUpperCase()
}

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function makeImage({
  label,
  title,
  subtitle,
  footer,
  pills,
}: {
  label: string
  title: string
  subtitle?: string
  footer?: string
  pills?: string[]
}) {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a17 50%, #0d1117 100%)",
        padding: "48px 56px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 52, height: 52, borderRadius: 12, background: "#009B88",
            fontSize: 30, fontWeight: 700, color: "white",
          }}>Z</div>
          <div style={{ display: "flex", fontSize: 18, color: "#6b7280" }}>zirodelta.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: "10px" }}>
          <div style={{ display: "flex", fontSize: 15, color: "#009B88", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>
            {label}
          </div>
          <div style={{ display: "flex", fontSize: title.length > 30 ? 52 : 64, fontWeight: 700, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            {title.length > 55 ? title.slice(0, 52) + "..." : title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 26, color: "#9ca3af", fontWeight: 400, lineHeight: 1.3 }}>
              {subtitle.length > 100 ? subtitle.slice(0, 97) + "..." : subtitle}
            </div>
          )}
          {pills && pills.length > 0 && (
            <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
              {pills.map((p) => (
                <div key={p} style={{
                  display: "flex", fontSize: 16, color: "#9ca3af",
                  background: "rgba(255,255,255,0.07)", padding: "8px 18px", borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>{p}</div>
              ))}
            </div>
          )}
          {footer && (
            <div style={{ display: "flex", fontSize: 15, color: "#6b7280", marginTop: "8px" }}>
              {footer}
            </div>
          )}
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #009B88, #00d4a8)" }} />
      </div>
    ),
    { ...SIZE }
  )
}

function makeRateImage(exchange: string, pair: string) {
  const pairDisplay = formatPair(pair)
  const name = exName(exchange)

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a17 50%, #0d1117 100%)",
        padding: "48px 56px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 52, height: 52, borderRadius: 12, background: "#009B88",
            fontSize: 30, fontWeight: 700, color: "white",
          }}>Z</div>
          <div style={{ display: "flex", fontSize: 18, color: "#6b7280" }}>zirodelta.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: "8px" }}>
          <div style={{ display: "flex", fontSize: 15, color: "#009B88", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Funding Rate Analysis</div>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em" }}>{pairDisplay}</div>
          <div style={{ display: "flex", fontSize: 36, color: "#9ca3af", fontWeight: 400 }}>on {name}</div>
        </div>

        <div style={{ display: "flex", gap: "48px", marginBottom: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Data Source</div>
            <div style={{ display: "flex", fontSize: 24, color: "white", fontWeight: 700 }}>9.4M+ Settlements</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Coverage</div>
            <div style={{ display: "flex", fontSize: 24, color: "white", fontWeight: 700 }}>Sep 2019 — Mar 2026</div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #009B88, #00d4a8)" }} />
      </div>
    ),
    { ...SIZE }
  )
}

function makeCompareImage(slug: string) {
  const vsIndex = slug.indexOf("-vs-")
  if (vsIndex === -1) return makeImage({ label: "Compare", title: slugToTitle(slug) })
  const before = slug.slice(0, vsIndex)
  const ex2 = slug.slice(vsIndex + 4)
  const parts = before.split("-")
  const ex1 = parts[parts.length - 1]
  const pairParts = parts.slice(0, -1)
  const pair = pairParts.length >= 2
    ? `${pairParts[0].toUpperCase()}/${pairParts.slice(1).join("").toUpperCase()}`
    : before.toUpperCase()

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a17 50%, #0d1117 100%)",
        padding: "48px 56px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 52, height: 52, borderRadius: 12, background: "#009B88",
            fontSize: 30, fontWeight: 700, color: "white",
          }}>Z</div>
          <div style={{ display: "flex", fontSize: 18, color: "#6b7280" }}>zirodelta.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: "8px" }}>
          <div style={{ display: "flex", fontSize: 15, color: "#009B88", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Funding Rate Comparison</div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em" }}>{pair}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "16px" }}>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "white", background: "rgba(255,255,255,0.07)", padding: "12px 28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>{exName(ex1)}</div>
            <div style={{ display: "flex", fontSize: 28, color: "#009B88", fontWeight: 700 }}>vs</div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "white", background: "rgba(255,255,255,0.07)", padding: "12px 28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>{exName(ex2)}</div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #009B88, #00d4a8)" }} />
      </div>
    ),
    { ...SIZE }
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const type = searchParams.get("type") || "home"

  switch (type) {
    case "rate": {
      const exchange = searchParams.get("exchange") || "binance"
      const pair = searchParams.get("pair") || "btc-usdt"
      return makeRateImage(exchange, pair)
    }
    case "exchange": {
      const exchange = searchParams.get("exchange") || "binance"
      const name = exName(exchange)
      return makeImage({
        label: `${name} Perpetual Futures`,
        title: `${name} Funding Rates`,
        subtitle: `All perpetual futures pairs on ${name}`,
        footer: "Zirodelta Funding Rate Explorer",
      })
    }
    case "compare": {
      const slug = searchParams.get("slug") || ""
      return makeCompareImage(slug)
    }
    case "leaderboard":
      return makeImage({
        label: "Live Crypto Leaderboard",
        title: "Highest Funding Rates Today",
        pills: ["Binance", "Bybit", "KuCoin", "Hyperliquid", "OKX", "Gate"],
        footer: "Updated every 60s · 9.4M+ settlement records",
      })
    case "calendar":
      return makeImage({
        label: "Settlement Schedule",
        title: "Funding Rate Calendar",
        subtitle: "24h settlement timeline across 19 exchanges",
        footer: "CEX & DEX · Every Settlement Window",
      })
    case "learn":
      return makeImage({
        label: "Learning Center",
        title: searchParams.get("title") || "Learn Funding Rate Trading",
        subtitle: searchParams.get("subtitle") || "Guides and strategies for delta-neutral crypto arbitrage",
        footer: "Zirodelta Learning Center",
      })
    case "research":
      return makeImage({
        label: "Research Paper",
        title: searchParams.get("title") || "Zirodelta Research",
        subtitle: searchParams.get("subtitle") || "Quantitative analysis on funding rate dynamics",
        footer: "Zirodelta Research",
      })
    case "tool":
      return makeImage({
        label: searchParams.get("label") || "Free Tool",
        title: searchParams.get("title") || "Funding Rate Tools",
        subtitle: searchParams.get("subtitle") || "",
        footer: searchParams.get("footer") || "No signup required",
      })
    case "tools":
      return makeImage({
        label: "Free Crypto Tools",
        title: "Funding Rate Tools",
        subtitle: "Calculator, APY estimator, spread scanner, and sniper bot",
        pills: ["Calculator", "APY Estimator", "Spread Scanner", "Sniper Bot"],
        footer: "All tools free — no signup required",
      })
    case "about":
      return makeImage({
        label: "About",
        title: "About Zirodelta",
        subtitle: "Delta-neutral funding rate arbitrage protocol",
        footer: "YC Fall 2026 Track · Jakarta, Indonesia",
      })
    case "rates":
      return makeImage({
        label: "Funding Rate Explorer",
        title: "All Funding Rates",
        subtitle: "1,200+ pairs across 19 exchanges",
        pills: ["Binance", "Bybit", "KuCoin", "Gate", "OKX", "Hyperliquid"],
        footer: "9.4M+ settlements · Sep 2019 — Mar 2026",
      })
    case "docs":
      return makeImage({
        label: "Documentation",
        title: "Zirodelta Docs",
        subtitle: "Protocol documentation and API references",
      })
    case "pact":
      return makeImage({
        label: "Accountability",
        title: "The Zirodelta Pact",
        subtitle: "Transparency, accountability, and real performance",
        footer: "Real money · Real consequences · Real results",
      })
    default:
      // Homepage
      return new ImageResponse(
        (
          <div style={{
            width: "100%", height: "100%", display: "flex", flexDirection: "column",
            background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a17 50%, #0d1117 100%)",
            padding: "48px 56px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 52, height: 52, borderRadius: 12, background: "#009B88",
                fontSize: 30, fontWeight: 700, color: "white",
              }}>Z</div>
              <div style={{ display: "flex", fontSize: 18, color: "#6b7280" }}>zirodelta.com</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: "12px" }}>
              <div style={{ display: "flex", fontSize: 15, color: "#009B88", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Quantitative Trading Protocol</div>
              <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em" }}>Zirodelta</div>
              <div style={{ display: "flex", fontSize: 32, color: "#9ca3af", fontWeight: 400, lineHeight: 1.3 }}>Daily income that ignores the market</div>
              <div style={{ display: "flex", gap: "32px", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Settlements</div>
                  <div style={{ display: "flex", fontSize: 24, color: "white", fontWeight: 700 }}>9.4M+</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Exchanges</div>
                  <div style={{ display: "flex", fontSize: 24, color: "white", fontWeight: 700 }}>19+</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Strategy</div>
                  <div style={{ display: "flex", fontSize: 24, color: "white", fontWeight: 700 }}>Delta-Neutral</div>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #009B88, #00d4a8)" }} />
          </div>
        ),
        { ...SIZE }
      )
  }
}

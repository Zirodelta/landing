import { NextResponse } from "next/server"

export const runtime = "edge"

const ENGINE_API_URL = process.env.ENGINE_API_URL || "https://enterprise.zirodelta.xyz"

export async function GET() {
  try {
    const response = await fetch(
      `${ENGINE_API_URL}/api/funding/arbitrage?limit=10&min_spread=0.001`,
      { next: { revalidate: 30 } } // Cache for 30 seconds
    )

    if (!response.ok) {
      throw new Error(`Engine API returned ${response.status}`)
    }

    const data = await response.json()
    
    // Filter out unrealistic spreads (>10% likely bad data from illiquid venues)
    const validOpportunities = (data.opportunities || []).filter(
      (opp: { spread: number }) => opp.spread < 0.10 && opp.spread > 0.001
    )
    const opportunity = validOpportunities[0]

    if (!opportunity) {
      throw new Error("No valid opportunities found")
    }

    // Map engine response to frontend format
    // min_rate = most negative (long side, receives funding)
    // max_rate = most positive (short side, pays funding)
    return NextResponse.json({
      success: true,
      data: {
        symbol: opportunity.symbol,
        long_exchange: opportunity.min_rate_exchange,
        short_exchange: opportunity.max_rate_exchange,
        long_rate: opportunity.min_rate,
        short_rate: opportunity.max_rate,
        spread: opportunity.spread,
        spread_percent: (opportunity.spread * 100).toFixed(1),
        expected_apr: opportunity.expected_apr,
        updated_at: new Date().toISOString(),
      },
      meta: {
        timestamp: new Date().toISOString(),
        fallback: false,
        total_opportunities: data.total_found,
      },
    })
  } catch (error) {
    console.error("Failed to fetch top opportunity:", error)

    // Fallback data when engine is unreachable
    return NextResponse.json({
      success: true,
      data: {
        symbol: "JCTUSDT",
        long_exchange: "Bybit (Spot)",
        short_exchange: "Bybit (Perp)",
        long_rate: 0.00107,
        short_rate: -0.00107,
        spread: 0.00107,
        spread_percent: "0.64",
        expected_apr: 234,
        updated_at: new Date().toISOString(),
      },
      meta: {
        timestamp: new Date().toISOString(),
        fallback: true,
      },
    })
  }
}

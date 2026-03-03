import { NextResponse } from "next/server"

const ENGINE_API_URL = process.env.ENGINE_API_URL || "http://localhost:8000"

export async function GET() {
  try {
    const response = await fetch(`${ENGINE_API_URL}/api/v1/funding-rates/live`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })
    
    if (!response.ok) {
      throw new Error(`Engine API returned ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch funding rates:", error)
    
    // Return fallback data if engine is unreachable
    return NextResponse.json({
      success: true,
      data: {
        rates: [
          { exchange: "Binance", symbol: "BTCUSDT", funding_rate: 0.0042, last_updated: new Date().toISOString() },
          { exchange: "Bybit", symbol: "ETHUSDT", funding_rate: -0.0071, last_updated: new Date().toISOString() },
          { exchange: "OKX", symbol: "SOLUSDT", funding_rate: 0.0098, last_updated: new Date().toISOString() },
          { exchange: "Hyperliquid", symbol: "BTCUSD", funding_rate: 0.0112, last_updated: new Date().toISOString() },
          { exchange: "KuCoin", symbol: "BTCUSDT", funding_rate: -0.0318, last_updated: new Date().toISOString() },
          { exchange: "dYdX", symbol: "ETHUSDT", funding_rate: 0.0063, last_updated: new Date().toISOString() },
          { exchange: "Bitget", symbol: "BTCUSDT", funding_rate: -0.0029, last_updated: new Date().toISOString() },
          { exchange: "Gate.io", symbol: "SOLUSDT", funding_rate: 0.0084, last_updated: new Date().toISOString() },
          { exchange: "MEXC", symbol: "BTCUSDT", funding_rate: 0.0037, last_updated: new Date().toISOString() },
          { exchange: "BingX", symbol: "ETHUSDT", funding_rate: -0.0056, last_updated: new Date().toISOString() },
        ],
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        fallback: true,
      },
    })
  }
}

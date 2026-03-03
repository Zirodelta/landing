import { NextResponse } from "next/server"

const ENGINE_API_URL = process.env.ENGINE_API_URL || "http://localhost:8000"

export async function GET() {
  try {
    const response = await fetch(`${ENGINE_API_URL}/api/v1/metrics`, {
      next: { revalidate: 30 }, // Cache for 30 seconds
    })
    
    if (!response.ok) {
      throw new Error(`Engine API returned ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch metrics:", error)
    
    // Return fallback data if engine is unreachable
    return NextResponse.json({
      success: true,
      data: {
        total_volume_24h: 0,
        total_executions_24h: 0,
        average_roi: 0,
        total_funding_collected_24h: 0,
        active_opportunities: 0,
        total_funding_records: 1660000,
        exchanges_connected: 19,
        symbols_tracked: 93,
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        fallback: true,
      },
    })
  }
}

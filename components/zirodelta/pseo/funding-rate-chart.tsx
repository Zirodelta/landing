"use client"

interface MonthlyData {
  month: string
  annualizedPct: number
}

interface FundingRateChartProps {
  monthlyData: MonthlyData[]
  className?: string
}

export function FundingRateChart({ monthlyData, className = "" }: FundingRateChartProps) {
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Monthly Funding Rate Trend</h3>
        <p className="text-sm text-muted-foreground">Chart data not available</p>
      </div>
    )
  }

  const padding = { top: 30, right: 20, bottom: 50, left: 50 }

  const minRate = Math.min(...monthlyData.map(d => d.annualizedPct))
  const maxRate = Math.max(...monthlyData.map(d => d.annualizedPct))
  const rateRange = maxRate - minRate || 1
  const yMin = minRate - rateRange * 0.15
  const yMax = maxRate + rateRange * 0.15

  const yTicks = 5
  const tickValues = Array.from({ length: yTicks }, (_, i) =>
    yMin + (yMax - yMin) * (i / (yTicks - 1))
  )

  const formatMonth = (m: string) => {
    const parts = m.split("-")
    const names = ["J","F","M","A","M","J","J","A","S","O","N","D"]
    return names[parseInt(parts[1]) - 1] || m.slice(-2)
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Monthly Funding Rate Trend</h3>

      <div className="w-full">
        <svg
          viewBox={`0 0 500 250`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
        >
          {(() => {
            const w = 500, h = 250
            const cw = w - padding.left - padding.right
            const ch = h - padding.top - padding.bottom

            const points = monthlyData.map((d, i) => ({
              x: padding.left + (i / (monthlyData.length - 1)) * cw,
              y: padding.top + ((yMax - d.annualizedPct) / (yMax - yMin)) * ch,
              data: d,
            }))

            return (
              <>
                {/* Y-axis */}
                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + ch} stroke="hsl(var(--border))" strokeWidth="1" />
                {/* X-axis */}
                <line x1={padding.left} y1={padding.top + ch} x2={padding.left + cw} y2={padding.top + ch} stroke="hsl(var(--border))" strokeWidth="1" />

                {/* Zero line */}
                {yMin <= 0 && yMax >= 0 && (
                  <line
                    x1={padding.left} x2={padding.left + cw}
                    y1={padding.top + ((yMax - 0) / (yMax - yMin)) * ch}
                    y2={padding.top + ((yMax - 0) / (yMax - yMin)) * ch}
                    stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.5"
                  />
                )}

                {/* Y ticks */}
                {tickValues.map((v, i) => {
                  const y = padding.top + ((yMax - v) / (yMax - yMin)) * ch
                  return (
                    <g key={`yt-${i}`}>
                      <line x1={padding.left - 4} y1={y} x2={padding.left} y2={y} stroke="hsl(var(--border))" strokeWidth="1" />
                      <text x={padding.left - 8} y={y + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">{v.toFixed(1)}%</text>
                    </g>
                  )
                })}

                {/* X labels */}
                {monthlyData.map((d, i) => {
                  const x = padding.left + (i / (monthlyData.length - 1)) * cw
                  return (
                    <text key={`xl-${i}`} x={x} y={padding.top + ch + 16} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                      {formatMonth(d.month)}
                    </text>
                  )
                })}

                {/* Line segments */}
                {points.slice(0, -1).map((p, i) => {
                  const next = points[i + 1]
                  const pos = p.data.annualizedPct >= 0 && next.data.annualizedPct >= 0
                  return (
                    <line key={`ln-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y}
                      stroke={pos ? "#009B88" : "#ef4444"} strokeWidth="2.5" strokeLinecap="round" />
                  )
                })}

                {/* Data dots */}
                {points.map((p, i) => (
                  <circle key={`dot-${i}`} cx={p.x} cy={p.y} r="3.5"
                    fill={p.data.annualizedPct >= 0 ? "#009B88" : "#ef4444"}
                    stroke="hsl(var(--background))" strokeWidth="1.5" />
                ))}

                {/* Y-axis label */}
                <text x={12} y={padding.top + ch / 2} textAnchor="middle"
                  transform={`rotate(-90 12 ${padding.top + ch / 2})`}
                  fontSize="9" className="fill-muted-foreground">
                  Annualized %
                </text>
              </>
            )
          })()}
        </svg>
      </div>
    </div>
  )
}

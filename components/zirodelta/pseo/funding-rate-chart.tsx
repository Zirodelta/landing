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
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Funding Rate Trend</h3>
        <p className="text-sm text-muted-foreground">Chart data not available</p>
      </div>
    )
  }

  // Chart dimensions
  const width = 800
  const height = 300
  const padding = { top: 40, right: 40, bottom: 60, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Scale calculations
  const minRate = Math.min(...monthlyData.map(d => d.annualizedPct))
  const maxRate = Math.max(...monthlyData.map(d => d.annualizedPct))
  const rateRange = maxRate - minRate || 1
  
  // Add some padding to the Y scale
  const yMin = minRate - rateRange * 0.1
  const yMax = maxRate + rateRange * 0.1

  // Generate points for the line
  const points = monthlyData.map((d, i) => {
    const x = padding.left + (i / (monthlyData.length - 1)) * chartWidth
    const y = padding.top + ((yMax - d.annualizedPct) / (yMax - yMin)) * chartHeight
    return { x, y, data: d }
  })

  // Create path for the line
  const pathData = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ')

  // Y-axis tick values
  const yTicks = 5
  const tickValues = Array.from({ length: yTicks }, (_, i) => 
    yMin + (yMax - yMin) * (i / (yTicks - 1))
  )

  // Format month labels (show every other month to avoid crowding)
  const xAxisLabels = monthlyData.map((d, i) => {
    const shouldShow = i % 2 === 0 || i === monthlyData.length - 1
    return {
      x: padding.left + (i / (monthlyData.length - 1)) * chartWidth,
      label: shouldShow ? d.month.slice(-2) : '', // Show just "04", "05", etc.
      fullMonth: d.month
    }
  })

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Funding Rate Trend</h3>
      
      <div className="w-full overflow-x-auto">
        <svg width={width} height={height} className="text-foreground">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid)" />
          
          {/* Y-axis */}
          <line 
            x1={padding.left} 
            y1={padding.top} 
            x2={padding.left} 
            y2={padding.top + chartHeight} 
            stroke="hsl(var(--border))" 
            strokeWidth="1"
          />
          
          {/* X-axis */}
          <line 
            x1={padding.left} 
            y1={padding.top + chartHeight} 
            x2={padding.left + chartWidth} 
            y2={padding.top + chartHeight} 
            stroke="hsl(var(--border))" 
            strokeWidth="1"
          />
          
          {/* Zero line if applicable */}
          {yMin <= 0 && yMax >= 0 && (
            <line 
              x1={padding.left} 
              y1={padding.top + ((yMax - 0) / (yMax - yMin)) * chartHeight} 
              x2={padding.left + chartWidth} 
              y2={padding.top + ((yMax - 0) / (yMax - yMin)) * chartHeight} 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth="1" 
              strokeDasharray="5,5"
              opacity="0.7"
            />
          )}
          
          {/* Y-axis ticks and labels */}
          {tickValues.map((value, i) => {
            const y = padding.top + ((yMax - value) / (yMax - yMin)) * chartHeight
            return (
              <g key={i}>
                <line 
                  x1={padding.left - 5} 
                  y1={y} 
                  x2={padding.left} 
                  y2={y} 
                  stroke="hsl(var(--border))" 
                  strokeWidth="1"
                />
                <text 
                  x={padding.left - 10} 
                  y={y + 3} 
                  textAnchor="end" 
                  className="text-xs fill-muted-foreground"
                >
                  {value.toFixed(1)}%
                </text>
              </g>
            )
          })}
          
          {/* X-axis ticks and labels */}
          {xAxisLabels.map((label, i) => (
            <g key={i}>
              {label.label && (
                <>
                  <line 
                    x1={label.x} 
                    y1={padding.top + chartHeight} 
                    x2={label.x} 
                    y2={padding.top + chartHeight + 5} 
                    stroke="hsl(var(--border))" 
                    strokeWidth="1"
                  />
                  <text 
                    x={label.x} 
                    y={padding.top + chartHeight + 20} 
                    textAnchor="middle" 
                    className="text-xs fill-muted-foreground"
                  >
                    {label.label}
                  </text>
                </>
              )}
            </g>
          ))}
          
          {/* Chart line - split into segments for different colors */}
          {points.slice(0, -1).map((point, i) => {
            const nextPoint = points[i + 1]
            const currentRate = point.data.annualizedPct
            const nextRate = nextPoint.data.annualizedPct
            const isPositive = currentRate >= 0 && nextRate >= 0
            
            return (
              <line
                key={i}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke={isPositive ? "#009B88" : "#ef4444"}
                strokeWidth="3"
                strokeLinecap="round"
              />
            )
          })}
          
          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={point.data.annualizedPct >= 0 ? "#009B88" : "#ef4444"}
              stroke="hsl(var(--background))"
              strokeWidth="2"
            />
          ))}
          
          {/* Axis labels */}
          <text 
            x={padding.left + chartWidth / 2} 
            y={height - 10} 
            textAnchor="middle" 
            className="text-sm fill-muted-foreground font-medium"
          >
            Month
          </text>
          <text 
            x={20} 
            y={padding.top + chartHeight / 2} 
            textAnchor="middle" 
            transform={`rotate(-90 20 ${padding.top + chartHeight / 2})`}
            className="text-sm fill-muted-foreground font-medium"
          >
            Annualized Rate (%)
          </text>
        </svg>
      </div>
    </div>
  )
}
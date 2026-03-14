"use client"

interface PositiveRateGaugeProps {
  positivePct: number
  totalSettlements: number
  className?: string
}

export function PositiveRateGauge({ positivePct, totalSettlements, className = "" }: PositiveRateGaugeProps) {
  if (typeof positivePct !== 'number' || typeof totalSettlements !== 'number') {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-2">Positive Settlement Rate</h3>
        <p className="text-sm text-muted-foreground">Data not available</p>
      </div>
    )
  }

  // SVG dimensions
  const size = 200
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  
  // Calculate angles for the donut (start from top, go clockwise)
  const startAngle = -Math.PI / 2 // Start at top
  const endAngle = startAngle + (2 * Math.PI * positivePct / 100) // End based on percentage
  
  // Create the arc path for positive portion
  const largeArcFlag = positivePct > 50 ? 1 : 0
  const x1 = center + radius * Math.cos(startAngle)
  const y1 = center + radius * Math.sin(startAngle)
  const x2 = center + radius * Math.cos(endAngle)
  const y2 = center + radius * Math.sin(endAngle)
  
  const positiveArcPath = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  
  // Create the arc path for remaining portion (if any)
  const remainingPct = 100 - positivePct
  const remainingPath = remainingPct > 0 ? `M ${x2} ${y2} A ${radius} ${radius} 0 ${remainingPct > 50 ? 1 : 0} 1 ${x1} ${y1}` : ''
  
  // Calculate positive settlements count
  const positiveSettlements = Math.round(totalSettlements * positivePct / 100)

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Positive Settlement Rate</h3>
      
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
              opacity="0.3"
            />
            
            {/* Positive portion arc */}
            {positivePct > 0 && (
              <path
                d={positiveArcPath}
                fill="none"
                stroke="#009B88"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}
            
            {/* Remaining portion arc */}
            {remainingPct > 0 && (
              <path
                d={remainingPath}
                fill="none"
                stroke="#ef4444"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-foreground">
              {positivePct.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Positive
            </div>
          </div>
        </div>
        
        {/* Stats below the gauge */}
        <div className="mt-6 space-y-2 text-center">
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{positiveSettlements.toLocaleString()}</span> of{' '}
            <span className="text-foreground font-medium">{totalSettlements.toLocaleString()}</span> settlements
          </div>
          <div className="text-xs text-muted-foreground">
            pay shorts (positive funding)
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#009B88' }}></div>
            <span className="text-muted-foreground">Positive</span>
          </div>
          {remainingPct > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-muted-foreground">Negative</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
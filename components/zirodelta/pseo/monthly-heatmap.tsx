"use client"

interface MonthData {
  month: string
  avgRatePct: number
  annualizedPct: number
  positivePct: number
}

interface MonthlyHeatmapProps {
  months: MonthData[]
  className?: string
}

export function MonthlyHeatmap({ months, className = "" }: MonthlyHeatmapProps) {
  if (!months || months.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Rate Heatmap</h3>
        <p className="text-sm text-muted-foreground">Data not available</p>
      </div>
    )
  }

  // Calculate the range for color scaling
  const rates = months.map(m => m.annualizedPct)
  const maxAbsRate = Math.max(...rates.map(r => Math.abs(r)))
  
  // Grid configuration
  const cellSize = 48
  const cols = Math.min(6, months.length) // Max 6 columns
  const rows = Math.ceil(months.length / cols)
  const gap = 2

  // Color calculation function
  const getColor = (rate: number, positivePct: number) => {
    const intensity = Math.abs(rate) / maxAbsRate
    const alpha = Math.max(0.1, Math.min(0.9, intensity)) // Clamp opacity between 0.1 and 0.9
    
    if (rate >= 0) {
      // Positive rates - green with varying intensity
      return `rgba(0, 155, 136, ${alpha})`
    } else {
      // Negative rates - red with varying intensity
      return `rgba(239, 68, 68, ${alpha})`
    }
  }

  // Format month for display
  const formatMonth = (monthStr: string) => {
    const parts = monthStr.split('-')
    if (parts.length >= 2) {
      const month = parseInt(parts[1])
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return monthNames[month - 1] || monthStr.slice(-2)
    }
    return monthStr.slice(-2)
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Rate Heatmap</h3>
      
      <div className="flex flex-col items-center">
        {/* Heatmap grid */}
        <div 
          className="grid gap-0.5"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gap: gap
          }}
        >
          {months.map((month, i) => (
            <div
              key={month.month}
              className="relative group cursor-pointer transition-transform hover:scale-110"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: getColor(month.annualizedPct, month.positivePct),
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px'
              }}
            >
              {/* Month label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-xs">
                <div className="font-semibold text-white text-shadow">
                  {formatMonth(month.month)}
                </div>
                <div className="font-medium text-white text-shadow text-[10px]">
                  {month.annualizedPct > 0 ? '+' : ''}{month.annualizedPct.toFixed(1)}%
                </div>
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                <div className="font-semibold">{formatMonth(month.month)} {month.month.split('-')[0]}</div>
                <div>Rate: {month.annualizedPct > 0 ? '+' : ''}{month.annualizedPct.toFixed(2)}%</div>
                <div>Positive: {month.positivePct.toFixed(1)}%</div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 space-y-3">
          {/* Color scale */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Low</span>
            <div className="flex">
              {/* Negative gradient */}
              <div className="w-4 h-3" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}></div>
              <div className="w-4 h-3" style={{ backgroundColor: 'rgba(239, 68, 68, 0.5)' }}></div>
              <div className="w-4 h-3" style={{ backgroundColor: 'rgba(239, 68, 68, 0.8)' }}></div>
              {/* Separator */}
              <div className="w-1 h-3 bg-border"></div>
              {/* Positive gradient */}
              <div className="w-4 h-3" style={{ backgroundColor: 'rgba(0, 155, 136, 0.2)' }}></div>
              <div className="w-4 h-3" style={{ backgroundColor: 'rgba(0, 155, 136, 0.5)' }}></div>
              <div className="w-4 h-3" style={{ backgroundColor: 'rgba(0, 155, 136, 0.8)' }}></div>
            </div>
            <span className="text-muted-foreground">High</span>
          </div>
          
          {/* Labels */}
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.7)' }}></div>
              <span className="text-muted-foreground">Negative Rate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(0, 155, 136, 0.7)' }}></div>
              <span className="text-muted-foreground">Positive Rate</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center max-w-md">
            Each cell represents one month. Color intensity shows rate magnitude.
            Hover for detailed statistics.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .text-shadow {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  )
}
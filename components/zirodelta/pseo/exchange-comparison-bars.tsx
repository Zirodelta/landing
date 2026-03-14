"use client"

interface ExchangeData {
  name: string
  annualizedPct: number
  settlements: number
}

interface ExchangeComparisonBarsProps {
  exchanges: ExchangeData[]
  className?: string
}

export function ExchangeComparisonBars({ exchanges, className = "" }: ExchangeComparisonBarsProps) {
  if (!exchanges || exchanges.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-2">Cross-Exchange Comparison</h3>
        <p className="text-sm text-muted-foreground">Data not available</p>
      </div>
    )
  }

  // Sort exchanges by annualized percentage (highest first)
  const sortedExchanges = [...exchanges].sort((a, b) => b.annualizedPct - a.annualizedPct)
  
  // Find the max rate to scale bars
  const maxRate = Math.max(...sortedExchanges.map(e => Math.abs(e.annualizedPct)))
  const maxBarWidth = 300 // Maximum bar width in pixels

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Cross-Exchange Comparison</h3>
      
      <div className="space-y-4">
        {sortedExchanges.map((exchange, i) => {
          const isPositive = exchange.annualizedPct >= 0
          const barWidth = Math.abs(exchange.annualizedPct) / maxRate * maxBarWidth
          const barColor = isPositive ? '#009B88' : '#ef4444'
          const intensity = Math.abs(exchange.annualizedPct) / maxRate
          const opacity = Math.max(0.3, intensity) // Minimum opacity for visibility

          return (
            <div key={exchange.name} className="space-y-2">
              {/* Exchange name and rate */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{exchange.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({exchange.settlements.toLocaleString()} settlements)
                  </span>
                </div>
                <div className={`text-sm font-semibold ${isPositive ? 'text-primary' : 'text-red-500'}`}>
                  {exchange.annualizedPct > 0 ? '+' : ''}{exchange.annualizedPct.toFixed(2)}%
                </div>
              </div>
              
              {/* Bar chart */}
              <div className="relative">
                {/* Background bar */}
                <div 
                  className="h-3 bg-muted rounded-full"
                  style={{ width: maxBarWidth }}
                />
                
                {/* Value bar */}
                <div 
                  className="absolute top-0 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: barWidth,
                    backgroundColor: barColor,
                    opacity: opacity
                  }}
                />
                
                {/* Rank indicator */}
                <div className="absolute -left-6 top-0 h-3 flex items-center">
                  <span className="text-xs font-bold text-muted-foreground w-4 text-center">
                    #{i + 1}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded" style={{ backgroundColor: '#009B88' }}></div>
            <span className="text-muted-foreground">Positive Rate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded bg-red-500"></div>
            <span className="text-muted-foreground">Negative Rate</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Annualized funding rates ranked by performance. Color intensity reflects rate magnitude.
        </p>
      </div>
    </div>
  )
}
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
      <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Cross-Exchange Comparison</h3>
        <p className="text-sm text-muted-foreground">Data not available</p>
      </div>
    )
  }

  const sorted = [...exchanges].sort((a, b) => b.annualizedPct - a.annualizedPct)
  const maxRate = Math.max(...sorted.map(e => Math.abs(e.annualizedPct)))

  return (
    <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Cross-Exchange Comparison</h3>

      <div className="space-y-3">
        {sorted.map((ex, i) => {
          const pos = ex.annualizedPct >= 0
          const widthPct = (Math.abs(ex.annualizedPct) / maxRate) * 100

          return (
            <div key={ex.name}>
              <div className="flex justify-between items-baseline mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-muted-foreground">#{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{ex.name}</span>
                </div>
                <span className={`text-sm font-semibold font-mono ${pos ? "text-primary" : "text-red-500"}`}>
                  {ex.annualizedPct > 0 ? "+" : ""}{ex.annualizedPct.toFixed(2)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: pos ? "#009B88" : "#ef4444",
                    opacity: Math.max(0.4, widthPct / 100),
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {ex.settlements.toLocaleString()} settlements
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

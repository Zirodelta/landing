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
      <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Monthly Rate Heatmap</h3>
        <p className="text-sm text-muted-foreground">Data not available</p>
      </div>
    )
  }

  const maxAbsRate = Math.max(...months.map(m => Math.abs(m.annualizedPct)))

  const formatMonth = (m: string) => {
    const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const idx = parseInt(m.split("-")[1]) - 1
    return names[idx] || m.slice(-2)
  }

  const getColor = (rate: number) => {
    const intensity = Math.abs(rate) / maxAbsRate
    const alpha = Math.max(0.15, Math.min(0.85, intensity))
    return rate >= 0
      ? `rgba(0, 155, 136, ${alpha})`
      : `rgba(239, 68, 68, ${alpha})`
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Monthly Rate Heatmap</h3>

      {/* Responsive grid: 4 cols on mobile, 6 on sm+ */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-1.5">
        {months.map((m) => (
          <div
            key={m.month}
            className="relative aspect-square rounded flex flex-col items-center justify-center group cursor-default"
            style={{
              backgroundColor: getColor(m.annualizedPct),
              border: "1px solid hsl(var(--border))",
            }}
          >
            <span className="text-[10px] sm:text-xs font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {formatMonth(m.month)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {m.annualizedPct > 0 ? "+" : ""}{m.annualizedPct.toFixed(1)}%
            </span>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1.5 bg-black/90 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
              <div className="font-semibold">{formatMonth(m.month)} {m.month.split("-")[0]}</div>
              <div>Ann: {m.annualizedPct > 0 ? "+" : ""}{m.annualizedPct.toFixed(2)}%</div>
              <div>Positive: {m.positivePct.toFixed(0)}%</div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Negative</span>
        <div className="flex">
          <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: "rgba(239, 68, 68, 0.6)" }} />
          <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }} />
          <div className="w-0.5 h-2 bg-border" />
          <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: "rgba(0, 155, 136, 0.2)" }} />
          <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: "rgba(0, 155, 136, 0.6)" }} />
        </div>
        <span>Positive</span>
      </div>
    </div>
  )
}

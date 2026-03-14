"use client"

interface PositiveRateGaugeProps {
  positivePct: number
  totalSettlements: number
  className?: string
}

export function PositiveRateGauge({ positivePct, totalSettlements, className = "" }: PositiveRateGaugeProps) {
  if (typeof positivePct !== "number" || typeof totalSettlements !== "number") {
    return (
      <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Positive Settlement Rate</h3>
        <p className="text-sm text-muted-foreground">Data not available</p>
      </div>
    )
  }

  const size = 160
  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const positiveLen = (positivePct / 100) * circumference
  const negativeLen = circumference - positiveLen
  const positiveSettlements = Math.round((totalSettlements * positivePct) / 100)

  return (
    <div className={`bg-card rounded-lg border border-border p-4 sm:p-6 ${className}`}>
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Positive Settlement Rate</h3>

      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="block" style={{ transform: "rotate(-90deg)" }}>
            {/* Background */}
            <circle cx={center} cy={center} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} opacity="0.2" />
            {/* Positive arc */}
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#009B88" strokeWidth={strokeWidth}
              strokeDasharray={`${positiveLen} ${negativeLen}`} strokeLinecap="round" />
            {/* Negative arc */}
            {negativeLen > 0 && (
              <circle cx={center} cy={center} r={radius} fill="none" stroke="#ef4444" strokeWidth={strokeWidth}
                strokeDasharray={`${negativeLen} ${positiveLen}`} strokeDashoffset={-positiveLen} strokeLinecap="round" opacity="0.6" />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">{positivePct.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Positive</div>
          </div>
        </div>

        <div className="mt-4 text-center space-y-1">
          <div className="text-xs sm:text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{positiveSettlements.toLocaleString()}</span> of{" "}
            <span className="text-foreground font-medium">{totalSettlements.toLocaleString()}</span> settlements
          </div>
          <div className="text-xs text-muted-foreground">pay shorts (positive funding)</div>
        </div>

        <div className="mt-3 flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#009B88" }} />
            <span className="text-muted-foreground">Positive</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Negative</span>
          </div>
        </div>
      </div>
    </div>
  )
}

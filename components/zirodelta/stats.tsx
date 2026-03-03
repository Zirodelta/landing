"use client"

import { useEffect, useRef, useState } from "react"

interface StatItem {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

interface MetricsData {
  exchanges_connected: number
  symbols_tracked: number
  total_funding_records: number
  active_opportunities: number
  average_roi: number
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const targetRef = useRef(value)

  // Update target when value changes
  useEffect(() => {
    targetRef.current = value
  }, [value])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const target = targetRef.current
          const duration = 1500
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.floor(eased * target))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    return num.toString()
  }

  return (
    <div ref={ref} className="font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
      {prefix}
      {value >= 1000 ? formatNumber(displayValue) : displayValue}
      <span className="text-primary">{suffix}</span>
    </div>
  )
}

export function Stats() {
  const [metrics, setMetrics] = useState<MetricsData>({
    exchanges_connected: 19,
    symbols_tracked: 93,
    total_funding_records: 1660000,
    active_opportunities: 47,
    average_roi: 163,
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics")
        const data = await response.json()
        if (data.success && data.data) {
          setMetrics({
            exchanges_connected: data.data.exchanges_connected || 19,
            symbols_tracked: data.data.symbols_tracked || 93,
            total_funding_records: data.data.total_funding_records || 1660000,
            active_opportunities: data.data.active_opportunities || 47,
            average_roi: data.data.average_roi || 163,
          })
        }
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
        // Keep fallback values
      }
    }

    fetchMetrics()
    // Refresh every 60 seconds
    const interval = setInterval(fetchMetrics, 60000)
    return () => clearInterval(interval)
  }, [])

  const stats: StatItem[] = [
    { value: metrics.exchanges_connected, label: "Exchanges Connected", suffix: "+" },
    { value: metrics.total_funding_records, label: "Funding Rates Monitored", suffix: "+" },
    { value: metrics.symbols_tracked, label: "Active Trading Pairs" },
    { value: metrics.active_opportunities, label: "Live Opportunities", suffix: "+" },
  ]

  return (
    <section id="stats" className="relative border-y border-border bg-secondary/30">
      {/* Glow line at top */}
      <div className="glow-line absolute left-0 right-0 top-0 h-px" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-3 text-center">
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Glow line at bottom */}
      <div className="glow-line absolute bottom-0 left-0 right-0 h-px" aria-hidden="true" />
    </section>
  )
}

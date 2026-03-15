"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

interface StatItem {
  value: number
  label: string
  prefix?: string
  suffix?: string
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
  const stats: StatItem[] = [
    { value: 19, label: "Annual Return", suffix: "%" },
    { value: 3.74, label: "Sharpe Ratio" },
    { value: 6, label: "Years Stress-Tested", suffix: "+" },
    { value: 0, label: "Lost to Market Direction", prefix: "$" },
  ] as Array<StatItem & { linkTo?: string }>

  return (
    <section id="stats" className="relative border-y border-border bg-secondary/30">
      <div className="glow-line absolute left-0 right-0 top-0 h-px" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat) => {
            const StatWrapper = (stat as any).linkTo ? Link : 'div'
            const wrapperProps = (stat as any).linkTo 
              ? { href: (stat as any).linkTo, className: "flex flex-col items-center gap-3 text-center group transition-all duration-200 hover:scale-105" }
              : { className: "flex flex-col items-center gap-3 text-center" }
            
            return (
              <StatWrapper key={stat.label} {...wrapperProps}>
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <span className={`text-sm ${(stat as any).linkTo ? 'text-muted-foreground group-hover:text-primary transition-colors' : 'text-muted-foreground'}`}>
                  {stat.label}
                </span>
              </StatWrapper>
            )
          })}
        </div>
      </div>
      <div className="glow-line absolute bottom-0 left-0 right-0 h-px" aria-hidden="true" />
    </section>
  )
}

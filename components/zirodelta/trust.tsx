"use client"

import { useEffect, useRef, useState } from "react"

/* ───────────────────────────── Animation Styles ── */

const animationStyles = `
@keyframes floatUp {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes floatDown {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(6px); }
}
@keyframes dashFlow {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -16; }
}
@keyframes lockPulse {
  0%, 100% { filter: drop-shadow(0 0 0px #009B88); }
  50% { filter: drop-shadow(0 0 6px #009B88); }
}
@keyframes waveFlow {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -40; }
}
@keyframes dotPulse {
  0%, 100% { r: 2; opacity: 0.3; }
  50% { r: 4; opacity: 0.8; }
}
@keyframes chainSweep {
  0% { opacity: 0.15; }
  20% { opacity: 0.8; }
  40% { opacity: 0.15; }
  100% { opacity: 0.15; }
}
@keyframes drawCheck {
  from { stroke-dashoffset: 20; }
  to { stroke-dashoffset: 0; }
}
@keyframes cellRipple {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.7; }
}
@keyframes badgePulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}
`

/* ───────────────────────────── Custom Animated SVG Illustrations ── */

function HedgePairIllustration({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" aria-hidden="true">
      <style>{animationStyles}</style>
      {/* Left position - Spot */}
      <rect x="10" y="40" width="70" height="80" rx="8" stroke="#009B88" strokeWidth="1.5" opacity={active ? 1 : 0.3} className="transition-all duration-700" />
      <text x="45" y="68" textAnchor="middle" fill="#009B88" fontSize="10" fontWeight="600" opacity={active ? 1 : 0.4} className="transition-all duration-700">SPOT</text>
      <rect x="22" y="78" width="46" height="4" rx="2" fill="#009B88" opacity={active ? 0.3 : 0.1} className="transition-all duration-700" />
      <rect x="22" y="88" width="32" height="4" rx="2" fill="#009B88" opacity={active ? 0.2 : 0.08} className="transition-all duration-700" />
      <rect x="22" y="98" width="40" height="4" rx="2" fill="#009B88" opacity={active ? 0.25 : 0.08} className="transition-all duration-700" />
      {/* Arrow up - floats */}
      <g style={{ animation: active ? "floatUp 2s ease-in-out infinite" : "none" }}>
        <path d="M45 108 L45 115 L40 115 L45 122 L50 115 L45 115" fill="#009B88" opacity={active ? 0.5 : 0.15} className="transition-all duration-700" />
      </g>

      {/* Right position - Short Perp */}
      <rect x="120" y="40" width="70" height="80" rx="8" stroke="#72B7B1" strokeWidth="1.5" opacity={active ? 1 : 0.3} className="transition-all duration-700" />
      <text x="155" y="64" textAnchor="middle" fill="#72B7B1" fontSize="9" fontWeight="600" opacity={active ? 1 : 0.4} className="transition-all duration-700">SHORT</text>
      <text x="155" y="74" textAnchor="middle" fill="#72B7B1" fontSize="9" fontWeight="600" opacity={active ? 1 : 0.4} className="transition-all duration-700">PERP</text>
      <rect x="132" y="78" width="46" height="4" rx="2" fill="#72B7B1" opacity={active ? 0.3 : 0.1} className="transition-all duration-700" />
      <rect x="132" y="88" width="32" height="4" rx="2" fill="#72B7B1" opacity={active ? 0.2 : 0.08} className="transition-all duration-700" />
      <rect x="132" y="98" width="40" height="4" rx="2" fill="#72B7B1" opacity={active ? 0.25 : 0.08} className="transition-all duration-700" />
      {/* Arrow down - floats */}
      <g style={{ animation: active ? "floatDown 2s ease-in-out infinite" : "none" }}>
        <path d="M155 122 L155 115 L150 115 L155 108 L160 115 L155 115" fill="#72B7B1" opacity={active ? 0.5 : 0.15} className="transition-all duration-700" />
      </g>

      {/* Center lock / connection - dashes flow */}
      <line x1="80" y1="80" x2="120" y2="80" stroke={active ? "#009B88" : "#222224"} strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-700" style={{ animation: active ? "dashFlow 1s linear infinite" : "none" }} />
      {/* Lock glow pulse */}
      <g style={{ animation: active ? "lockPulse 2.5s ease-in-out infinite" : "none" }}>
        <circle cx="100" cy="80" r="12" stroke={active ? "#009B88" : "#222224"} strokeWidth="1.5" fill="#0a0a0a" className="transition-all duration-700" />
        {/* Lock icon */}
        <rect x="95" y="80" width="10" height="8" rx="2" stroke={active ? "#009B88" : "#6D6E71"} strokeWidth="1.2" fill="none" className="transition-all duration-700" />
        <path d="M98 80 L98 77 A2 2 0 0 1 102 77 L102 80" stroke={active ? "#009B88" : "#6D6E71"} strokeWidth="1.2" fill="none" className="transition-all duration-700" />
      </g>

      {/* Label */}
      <text x="100" y="25" textAnchor="middle" fill={active ? "#FFFFFF" : "#6D6E71"} fontSize="9" fontWeight="500" className="transition-all duration-700">HEDGE PAIR</text>
      <line x1="70" y1="30" x2="130" y2="30" stroke={active ? "#009B88" : "#222224"} strokeWidth="0.5" className="transition-all duration-700" />
    </svg>
  )
}

function MarketNeutralIllustration({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Bull wave - flowing animation */}
      <path
        d="M10 120 Q30 40 60 80 Q80 110 100 60 Q120 20 150 70 Q170 100 190 50"
        stroke="#009B88"
        strokeWidth="1.5"
        fill="none"
        opacity={active ? 0.7 : 0.2}
        strokeDasharray={active ? "8 4" : "none"}
        className="transition-all duration-700"
        style={{ animation: active ? "waveFlow 2s linear infinite" : "none" }}
      />
      {/* Bear wave - flowing animation */}
      <path
        d="M10 50 Q30 120 60 80 Q80 50 100 100 Q120 140 150 90 Q170 60 190 110"
        stroke="#72B7B1"
        strokeWidth="1.5"
        fill="none"
        opacity={active ? 0.7 : 0.2}
        strokeDasharray={active ? "8 4" : "none"}
        className="transition-all duration-700"
        style={{ animation: active ? "waveFlow 3s linear infinite reverse" : "none" }}
      />
      {/* Center steady line - the yield line */}
      <line x1="10" y1="80" x2="190" y2="80" stroke={active ? "#009B88" : "#222224"} strokeWidth="2" className="transition-all duration-700" />

      {/* Yield capture zone - pulsing border */}
      <rect x="70" y="65" width="60" height="30" rx="4" fill={active ? "rgba(0,155,136,0.08)" : "transparent"} stroke={active ? "#009B88" : "transparent"} strokeWidth="1" strokeDasharray="3 3" className="transition-all duration-700" style={{ animation: active ? "dashFlow 2s linear infinite" : "none" }} />
      <text x="100" y="84" textAnchor="middle" fill={active ? "#009B88" : "#6D6E71"} fontSize="9" fontWeight="600" className="transition-all duration-700">YIELD</text>

      {/* Labels */}
      <text x="186" y="46" textAnchor="end" fill="#009B88" fontSize="8" opacity={active ? 0.6 : 0.2} className="transition-all duration-700">BULL</text>
      <text x="186" y="118" textAnchor="end" fill="#72B7B1" fontSize="8" opacity={active ? 0.6 : 0.2} className="transition-all duration-700">BEAR</text>

      {/* Dots on yield line - sequential pulse */}
      {[30, 55, 80, 105, 130, 155].map((x, i) => (
        <circle key={i} cx={x} cy={80} r={active ? 2.5 : 1.5} fill="#009B88" opacity={active ? 0.6 : 0.15} className="transition-all duration-700" style={{ animation: active ? `dotPulse 2s ease-in-out ${i * 0.3}s infinite` : "none" }} />
      ))}
    </svg>
  )
}

function OnChainIllustration({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Chain of blocks - sequential sweep */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 15 + i * 38
        return (
          <g key={i}>
            <rect
              x={x} y="55" width="30" height="50" rx="4"
              stroke={active ? "#009B88" : "#222224"}
              strokeWidth={1.5}
              fill={active ? "rgba(0,155,136,0.05)" : "transparent"}
              className="transition-all duration-700"
              style={{ animation: active ? `chainSweep 3s ease-in-out ${i * 0.5}s infinite` : "none" }}
            />
            {/* Block lines */}
            <rect x={x + 5} y={62} width={20} height="2.5" rx="1" fill="#009B88" style={{ animation: active ? `chainSweep 3s ease-in-out ${i * 0.5 + 0.1}s infinite` : "none", opacity: active ? undefined : 0.15 }} />
            <rect x={x + 5} y={69} width={14} height="2.5" rx="1" fill="#009B88" style={{ animation: active ? `chainSweep 3s ease-in-out ${i * 0.5 + 0.15}s infinite` : "none", opacity: active ? undefined : 0.1 }} />
            <rect x={x + 5} y={76} width={18} height="2.5" rx="1" fill="#009B88" style={{ animation: active ? `chainSweep 3s ease-in-out ${i * 0.5 + 0.2}s infinite` : "none", opacity: active ? undefined : 0.1 }} />

            {/* Checkmark in block - draw on */}
            {active && (
              <path
                d={`M${x + 10} 89 L${x + 14} 93 L${x + 21} 85`}
                stroke="#009B88"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray="20"
                style={{ animation: `drawCheck 1s ease-out ${i * 0.5 + 0.3}s both, chainSweep 3s ease-in-out ${i * 0.5}s infinite` }}
              />
            )}

            {/* Chain link to next - flowing dash */}
            {i < 4 && (
              <line
                x1={x + 30} y1={80} x2={x + 38} y2={80}
                stroke={active ? "#009B88" : "#222224"}
                strokeWidth="1.5"
                strokeDasharray={active ? "3 2" : "none"}
                className="transition-all duration-700"
                style={{ animation: active ? "dashFlow 0.8s linear infinite" : "none" }}
              />
            )}
          </g>
        )
      })}

      {/* Verification badge - pulse */}
      <g style={{ animation: active ? "badgePulse 2.5s ease-in-out infinite" : "none", transformOrigin: "100px 130px" }}>
        <circle cx="100" cy="130" r="12" stroke={active ? "#009B88" : "#222224"} strokeWidth="1.5" fill={active ? "rgba(0,155,136,0.1)" : "transparent"} className="transition-all duration-700" />
        <path d="M94 130 L98 134 L106 126" stroke={active ? "#009B88" : "#6D6E71"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" className="transition-all duration-700" strokeDasharray={active ? "20" : "none"} style={{ animation: active ? "drawCheck 1.2s ease-out 0.5s both" : "none" }} />
      </g>
      <text x="100" y="152" textAnchor="middle" fill={active ? "#009B88" : "#6D6E71"} fontSize="8" fontWeight="500" className="transition-all duration-700">VERIFIED</text>

      {/* Header label */}
      <text x="100" y="38" textAnchor="middle" fill={active ? "#FFFFFF" : "#6D6E71"} fontSize="9" fontWeight="500" className="transition-all duration-700">AUDIT TRAIL</text>
      <line x1="55" y1="43" x2="145" y2="43" stroke={active ? "#009B88" : "#222224"} strokeWidth="0.5" className="transition-all duration-700" />
    </svg>
  )
}

function DataDepthIllustration({ active }: { active: boolean }) {
  const rows = 6
  const cols = 12
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) { setCount(0); return }
    const target = 1660000
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer); return }
      setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [active])

  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Data matrix - wave ripple */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const intensity = active
            ? Math.sin((r + c) * 0.8) * 0.3 + 0.4
            : 0.08
          const delay = ((r + c) * 0.15) % 3
          return (
            <rect
              key={`${r}-${c}`}
              x={14 + c * 15}
              y={30 + r * 18}
              width="12"
              height="14"
              rx="2"
              fill="#009B88"
              opacity={active ? intensity : 0.08}
              className="transition-all duration-700"
              style={{
                animation: active ? `cellRipple 3s ease-in-out ${delay}s infinite` : "none",
                transitionDelay: active ? `${(r * cols + c) * 8}ms` : "0ms"
              }}
            />
          )
        })
      )}

      {/* Counter label - counts up */}
      <text x="100" y="152" textAnchor="middle" fill={active ? "#009B88" : "#6D6E71"} fontSize="11" fontWeight="700" fontFamily="monospace" className="transition-all duration-700">
        {active ? `${count.toLocaleString()}+` : "9400000+"}
      </text>
      <text x="100" y="18" textAnchor="middle" fill={active ? "#FFFFFF" : "#6D6E71"} fontSize="9" fontWeight="500" className="transition-all duration-700">FUNDING RATE RECORDS</text>
      <line x1="45" y1="23" x2="155" y2="23" stroke={active ? "#009B88" : "#222224"} strokeWidth="0.5" className="transition-all duration-700" />
    </svg>
  )
}

/* ───────────────────────────── Data ── */

const trustPoints = [
  {
    id: "hedge",
    Illustration: HedgePairIllustration,
    headline: "Architecturally Hedged",
    statement: "Single-leg exposure is impossible.",
    body: "Every position is a hedge pair — buy spot, short perp, same exchange. Delta-neutral by construction. Risk is eliminated at the protocol level, not managed after the fact.",
    metric: "0.00",
    metricLabel: "Net exposure",
  },
  {
    id: "neutral",
    Illustration: MarketNeutralIllustration,
    headline: "Market Neutral",
    statement: "Bull. Bear. Sideways. We earn.",
    body: "The engine captures funding spreads regardless of market direction. Zero directional bias means zero directional risk across any market condition.",
    metric: "3",
    metricLabel: "Market modes covered",
  },
  {
    id: "onchain",
    Illustration: OnChainIllustration,
    headline: "Fully Auditable",
    statement: "Full transparency. Audit us anytime.",
    body: "Every trade, every position, every funding payment is recorded and publicly verifiable via our transparency dashboard. Full auditability by default.",
    metric: "100%",
    metricLabel: "Auditable trades",
  },
  {
    id: "data",
    Illustration: DataDepthIllustration,
    headline: "9.4M+ Data Points",
    statement: "Depth drives precision.",
    body: "Our analytics engine has processed over 9.4 million funding rate settlement records across all supported exchanges. Historical depth powers every execution decision.",
    metric: "9.4M+",
    metricLabel: "Records processed",
  },
]

/* ───────────────────────────── Main Component ── */

export function Trust() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((el, index) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="trust" className="relative py-24 lg:py-40 overflow-hidden">
      {/* Subtle side lines */}
      <div className="pointer-events-none absolute left-8 top-0 bottom-0 w-px bg-border/40 hidden lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute right-8 top-0 bottom-0 w-px bg-border/40 hidden lg:block" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-24 lg:mb-32">
          <span className="mb-4 inline-block text-xs font-semibold tracking-widest text-primary uppercase">
            Trust & Security
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Built for trust,{" "}
            <span className="text-gradient">not hype</span>
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Security isn&apos;t a feature we added. It&apos;s the architecture
            everything else is built on.
          </p>
        </div>

        {/* Trust points -- full-width alternating editorial blocks */}
        <div className="space-y-24 lg:space-y-40">
          {trustPoints.map((point, index) => {
            const isEven = index % 2 === 0
            const isActive = visibleItems.has(index)

            return (
              <div
                key={point.id}
                ref={(el) => { itemRefs.current[index] = el }}
                className={`transition-all duration-1000 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {/* Divider line */}
                <div className="flex items-center gap-4 mb-12 lg:mb-16">
                  <span className="font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {point.headline}
                  </span>
                </div>

                <div className={`grid items-center gap-12 lg:gap-20 lg:grid-cols-2 ${
                  isEven ? "" : "lg:[direction:rtl]"
                }`}>
                  {/* Text column */}
                  <div className={isEven ? "" : "lg:[direction:ltr]"}>
                    {/* Big statement */}
                    <h3 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl leading-tight">
                      {point.statement}
                    </h3>

                    {/* Body */}
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-lg">
                      {point.body}
                    </p>

                    {/* Metric strip */}
                    <div className="mt-8 flex items-center gap-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-4xl font-bold text-primary lg:text-5xl">
                          {point.metric}
                        </span>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <span className="text-sm text-muted-foreground">
                        {point.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Illustration column */}
                  <div className={`${isEven ? "" : "lg:[direction:ltr]"} flex items-center justify-center`}>
                    <div className={`relative w-full max-w-sm aspect-[5/4] rounded-2xl border transition-all duration-1000 ${
                      isActive
                        ? "border-primary/20 bg-card"
                        : "border-border bg-card/50"
                    }`}>
                      {/* Corner accents */}
                      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg transition-all duration-700 ${isActive ? "border-primary/40" : "border-transparent"}`} />
                      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg transition-all duration-700 ${isActive ? "border-primary/40" : "border-transparent"}`} />
                      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg transition-all duration-700 ${isActive ? "border-primary/40" : "border-transparent"}`} />
                      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-lg transition-all duration-700 ${isActive ? "border-primary/40" : "border-transparent"}`} />

                      <div className="p-6 h-full">
                        <point.Illustration active={isActive} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

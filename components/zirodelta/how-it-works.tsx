"use client"

import { useEffect, useRef, useState } from "react"

/* ── Custom SVG icons ── */

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M6 24h36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M24 6v36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M16 12l-4-4M32 12l4-4M16 36l-4 4M32 36l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function RankIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M8 36L16 20L24 28L34 12L40 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 36L16 28L24 20L34 32L40 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <circle cx="34" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="12" r="1.5" fill="currentColor" />
      <path d="M38 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4" y="38" width="40" height="2" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

function ExecuteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M10 24h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 32h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 32h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 16l1 1 2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30.5 16l1 1 2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10v4M26 10v4M22 34v4M26 34v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="20" y="20" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M22.5 24l1 1 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CollectIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 8v5M24 35v5M8 24h5M35 24h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 13l3.5 3.5M31.5 31.5l3.5 3.5M13 35l3.5-3.5M31.5 16.5l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Data ── */

const steps = [
  {
    number: "01",
    title: "Scan",
    description:
      "Every day, score 874 symbols across 30+ exchanges by trailing funding rate. Filter by rate consistency, open interest, and spot availability.",
    Icon: ScanIcon,
    metric: "874 symbols",
    detail: "30+ exchanges",
  },
  {
    number: "02",
    title: "Rank & Allocate",
    description:
      "Rank by daily yield. Allocate capital to top opportunities — dynamically sized by open interest, equity concentration limits, and available capital.",
    Icon: RankIcon,
    metric: "Dynamic sizing",
    detail: "OI-constrained",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Buy spot + short perp on the same exchange. SmartEntry uses limit orders with market fallback. Every position is a delta-neutral hedge pair.",
    Icon: ExecuteIcon,
    metric: "0.00 exposure",
    detail: "Spot + short perp",
  },
  {
    number: "04",
    title: "Collect",
    description:
      "Collect funding payments every 1-8 hours. The engine monitors rate decay, stop-loss triggers, and rotation opportunities daily. 10% of profit goes to insurance.",
    Icon: CollectIcon,
    metric: "19-44% APY",
    detail: "Stress-tested",
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32" ref={sectionRef}>
      <style>{`
        @keyframes flowRight {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes nodeRing {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-secondary/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-widest text-primary uppercase">
            Engine Pipeline
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            How the engine works
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Four steps. Fully autonomous. Scan, rank, execute, collect — every day.
          </p>
        </div>

        {/* Desktop: Horizontal pipeline */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[40px] z-0" aria-hidden="true">
              <div className="mx-16 h-px bg-border" />
              <div
                className="absolute left-16 top-0 h-px w-10 bg-primary"
                style={{ animation: "flowRight 2.5s ease-in-out infinite" }}
              />
            </div>

            <div className="relative grid grid-cols-4 gap-0">
              {steps.map((step, index) => {
                const isActive = activeStep === index
                const isPast = activeStep > index

                return (
                  <div
                    key={step.number}
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <div className="relative z-10">
                      <div
                        className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                          isActive
                            ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(0,155,136,0.2)]"
                            : isPast
                            ? "border-primary/40 bg-primary/5"
                            : "border-border bg-card"
                        }`}
                      >
                        <step.Icon
                          className={`h-9 w-9 transition-colors duration-500 ${
                            isActive
                              ? "text-primary"
                              : isPast
                              ? "text-primary/60"
                              : "text-muted-foreground"
                          }`}
                        />
                        {isActive && (
                          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                            <div
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                              style={{ animation: "scanLine 2s ease-in-out infinite" }}
                            />
                          </div>
                        )}
                      </div>
                      {isActive && (
                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary"
                          style={{ animation: "nodeRing 2s ease-out infinite" }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span className={`mt-4 font-mono text-xs transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {step.number}
                    </span>
                    <h3 className={`mt-2 text-lg font-semibold transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </h3>
                    <div className={`mt-3 rounded-full border px-3 py-1 transition-all duration-500 ${isActive ? "border-primary/30 bg-primary/10" : "border-border bg-card"}`}>
                      <span className={`font-mono text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {step.metric}
                      </span>
                    </div>
                    <span className={`mt-1.5 text-xs transition-all duration-500 ${isActive ? "text-muted-foreground opacity-100" : "opacity-0"}`}>
                      {step.detail}
                    </span>
                    <div className={`mt-4 max-w-48 overflow-hidden text-center transition-all duration-500 ${isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    <div className={`absolute -bottom-4 h-0.5 w-12 rounded-full transition-all duration-500 ${isActive ? "bg-primary opacity-100" : "bg-transparent opacity-0"}`} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-md">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="relative h-1 flex-1 overflow-hidden rounded-full bg-border"
                  aria-label={`Go to step ${i + 1}`}
                >
                  <div className={`absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500 ${activeStep === i ? "w-full" : activeStep > i ? "w-full opacity-40" : "w-0"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="mt-16 lg:hidden">
          <div className="relative">
            <div className="absolute bottom-0 left-8 top-0 w-px bg-border" aria-hidden="true" />
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex gap-6 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                    <step.Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-primary">{step.number}</span>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
                      <span className="font-mono text-xs text-primary">{step.metric}</span>
                      <span className="text-xs text-muted-foreground">{step.detail}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

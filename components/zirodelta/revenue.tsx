"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, BarChart3, Vault, TrendingUp } from "lucide-react"

const services = [
  {
    name: "Settled",
    tagline: "Predict funding rates. Win on Solana.",
    description:
      "Trade YES/NO prediction markets on crypto funding rates. 7,000+ markets across 5 exchanges, settling every 1–8 hours. Built on Solana. No deposit required on testnet.",
    features: [
      "7,000+ active markets",
      "5 exchanges covered",
      "Solana-native, fast settlement",
      "Testnet available now",
    ],
    cta: "Trade on Settled",
    ctaHref: "https://settled.pro",
    icon: TrendingUp,
    accent: "#009B88",
    available: true,
    badge: "Live",
  },
  {
    name: "Zidee Sniper Bot",
    tagline: "One-tap arbitrage. Zero cost.",
    description:
      "Scan the market for extreme funding rate opportunities and execute in one tap. Completely free — no signup, no token gate, no profit share. You keep 100%.",
    features: [
      "Scans multiple exchanges instantly",
      "One-tap execution",
      "Free forever",
      "Your own exchange keys",
    ],
    cta: "Open Bot on Telegram",
    ctaHref: "https://t.me/zidee_bot",
    icon: BarChart3,
    accent: "#00D1B2",
    available: true,
    badge: "Free",
  },
  {
    name: "Managed Yield",
    tagline: "Automated yield. Coming soon.",
    description:
      "Deposit USDT and let the engine generate daily income automatically. Delta-neutral positions across exchanges. No directional risk, no active management required.",
    features: [
      "Automated daily income",
      "No price exposure",
      "Multi-exchange coverage",
      "Withdraw anytime",
    ],
    cta: "Coming Soon",
    ctaHref: "",
    icon: Vault,
    accent: "#6D6E71",
    available: false,
    badge: "Coming Soon",
  },
]

export function Revenue() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    cardRefs.current.forEach((el, index) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-20">
          <span className="mb-4 inline-block text-xs font-semibold tracking-widest text-primary uppercase">
            Our Products
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Trade them. Automate them.{" "}
            <span className="text-gradient">Free.</span>
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Two live products built around crypto funding rates. A third one coming.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => {
            const isVisible = visibleCards.has(index)
            const Icon = service.icon

            return (
              <div
                key={service.name}
                ref={(el) => { cardRefs.current[index] = el }}
                className={`group relative rounded-2xl border transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${
                  service.available
                    ? "border-border hover:border-primary/30 bg-card"
                    : "border-border/50 bg-card/50"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Status badge */}
                <div
                  className="absolute top-4 right-4 rounded-full px-3 py-1"
                  style={{
                    backgroundColor: service.available ? `${service.accent}15` : "transparent",
                    border: `1px solid ${service.available ? service.accent + "40" : "#6D6E7140"}`,
                  }}
                >
                  <span
                    className="text-[10px] font-semibold tracking-wider uppercase"
                    style={{ color: service.available ? service.accent : "#6D6E71" }}
                  >
                    {service.badge}
                  </span>
                </div>

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{
                      backgroundColor: `${service.accent}10`,
                      border: `1px solid ${service.accent}20`,
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: service.accent }}
                    />
                  </div>

                  {/* Name & tagline */}
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {service.name}
                  </h3>
                  <p
                    className="mt-1 text-sm font-medium"
                    style={{ color: service.accent }}
                  >
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-6 space-y-2.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                      >
                        <span
                          className="h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: service.accent }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8">
                    {service.available ? (
                      <a
                        href={service.ctaHref}
                        target={service.ctaHref.startsWith("http") ? "_blank" : undefined}
                        rel={service.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all duration-300"
                        style={{
                          backgroundColor: `${service.accent}15`,
                          color: service.accent,
                          border: `1px solid ${service.accent}30`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${service.accent}25`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${service.accent}15`
                        }}
                      >
                        {service.cta}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                      </a>
                    ) : (
                      <div className="flex w-full items-center justify-center rounded-lg border border-border bg-secondary/50 py-3 text-sm font-medium text-muted-foreground">
                        Coming Soon
                      </div>
                    )}
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

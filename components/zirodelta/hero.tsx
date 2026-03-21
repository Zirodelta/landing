"use client"

import { ArrowUpRight, ArrowDown } from "lucide-react"
import { WaveSlices } from "./wave-slices"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <WaveSlices />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center 40%, transparent 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.85) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 backdrop-blur-sm px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Products Live
            </span>
          </div>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Bet on crypto funding rates.{" "}
            <span className="text-gradient" style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic', fontWeight: 900 }}>Explore</span>
            {" "}them.{" "}
            <span className="text-gradient">Automate</span>
            {" "}them.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl" style={{ color: '#e8e8e8' }}>
            Trade YES/NO prediction markets on funding rates with <strong>Settled</strong> — 7,000+ markets across 5 exchanges. Or let <strong>Zidee</strong>, our free sniper bot, automate arbitrage for you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://settled.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110"
            >
              Trade on Settled
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background/30 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
            >
              See How It Works
              <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href="https://t.me/zidee_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Try our free sniper bot →
            </a>
          </div>
        </div>
        <div className="mt-20 flex justify-center">
          <a
            href="#stats"
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to stats"
          >
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}

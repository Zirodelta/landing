"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number // ms
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number // px
  duration?: number // ms
  once?: boolean
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 700,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const transforms: Record<string, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "none",
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`,
        transform: isVisible ? "none" : transforms[direction],
        opacity: isVisible ? 1 : 0,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  )
}

// Stagger children with increasing delay
export function RevealGroup({
  children,
  className = "",
  stagger = 100,
  direction = "up" as RevealProps["direction"],
  distance = 30,
}: {
  children: ReactNode[]
  className?: string
  stagger?: number
  direction?: RevealProps["direction"]
  distance?: number
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger} direction={direction} distance={distance}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}

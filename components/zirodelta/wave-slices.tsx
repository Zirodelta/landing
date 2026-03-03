"use client"

import { useEffect, useRef } from "react"

/*
  Luminous Wave Slices
  ────────────────────
  Flowing teal/green blade-like waves on dark background
  Inspired by aurora/sound wave aesthetic
*/

export function WaveSlices() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    let animationId: number
    let time = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      if (w < 10 || h < 10) {
        animationId = requestAnimationFrame(draw)
        return
      }

      time += 0.008
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, w, h)

      // Number of slices
      const sliceCount = 18
      const sliceWidth = w / sliceCount

      for (let i = 0; i < sliceCount; i++) {
        const x = i * sliceWidth + sliceWidth / 2
        
        // Phase offset for each slice — creates wave motion
        const phase = i * 0.3 + time
        const nextPhase = (i + 1) * 0.3 + time

        // Height oscillation
        const heightFactor = 0.3 + Math.sin(phase) * 0.15 + Math.sin(phase * 0.5) * 0.1
        const sliceHeight = h * heightFactor

        // Vertical position oscillation
        const yOffset = Math.sin(phase * 0.7) * h * 0.08
        const baseY = h * 0.5 + yOffset

        // Curve control points for the blade shape
        const topY = baseY - sliceHeight / 2
        const bottomY = baseY + sliceHeight / 2

        // Width variation
        const widthMod = 0.6 + Math.sin(phase * 1.2) * 0.25
        const bladeWidth = sliceWidth * widthMod * 0.7

        // Gradient for each slice
        const gradient = ctx.createLinearGradient(x, topY, x, bottomY)
        
        // Color variation based on position and time
        const hueShift = Math.sin(phase * 0.5) * 10
        const baseLightness = 45 + Math.sin(phase) * 10
        const topColor = `hsla(${165 + hueShift}, 85%, ${baseLightness + 15}%, 0.35)`
        const midColor = `hsla(${160 + hueShift}, 90%, ${baseLightness}%, 0.4)`
        const bottomColor = `hsla(${155 + hueShift}, 80%, ${baseLightness - 10}%, 0.3)`

        gradient.addColorStop(0, "transparent")
        gradient.addColorStop(0.15, topColor)
        gradient.addColorStop(0.5, midColor)
        gradient.addColorStop(0.85, bottomColor)
        gradient.addColorStop(1, "transparent")

        // Draw the blade/slice shape
        ctx.beginPath()
        
        // Start at top point
        ctx.moveTo(x, topY)
        
        // Right curve (bulge out)
        const rightBulge = Math.sin(phase + 1) * bladeWidth * 0.3
        ctx.bezierCurveTo(
          x + bladeWidth * 0.6 + rightBulge, topY + sliceHeight * 0.25,
          x + bladeWidth * 0.7 + rightBulge, topY + sliceHeight * 0.75,
          x, bottomY
        )
        
        // Left curve (bulge out other side)
        const leftBulge = Math.sin(phase + 2) * bladeWidth * 0.25
        ctx.bezierCurveTo(
          x - bladeWidth * 0.7 - leftBulge, topY + sliceHeight * 0.75,
          x - bladeWidth * 0.6 - leftBulge, topY + sliceHeight * 0.25,
          x, topY
        )

        ctx.fillStyle = gradient
        ctx.fill()

        // Add subtle glow
        ctx.shadowColor = `hsla(${162 + hueShift}, 100%, 50%, 0.15)`
        ctx.shadowBlur = 15 * (0.5 + Math.sin(phase) * 0.3)
        ctx.fill()
        ctx.shadowBlur = 0

        // Inner highlight line
        const highlightAlpha = 0.1 + Math.sin(phase * 2) * 0.08
        ctx.beginPath()
        ctx.moveTo(x, topY + sliceHeight * 0.15)
        ctx.bezierCurveTo(
          x + bladeWidth * 0.2, topY + sliceHeight * 0.35,
          x + bladeWidth * 0.15, topY + sliceHeight * 0.65,
          x, bottomY - sliceHeight * 0.15
        )
        ctx.strokeStyle = `rgba(180, 255, 230, ${highlightAlpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Subtle ambient glow in center
      const glowX = w * 0.35
      const glowY = h * 0.55
      const glowRadius = Math.min(w, h) * 0.4
      const ambientGlow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius)
      ambientGlow.addColorStop(0, `rgba(255, 180, 100, ${0.04 + Math.sin(time * 0.5) * 0.02})`)
      ambientGlow.addColorStop(0.5, "rgba(255, 150, 80, 0.02)")
      ambientGlow.addColorStop(1, "transparent")
      ctx.fillStyle = ambientGlow
      ctx.fillRect(0, 0, w, h)

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
    </div>
  )
}

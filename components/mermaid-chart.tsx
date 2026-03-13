"use client"

import { useEffect, useRef, useState } from "react"

interface MermaidChartProps {
  chart: string
  className?: string
}

export function MermaidChart({ chart, className = "" }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")

  useEffect(() => {
    async function render() {
      const mermaid = (await import("mermaid")).default
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          background: "transparent",
          primaryColor: "#22d3ee",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#334155",
          lineColor: "#64748b",
          secondaryColor: "#1e293b",
          tertiaryColor: "#0f172a",
          noteTextColor: "#e2e8f0",
          noteBkgColor: "#1e293b",
          noteBorderColor: "#334155",
          fontSize: "14px",
        },
        flowchart: {
          htmlLabels: true,
          curve: "basis",
          padding: 16,
        },
      })
      try {
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
        const { svg: renderedSvg } = await mermaid.render(id, chart)
        setSvg(renderedSvg)
      } catch (e) {
        console.error("Mermaid render error:", e)
      }
    }
    render()
  }, [chart])

  return (
    <div
      ref={containerRef}
      className={`rounded-lg border border-border bg-card/30 p-6 overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

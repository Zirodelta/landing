"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onTransitionEnd={() => {
        if (!isOpen) setIsAnimating(false)
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-3xl max-h-[85vh] bg-background border border-border rounded-t-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-border bg-background/95 backdrop-blur-sm px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 max-h-[calc(85vh-60px)] legal-content">
          {content}
        </div>
      </div>
    </div>
  )
}

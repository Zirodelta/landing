"use client"

import { useEffect, useState, useCallback } from "react"
import { X } from "lucide-react"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true)
        })
      })
      document.body.style.overflow = "hidden"
    } else {
      setVisible(false)
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleTransitionEnd = useCallback(() => {
    if (!isOpen && !visible) {
      setMounted(false)
    }
  }, [isOpen, visible])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          backgroundColor: visible ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
          WebkitBackdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-background border border-border rounded-t-2xl"
        style={{
          transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.4s ease-out',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-border bg-background/95 backdrop-blur-sm px-6 py-4">
          <h2
            className="text-lg font-semibold text-foreground"
            style={{
              transition: 'transform 0.6s cubic-bezier(0.32, 0.72, 0, 1) 0.1s, opacity 0.5s ease-out 0.1s',
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              opacity: visible ? 1 : 0,
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground hover:rotate-90"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div
          className="overflow-y-auto px-6 py-6 max-h-[calc(85vh-80px)] legal-content"
          style={{
            transition: 'opacity 0.5s ease-out 0.15s',
            opacity: visible ? 1 : 0,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  )
}

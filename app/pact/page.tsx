"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Send, CheckCircle2, Handshake } from "lucide-react"

const partnershipTypes = [
  { value: "liquidity", label: "Liquidity Partnership" },
  { value: "custom-vault", label: "Custom Vault Deployment" },
  { value: "otc", label: "OTC / Block Trading" },
  { value: "white-label", label: "White-Label Solution" },
  { value: "other", label: "Other" },
]

const capitalRanges = [
  { value: "100k-500k", label: "$100K – $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m-5m", label: "$1M – $5M" },
  { value: "5m-10m", label: "$5M – $10M" },
  { value: "10m+", label: "$10M+" },
]

export default function PactPage() {
  const [formState, setFormState] = useState({
    companyName: "",
    contactName: "",
    email: "",
    partnershipType: "",
    capitalRange: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Replace with actual form submission (e.g., API route, email service)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Zirodelta Home">
            <Image
              src="/zirodelta-full-white.svg"
              alt="Zirodelta"
              width={140}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column — Info */}
          <div>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Handshake className="h-7 w-7 text-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Zirodelta Pact
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Institutional-grade funding rate arbitrage with custom terms.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Custom Position Sizing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tailored exposure limits and risk parameters for your capital structure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Dedicated Infrastructure</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Isolated exchange accounts and execution pipelines. Your capital, your keys.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Priority Execution</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    First access to high-spread opportunities. Lower latency, higher capture.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Direct Communication</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Private channel with the founding team. No support tickets — real conversations.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Response time:</span> We review
                every inquiry personally. Expect a response within 24-48 hours for qualified
                partners.
              </p>
            </div>
          </div>

          {/* Right column — Form */}
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Inquiry Received</h2>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Thank you for your interest in Zirodelta Pact. We&apos;ll review your inquiry and
                  get back to you within 24-48 hours.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return to Home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-foreground">Start a Conversation</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us about your organization and what you&apos;re looking for.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-foreground"
                    >
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formState.companyName}
                      onChange={handleChange}
                      required
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Acme Capital"
                    />
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-sm font-medium text-foreground"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formState.contactName}
                      onChange={handleChange}
                      required
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="john@acmecapital.com"
                    />
                  </div>

                  {/* Partnership Type */}
                  <div>
                    <label
                      htmlFor="partnershipType"
                      className="block text-sm font-medium text-foreground"
                    >
                      Partnership Type
                    </label>
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      value={formState.partnershipType}
                      onChange={handleChange}
                      required
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select a type</option>
                      {partnershipTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Capital Range */}
                  <div>
                    <label
                      htmlFor="capitalRange"
                      className="block text-sm font-medium text-foreground"
                    >
                      Expected Capital Deployment
                    </label>
                    <select
                      id="capitalRange"
                      name="capitalRange"
                      value={formState.capitalRange}
                      onChange={handleChange}
                      required
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select a range</option>
                      {capitalRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      placeholder="Tell us about your requirements, timeline, or any questions you have..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

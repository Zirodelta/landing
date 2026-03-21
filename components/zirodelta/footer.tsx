"use client"

import { useState } from "react"
import Image from "next/image"
import { LegalModal } from "./legal-modal"
import { PrivacyPolicyContent, TermsOfServiceContent, RiskDisclaimerContent } from "./legal-content"

const footerLinks = {
  Products: [
    { label: "Settled", href: "https://settled.pro" },
    { label: "Sniper Bot (@zidee_bot)", href: "https://t.me/zidee_bot" },
    { label: "$ZDLT Hub", href: "https://zirodelta.org" },
    { label: "Pact (Business)", href: "/pact" },
    { label: "Whitepaper", href: "/whitepaper.pdf" },
  ],
  Resources: [
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Learn", href: "/learn" },
    { label: "Funding Rates", href: "/rates" },
    { label: "Compare Exchanges", href: "/compare" },
    { label: "Tools", href: "/tools" },
    { label: "Documentation", href: "/docs" },
    { label: "GitHub", href: "https://github.com/zirodelta" },
  ],
  Community: [
    { label: "Discord", href: "https://discord.com/invite/YHW275Vpn3" },
    { label: "Twitter / X", href: "https://x.com/zirodelta" },
    { label: "Telegram", href: "https://t.me/zirodelta" },
    { label: "Official Links", href: "https://official.zirodelta.com" },
  ],
}

type LegalDoc = "privacy" | "terms" | "risk" | null

export function Footer() {
  const [openLegal, setOpenLegal] = useState<LegalDoc>(null)

  return (
    <>
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-2.5" aria-label="Zirodelta Home">
                <Image src="/zirodelta-full-white.svg" alt="Zirodelta" width={140} height={28} className="h-7 w-auto" />
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                The funding rate company. Trade them, explore them, automate them.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                  {category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Zirodelta. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => setOpenLegal("privacy")}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setOpenLegal("terms")}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setOpenLegal("risk")}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Risk Disclaimer
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        isOpen={openLegal === "privacy"}
        onClose={() => setOpenLegal(null)}
        title="Privacy Policy"
        content={<PrivacyPolicyContent />}
      />
      <LegalModal
        isOpen={openLegal === "terms"}
        onClose={() => setOpenLegal(null)}
        title="Terms of Service"
        content={<TermsOfServiceContent />}
      />
      <LegalModal
        isOpen={openLegal === "risk"}
        onClose={() => setOpenLegal(null)}
        title="Risk Disclaimer"
        content={<RiskDisclaimerContent />}
      />
    </>
  )
}

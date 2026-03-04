import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation | Zirodelta",
  description:
    "Technical documentation for Zirodelta's autonomous funding rate arbitrage engine.",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

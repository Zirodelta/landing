import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Exchange } from "@/content/pseo/schemas/types"

export function ExchangeCard({ exchange }: { exchange: Exchange }) {
  return (
    <Link
      href={`/rates/${exchange.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-muted-foreground/30 hover:bg-card/80"
    >
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-lg font-bold text-foreground group-hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          {exchange.name}
        </h2>
        <Badge
          variant="outline"
          className={
            exchange.type === "DEX"
              ? "border-violet-500/20 text-violet-400"
              : "border-blue-500/20 text-blue-400"
          }
        >
          {exchange.type}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
        {exchange.description}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>
          Fees: <span className="text-foreground">{exchange.fee_tier}</span>
        </span>
        <span>
          Funding:{" "}
          <span className="text-foreground">{exchange.rate_frequency}</span>
        </span>
      </div>
    </Link>
  )
}

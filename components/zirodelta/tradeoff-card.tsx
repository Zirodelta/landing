interface TradeoffCardProps {
  pros: string[]
  cons: string[]
}

export function TradeoffCard({ pros, cons }: TradeoffCardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 my-8">
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h3
          className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Advantages
        </h3>
        <ul className="space-y-2.5">
          {pros.map((item, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-emerald-400 mt-0.5 shrink-0">+</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
        <h3
          className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Tradeoffs
        </h3>
        <ul className="space-y-2.5">
          {cons.map((item, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-red-400 mt-0.5 shrink-0">−</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { Check, X, Minus } from "lucide-react"

interface ComparisonRow {
  feature: string
  optionA: string | boolean
  optionB: string | boolean
  winner?: "a" | "b" | "tie"
}

interface ComparisonTableProps {
  labelA: string
  labelB: string
  rows: ComparisonRow[]
}

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-emerald-400" />
    ) : (
      <X className="h-4 w-4 text-red-400" />
    )
  }
  return <span>{value}</span>
}

export function ComparisonTable({
  labelA,
  labelB,
  rows,
}: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-8">
      {/* Desktop */}
      <table className="hidden sm:table w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-left font-semibold text-muted-foreground w-1/3">
              Feature
            </th>
            <th
              className="py-3 px-4 text-left font-bold text-foreground"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {labelA}
            </th>
            <th
              className="py-3 pl-4 text-left font-bold text-foreground"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {labelB}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="py-3 pr-4 text-muted-foreground">
                {row.feature}
              </td>
              <td
                className={`py-3 px-4 ${
                  row.winner === "a"
                    ? "text-emerald-400 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <CellValue value={row.optionA} />
              </td>
              <td
                className={`py-3 pl-4 ${
                  row.winner === "b"
                    ? "text-emerald-400 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <CellValue value={row.optionB} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: stacked cards */}
      <div className="sm:hidden space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="rounded-lg border border-border/50 p-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              {row.feature}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  {labelA}
                </div>
                <div
                  className={
                    row.winner === "a"
                      ? "text-emerald-400 font-medium text-sm"
                      : "text-muted-foreground text-sm"
                  }
                >
                  <CellValue value={row.optionA} />
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  {labelB}
                </div>
                <div
                  className={
                    row.winner === "b"
                      ? "text-emerald-400 font-medium text-sm"
                      : "text-muted-foreground text-sm"
                  }
                >
                  <CellValue value={row.optionB} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

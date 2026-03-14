"use client"

import { ArticleFilters } from "@/components/zirodelta/article-filters"
import { ExchangeCard } from "@/components/zirodelta/pseo/exchange-card"
import type { Exchange } from "@/lib/pseo-types"

interface RatesPageClientProps {
  exchanges: Exchange[]
}

export function RatesPageClient({ exchanges }: RatesPageClientProps) {
  return (
    <ArticleFilters
      items={exchanges.map(exchange => ({
        ...exchange,
        title: exchange.name,
        description: exchange.description || `${exchange.type} exchange with perpetual futures trading`,
      }))}
      showCategoryTabs={false}
      showTopicTags={false}
      showSort={false}
      searchPlaceholder="Search exchanges..."
      showCount={true}
      pageTitle="exchanges"
      showTypeFilter={true}
      stickyFilters={true}
    >
      {(filteredExchanges) => {
        const cex = filteredExchanges.filter((e) => e.type === "CEX")
        const dex = filteredExchanges.filter((e) => e.type === "DEX")

        return (
          <div className="space-y-12">
            {/* Show all if type filter is "all", otherwise show by type */}
            {filteredExchanges.length === exchanges.length ? (
              <>
                {/* CEX Section */}
                <section>
                  <h2
                    className="text-xl font-bold text-foreground mb-6"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Centralized Exchanges
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cex.map((exchange) => (
                      <ExchangeCard key={exchange.slug} exchange={exchange} />
                    ))}
                  </div>
                </section>

                {/* DEX Section */}
                <section>
                  <h2
                    className="text-xl font-bold text-foreground mb-6"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Decentralized Exchanges
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {dex.map((exchange) => (
                      <ExchangeCard key={exchange.slug} exchange={exchange} />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              /* Filtered results */
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredExchanges.map((exchange) => (
                  <ExchangeCard key={exchange.slug} exchange={exchange} />
                ))}
              </div>
            )}
          </div>
        )
      }}
    </ArticleFilters>
  )
}
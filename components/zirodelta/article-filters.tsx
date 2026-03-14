"use client"

import React, { useState, useMemo } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FilterableItem {
  slug: string
  title: string
  description: string
  category?: string
  publishedDate?: string
  date?: string
  type?: "CEX" | "DEX" // for exchanges
  name?: string // for exchanges
}

interface ArticleFiltersProps {
  items: FilterableItem[]
  children: (filteredItems: FilterableItem[]) => React.ReactNode
  showCategoryTabs?: boolean
  categoryConfig?: {
    categories: Record<string, string>
    colors?: Record<string, string>
  }
  showTopicTags?: boolean
  topicTags?: string[]
  showSort?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  showCount?: boolean
  pageTitle?: string
  className?: string
  stickyFilters?: boolean
  showTypeFilter?: boolean // for exchanges (CEX/DEX)
}

const defaultCategoryConfig = {
  categories: {
    all: "All",
    comparison: "Comparison",
    constraint: "Constraint",
    "use-case": "Use Case",
    general: "Guide",
    strategy: "Strategy",
    tools: "Tools",
  },
  colors: {
    comparison: "border-blue-500/20 text-blue-400",
    constraint: "border-amber-500/20 text-amber-400",
    "use-case": "border-violet-500/20 text-violet-400",
    general: "border-border text-muted-foreground",
    strategy: "border-green-500/20 text-green-400",
    tools: "border-cyan-500/20 text-cyan-400",
  },
}

const defaultTopicTags = [
  "Funding Rate",
  "Arbitrage", 
  "Bot",
  "Exchange",
  "Risk",
  "Comparison",
]

export function ArticleFilters({
  items,
  children,
  showCategoryTabs = true,
  categoryConfig = defaultCategoryConfig,
  showTopicTags = false,
  topicTags = defaultTopicTags,
  showSort = true,
  showSearch = true,
  searchPlaceholder = "Search articles...",
  showCount = true,
  pageTitle = "articles",
  className = "",
  stickyFilters = true,
  showTypeFilter = false,
}: ArticleFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedType, setSelectedType] = useState("all")

  const filteredItems = useMemo(() => {
    let filtered = [...items]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.name && item.name.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategory !== "all" && showCategoryTabs) {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // Type filter (for exchanges)
    if (selectedType !== "all" && showTypeFilter) {
      filtered = filtered.filter((item) => item.type === selectedType)
    }

    // Topic filter
    if (selectedTopic && showTopicTags) {
      const topic = selectedTopic.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(topic) ||
          item.description.toLowerCase().includes(topic)
      )
    }

    // Sort
    if (showSort) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "alphabetical":
            return a.title.localeCompare(b.title)
          case "newest":
          default:
            const dateA = new Date(a.publishedDate || a.date || "").getTime()
            const dateB = new Date(b.publishedDate || b.date || "").getTime()
            return dateB - dateA
        }
      })
    }

    return filtered
  }, [
    items,
    searchQuery,
    selectedCategory,
    selectedTopic,
    sortBy,
    selectedType,
    showCategoryTabs,
    showTopicTags,
    showSort,
    showTypeFilter,
  ])

  // Get unique categories from items
  const availableCategories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category).filter(Boolean))
    const categoryEntries = ["all", ...Array.from(cats)]
    return categoryEntries.map((cat) => ({
      value: cat,
      label: categoryConfig.categories[cat] || cat,
    }))
  }, [items, categoryConfig.categories])

  const filterBarClass = stickyFilters
    ? "sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-4"
    : "border-b border-border pb-6 mb-6"

  return (
    <div className={className}>
      <div className={filterBarClass}>
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="space-y-4">
            {/* Search Bar */}
            {showSearch && (
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {/* Main Filter Row */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Tabs or Type Filter */}
              <div className="flex flex-wrap gap-2">
                {showTypeFilter ? (
                  <Tabs value={selectedType} onValueChange={setSelectedType}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="CEX">CEX</TabsTrigger>
                      <TabsTrigger value="DEX">DEX</TabsTrigger>
                    </TabsList>
                  </Tabs>
                ) : showCategoryTabs ? (
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                    <TabsList className="grid-cols-auto">
                      {availableCategories.map((cat) => (
                        <TabsTrigger key={cat.value} value={cat.value}>
                          {cat.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                ) : null}
              </div>

              {/* Sort + Count Row */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                {showSort && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        {sortBy === "newest" ? "Newest First" : "A-Z"}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortBy("newest")}>
                        Newest First
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                        Alphabetical A-Z
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Count */}
                {showCount && (
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Showing {filteredItems.length} of {items.length} {pageTitle}
                  </span>
                )}
              </div>
            </div>

            {/* Topic Tags */}
            {showTopicTags && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Topics:</span>
                <Badge
                  variant={selectedTopic === "" ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => setSelectedTopic("")}
                >
                  All
                </Badge>
                {topicTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTopic === tag ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setSelectedTopic(tag === selectedTopic ? "" : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-6">
        {children(filteredItems)}
      </div>
    </div>
  )
}
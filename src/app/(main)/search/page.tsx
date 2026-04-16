import type { Metadata } from 'next'
import { searchTools, getCategories } from '@/lib/data'
import ToolCard from '@/components/cards/ToolCard'
import SearchBox from '@/components/ui/SearchBox'
import PricingFilter from '@/components/filters/PricingFilter'
import Link from 'next/link'
import type { PricingModel } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Search Tools',
  description: 'Search and filter 300+ VC tools by category, pricing, and use case.',
}

interface Props {
  searchParams: Promise<{ q?: string; category?: string; pricing?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '', category, pricing, page: pageStr } = await searchParams
  const page = Number(pageStr ?? 1)

  const [result, categories] = await Promise.all([
    searchTools({
      query: q,
      category,
      pricing: (pricing as PricingModel) || undefined,
      page,
      pageSize: 24,
    }),
    getCategories(),
  ])

  const { data: tools, total, totalPages } = result

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          {q ? `Results for "${q}"` : 'Search Tools'}
        </h1>
        <SearchBox defaultValue={q} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0 space-y-6">
          <PricingFilter currentPricing={pricing} basePath="/search" />

          {/* Category filter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Category
            </h3>
            <div className="flex flex-col gap-1">
              <Link
                href={`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  !category
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                All Categories
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/search?${q ? `q=${encodeURIComponent(q)}&` : ''}category=${cat.slug}`}
                  className={`rounded-md px-3 py-2 text-sm transition-colors truncate ${
                    category === cat.slug
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-4">
            {total} {total === 1 ? 'tool' : 'tools'} found
          </p>

          {tools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-foreground font-medium mb-1">No tools found</p>
              <p className="text-sm text-muted-foreground mb-4">
                Try a different search term or remove filters
              </p>
              <Link
                href="/search"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/search?${q ? `q=${encodeURIComponent(q)}&` : ''}${category ? `category=${category}&` : ''}${pricing ? `pricing=${pricing}&` : ''}page=${p}`}
                      className={`h-8 w-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                        p === page
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

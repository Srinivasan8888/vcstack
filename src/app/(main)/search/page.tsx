import type { Metadata } from 'next'
import { searchTools, getCategories } from '@/lib/data'
import ToolCard from '@/components/cards/ToolCard'
import SearchBox from '@/components/ui/SearchBox'
import PricingFilter from '@/components/filters/PricingFilter'
import Link from 'next/link'
import type { PricingModel } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Search Tools',
  description: 'Search and filter 500+ VC tools by category, pricing, and use case.',
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
    <div className="page" style={{ padding: '24px 24px 48px' }}>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        <span style={{ color: 'var(--ink)' }}>Search</span>
      </div>

      <header
        style={{
          borderTop: '2px solid var(--ink)',
          borderBottom: '1px solid var(--ink)',
          padding: '20px 0',
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--red)',
            marginBottom: 8,
          }}
        >
          The Archive
        </div>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            fontSize: 'var(--fs-name)',
            color: 'var(--ink)',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {q ? `Results for “${q}”` : 'Search the paper'}
        </h1>
        <SearchBox defaultValue={q} />
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--ink-muted)',
            marginTop: 16,
          }}
        >
          {total} {total === 1 ? 'match' : 'matches'}
        </p>
      </header>

      <div style={{ display: 'grid', gap: 32 }} className="lg:grid-cols-[220px_1fr]">
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <PricingFilter currentPricing={pricing} basePath="/search" />

          <div>
            <div className="section-header">Category</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                href={`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 'var(--fs-btn)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--rule)',
                  color: !category ? 'var(--red)' : 'var(--ink-light)',
                  textDecoration: 'none',
                  fontWeight: !category ? 700 : 500,
                }}
              >
                {!category ? '▸ ' : '  '}All Categories
              </Link>
              {categories.map((cat) => {
                const isActive = category === cat.slug
                return (
                  <Link
                    key={cat.id}
                    href={`/search?${q ? `q=${encodeURIComponent(q)}&` : ''}category=${cat.slug}`}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 'var(--fs-btn)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--rule)',
                      color: isActive ? 'var(--red)' : 'var(--ink-light)',
                      textDecoration: 'none',
                      fontWeight: isActive ? 700 : 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isActive ? '▸ ' : '  '}{cat.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        <div>
          {tools.length === 0 ? (
            <div className="empty">
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', marginBottom: 6 }}>
                No matches found.
              </p>
              <p style={{ marginBottom: 14 }}>Try a different term or clear filters.</p>
              <Link href="/search" className="btn btn--ghost">Clear all filters</Link>
            </div>
          ) : (
            <>
              <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool, i) => (
                  <div key={tool.id} style={{ marginLeft: -1, marginTop: -1 }}>
                    <ToolCard tool={tool} index={i} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                    marginTop: 32,
                    fontFamily: 'var(--mono)',
                    fontSize: 'var(--fs-btn)',
                  }}
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/search?${q ? `q=${encodeURIComponent(q)}&` : ''}${category ? `category=${category}&` : ''}${pricing ? `pricing=${pricing}&` : ''}page=${p}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        border: '1px solid var(--rule)',
                        textDecoration: 'none',
                        background: p === page ? 'var(--ink)' : 'var(--paper)',
                        color: p === page ? 'var(--paper)' : 'var(--ink-light)',
                      }}
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

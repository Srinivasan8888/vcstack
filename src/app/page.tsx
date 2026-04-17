import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import CategoryCard from '@/components/cards/CategoryCard'
import NewsletterForm from '@/components/ui/NewsletterForm'
import ToolsDirectory from '@/app/(main)/tools/ToolsDirectory'
import FeaturedToolsCarousel from '@/components/ui/FeaturedToolsCarousel'
import { getCategories, getFeaturedTools, getCategoryPreviewTools, getAllTools } from '@/lib/data'
import type { Tool } from '@/lib/types'

export const revalidate = 3600

/* ─── Lead story — one featured tool, front-page hero ────────────────────── */
function LeadStory({ tool }: { tool: Tool }) {
  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 24,
        paddingBottom: 32,
        borderBottom: '3px double var(--ink)',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--red)',
            marginBottom: 12,
          }}
        >
          Lead Story · Tool of the Week
        </div>
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            lineHeight: 1.05,
            color: 'var(--ink)',
            marginBottom: 16,
            letterSpacing: '-0.01em',
          }}
        >
          {tool.name}: <em style={{ fontStyle: 'italic', fontWeight: 400 }}>{tool.shortDesc ?? tool.description.slice(0, 80)}</em>
        </h2>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '1.05rem',
            lineHeight: 1.55,
            color: 'var(--ink-light)',
            marginBottom: 20,
            maxWidth: 720,
          }}
        >
          {tool.description.slice(0, 360)}{tool.description.length > 360 ? '…' : ''}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href={`/product/${tool.slug}`} className="btn btn--primary">
            Read the full report →
          </Link>
          {tool.category && (
            <Link href={`/category/${tool.category.slug}`} className="btn btn--ghost">
              More in {tool.category.name}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

/* ─── Editor's pick — compact item for sidebar column ────────────────────── */
function PickItem({ tool, n }: { tool: Tool; n: number }) {
  return (
    <article
      style={{
        paddingBottom: 16,
        marginBottom: 16,
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 'var(--fs-tag)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--ink-muted)',
          marginBottom: 4,
        }}
      >
        No. {String(n).padStart(2, '0')} · {tool.category?.name ?? 'Tool'}
      </div>
      <Link
        href={`/product/${tool.slug}`}
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 700,
          fontSize: 'var(--fs-card)',
          lineHeight: 1.25,
          color: 'var(--ink)',
          textDecoration: 'none',
          display: 'block',
          marginBottom: 6,
        }}
      >
        {tool.name}
      </Link>
      <p
        style={{
          fontFamily: 'var(--body)',
          fontSize: 'var(--fs-body)',
          color: 'var(--ink-light)',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {tool.shortDesc ?? tool.description.slice(0, 140)}
      </p>
    </article>
  )
}

export default async function HomePage() {
  const [categories, featuredTools, previewToolsMap, allTools] = await Promise.all([
    getCategories(),
    getFeaturedTools(20),
    getCategoryPreviewTools(),
    getAllTools(),
  ])

  const [lead, ...picks] = featuredTools
  const sidePicks = picks.slice(0, 5)
  const carouselTools = picks.slice(5)

  return (
    <PageLayout>
      {/* ── Kicker ─────────────────────────────────────────────── */}
      <div className="page" style={{ padding: '20px 24px 0' }}>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--ink-muted)',
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 8,
            borderBottom: '1px solid var(--rule)',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span>The Front Page</span>
          <span>514 tools · 26 categories · 5 firms</span>
        </div>
      </div>

      {/* ── Lead story + Editor's picks split ───────────────────── */}
      <section className="page" style={{ padding: '32px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
          }}
          className="md:grid-cols-[1.6fr_1fr]"
        >
          {/* Lead column */}
          <div>
            {lead ? (
              <LeadStory tool={lead} />
            ) : (
              <div className="empty">No lead story yet. Check back soon.</div>
            )}

          </div>

          {/* Sidebar picks */}
          <aside>
            <div className="section-header">Editor’s Picks</div>
            {sidePicks.length > 0 ? (
              sidePicks.map((tool, i) => (
                <PickItem key={tool.id} tool={tool} n={i + 2} />
              ))
            ) : (
              <p style={{ color: 'var(--ink-muted)' }}>No picks yet.</p>
            )}
            <Link href="/stacks" className="btn btn--ghost w-full justify-center">
              See all stacks →
            </Link>
          </aside>
        </div>
      </section>

      {/* ── Tool Directory (OpenVC-style) ───────────────────────── */}
      <section className="page" style={{ padding: '0 24px 48px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '2px solid var(--ink)',
            paddingTop: 20,
            marginBottom: 20,
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 900,
                fontSize: 'var(--fs-hero)',
                color: 'var(--ink)',
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
              }}
            >
              The Tool Directory
            </h2>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--ink-muted)',
                fontStyle: 'italic',
                marginTop: 4,
              }}
            >
              Every tool on file — search, filter by section or pricing, open the full entry.
            </p>
          </div>
          <Link href="/tools" className="btn btn--ghost">Open full directory →</Link>
        </div>
        <ToolsDirectory tools={allTools} categories={categories} preview previewLimit={6} />
      </section>

      {/* ── Sections (categories) ───────────────────────────────── */}
      <section className="page" style={{ padding: '12px 24px 48px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '2px solid var(--ink)',
            paddingTop: 20,
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 900,
              fontSize: 'var(--fs-hero)',
              color: 'var(--ink)',
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
            }}
          >
            Sections of the Paper
          </h2>
          <Link href="/all-categories" className="btn btn--ghost">
            All categories →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0" style={{ gap: 0 }}>
          {categories.map((cat, i) => (
            <div key={cat.id} style={{ marginLeft: -1, marginTop: -1 }}>
              <CategoryCard
                category={cat}
                variant="default"
                previewTools={previewToolsMap[cat.slug] ?? []}
                index={i}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured tools carousel ─────────────────────────────── */}
      {carouselTools.length > 0 && (
        <section className="page" style={{ padding: '0 24px 48px' }}>
          <div style={{ borderTop: '2px solid var(--ink)', paddingTop: 20 }}>
            <FeaturedToolsCarousel tools={carouselTools} />
          </div>
        </section>
      )}

      {/* ── Newsletter / The Dispatch ───────────────────────────── */}
      <section className="page" style={{ padding: '0 24px 60px' }}>
        <div
          style={{
            border: '2px solid var(--ink)',
            padding: 32,
            display: 'grid',
            gap: 24,
          }}
          className="md:grid-cols-[1fr_auto]"
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 'var(--fs-tag)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--red)',
                marginBottom: 8,
              }}
            >
              The Dispatch · Bi-weekly edition
            </div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 900,
                fontSize: '1.8rem',
                color: 'var(--ink)',
                marginBottom: 8,
              }}
            >
              A reading list for the venture desk.
            </h3>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--ink-light)',
                maxWidth: 520,
              }}
            >
              One well-written edition every other Monday. Deep dives, new tools, reads of
              the week, and commentary from operators and GPs.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

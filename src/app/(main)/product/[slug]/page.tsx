import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getToolBySlug, getRelatedTools } from '@/lib/data'
import ToolCard from '@/components/cards/ToolCard'
import LogoCard from '@/components/ui/LogoCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolBySlug(slug)
  if (!tool) return {}
  return {
    title: tool.name,
    description: tool.shortDesc ?? tool.description.slice(0, 160),
  }
}

const PRICING_LABELS: Record<string, string> = {
  FREE: 'Free',
  FREEMIUM: 'Freemium',
  PAID: 'Paid',
  ENTERPRISE: 'Enterprise',
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: 'var(--red)', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
      {'★'.repeat(rating)}
      <span style={{ color: 'var(--rule)' }}>{'★'.repeat(5 - rating)}</span>
    </span>
  )
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)
  if (!tool) notFound()

  const relatedTools = await getRelatedTools(tool.id, tool.categoryId, 4)
  const approvedReviews = (tool.reviews ?? []).filter((r) => r.isApproved)
  const avgRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((s, r) => s + r.rating, 0) / approvedReviews.length
      : 0

  return (
    <div className="page" style={{ padding: '24px 24px 48px' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        {tool.category && (
          <>
            <Link href={`/category/${tool.category.slug}`}>{tool.category.name}</Link>
            <span className="sep">·</span>
          </>
        )}
        <span style={{ color: 'var(--ink)' }}>{tool.name}</span>
      </div>

      {/* ── Article header ────────────────────────────────────────── */}
      <header
        style={{
          borderTop: '2px solid var(--ink)',
          borderBottom: '1px solid var(--ink)',
          padding: '20px 0 24px',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--red)',
            marginBottom: 10,
          }}
        >
          {tool.category ? `Desk · ${tool.category.name}` : 'The Report'}
          {tool.isFeatured && ' · Featured'}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <LogoCard name={tool.name} logoUrl={tool.logoUrl} size="lg" style={{ position: 'relative' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 900,
                fontSize: 'var(--fs-name)',
                lineHeight: 1.1,
                color: 'var(--ink)',
                marginBottom: 8,
                letterSpacing: '-0.01em',
              }}
            >
              {tool.name}
            </h1>
            {tool.shortDesc && (
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '1.05rem',
                  color: 'var(--ink-light)',
                  fontStyle: 'italic',
                  maxWidth: 720,
                  lineHeight: 1.5,
                }}
              >
                {tool.shortDesc}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
          <span className="tag tag--accent">
            {PRICING_LABELS[tool.pricingModel] ?? tool.pricingModel}
          </span>
          {tool.tags?.map((tag) => (
            <span key={tag.id} className="tag">{tag.name}</span>
          ))}
        </div>
      </header>

      {/* ── Body + Sidebar ────────────────────────────────────────── */}
      <div style={{ display: 'grid', gap: 48 }} className="lg:grid-cols-[1fr_280px]">
        {/* Article body */}
        <div>
          <section style={{ marginBottom: 40 }}>
            <div className="section-header">The Report</div>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: '1rem',
                color: 'var(--ink)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {tool.description}
            </p>
          </section>

          <section style={{ marginBottom: 40 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid var(--rule)',
                paddingBottom: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 'var(--fs-tag)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--ink-muted)',
                }}
              >
                Letters to the Editor · {approvedReviews.length} review{approvedReviews.length !== 1 ? 's' : ''}
              </div>
              <Link href={`/review?tool=${tool.slug}`} className="btn btn--ghost">
                Write a review →
              </Link>
            </div>

            {approvedReviews.length === 0 ? (
              <div className="empty">
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', marginBottom: 6 }}>
                  No letters on file yet.
                </p>
                <Link href={`/review?tool=${tool.slug}`} className="btn btn--primary" style={{ marginTop: 10 }}>
                  Be the first to review
                </Link>
              </div>
            ) : (
              <div>
                {approvedReviews.map((review) => (
                  <article
                    key={review.id}
                    style={{
                      padding: '16px 0',
                      borderBottom: '1px solid var(--rule)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: 8,
                        gap: 12,
                      }}
                    >
                      <strong
                        style={{
                          fontFamily: 'var(--serif)',
                          fontWeight: 700,
                          color: 'var(--ink)',
                        }}
                      >
                        {review.user?.name ?? 'Anonymous'}
                      </strong>
                      <Stars rating={review.rating} />
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--body)',
                        fontSize: 'var(--fs-body)',
                        color: 'var(--ink-light)',
                        lineHeight: 1.55,
                      }}
                    >
                      {review.content}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 'var(--fs-tag)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-muted)',
                        marginTop: 6,
                      }}
                    >
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div
            style={{
              padding: 16,
              border: '1px solid var(--ink)',
              background: 'var(--paper-dark)',
              marginBottom: 24,
            }}
          >
            <div className="section-header">At a glance</div>
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary w-full justify-center"
              style={{ marginBottom: 16 }}
            >
              Visit {tool.name} ↗
            </a>
            <dl style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-body)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--rule)' }}>
                <dt style={{ color: 'var(--ink-muted)' }}>Pricing</dt>
                <dd style={{ color: 'var(--ink)', fontWeight: 600 }}>
                  {PRICING_LABELS[tool.pricingModel] ?? tool.pricingModel}
                </dd>
              </div>
              {tool.category && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--rule)' }}>
                  <dt style={{ color: 'var(--ink-muted)' }}>Category</dt>
                  <dd>
                    <Link
                      href={`/category/${tool.category.slug}`}
                      style={{ color: 'var(--ink)', fontWeight: 600 }}
                    >
                      {tool.category.name}
                    </Link>
                  </dd>
                </div>
              )}
              {approvedReviews.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--rule)', alignItems: 'center' }}>
                  <dt style={{ color: 'var(--ink-muted)' }}>Rating</dt>
                  <dd>
                    <Stars rating={Math.round(avgRating)} />
                    <span style={{ color: 'var(--ink-muted)', marginLeft: 6, fontSize: 'var(--fs-tag)' }}>
                      ({approvedReviews.length})
                    </span>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {relatedTools.length > 0 && (
            <div>
              <div className="section-header">Related</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

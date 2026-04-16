import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, ChevronRight, Star } from 'lucide-react'
import { getToolBySlug, getRelatedTools } from '@/lib/data'
import ToolCard from '@/components/cards/ToolCard'

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

const PRICING_CLASSES: Record<string, string> = {
  FREE: 'badge-free',
  FREEMIUM: 'badge-freemium',
  PAID: 'badge-paid',
  ENTERPRISE: 'badge-enterprise',
}

function ToolAvatar({ name, logoUrl }: { name: string; logoUrl?: string | null }) {
  if (logoUrl) {
    return <img src={logoUrl} alt={name} className="h-16 w-16 rounded-xl object-contain bg-secondary p-2" />
  }
  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const hue = (name.charCodeAt(0) * 47 + name.charCodeAt(1 % name.length) * 31) % 360
  return (
    <div
      className="h-16 w-16 rounded-xl flex items-center justify-center text-xl font-bold text-white"
      style={{ background: `oklch(0.45 0.20 ${hue})` }}
    >
      {initials}
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        {tool.category && (
          <>
            <Link href={`/category/${tool.category.slug}`} className="hover:text-foreground transition-colors">
              {tool.category.name}
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tool header */}
          <div className="flex items-start gap-5">
            <ToolAvatar name={tool.name} logoUrl={tool.logoUrl} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-foreground">{tool.name}</h1>
                {tool.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary ring-1 ring-primary/30">
                    <Star className="h-3 w-3 fill-current" /> Featured
                  </span>
                )}
              </div>
              {tool.shortDesc && (
                <p className="text-muted-foreground mb-3">{tool.shortDesc}</p>
              )}
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${PRICING_CLASSES[tool.pricingModel] ?? 'badge-paid'}`}>
                  {PRICING_LABELS[tool.pricingModel] ?? tool.pricingModel}
                </span>
                {tool.tags?.map((tag) => (
                  <span key={tag.id} className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshot */}
          {tool.screenshotUrl && (
            <section>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <img
                  src={tool.screenshotUrl}
                  alt={`${tool.name} screenshot`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </section>
          )}

          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">About {tool.name}</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {tool.description}
              </p>
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Reviews
                {approvedReviews.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({approvedReviews.length})
                  </span>
                )}
              </h2>
              <Link
                href={`/review?tool=${tool.slug}`}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Write a review →
              </Link>
            </div>

            {approvedReviews.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground text-sm mb-3">No reviews yet.</p>
                <Link
                  href={`/review?tool=${tool.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Be the first to review
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {approvedReviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                          {(review.user?.name ?? review.user?.email ?? 'U')[0].toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {review.user?.name ?? 'Anonymous'}
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside className="space-y-6">
          {/* Visit / CTA */}
          <div className="rounded-xl border border-border bg-card p-5">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors mb-4"
            >
              Visit {tool.name}
              <ExternalLink className="h-4 w-4" />
            </a>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pricing</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${PRICING_CLASSES[tool.pricingModel] ?? 'badge-paid'}`}>
                  {PRICING_LABELS[tool.pricingModel] ?? tool.pricingModel}
                </span>
              </div>
              {tool.category && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Link href={`/category/${tool.category.slug}`} className="text-primary hover:text-primary/80 transition-colors text-xs">
                    {tool.category.name}
                  </Link>
                </div>
              )}
              {approvedReviews.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={Math.round(avgRating)} />
                    <span className="text-xs text-muted-foreground">({approvedReviews.length})</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Related Tools</h3>
              <div className="space-y-2">
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

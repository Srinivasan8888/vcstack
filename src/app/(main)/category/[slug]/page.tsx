import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getCategoryBySlug, getToolsByCategory, getCategories } from '@/lib/data'
import ToolCard from '@/components/cards/ToolCard'
import PricingFilter from '@/components/filters/PricingFilter'
import type { PricingModel } from '@/lib/types'

/* ── Category banner colours (same palette as CategoryCard) ── */
const CATEGORY_COLORS: Record<string, string> = {
  'deal-sourcing':                        '#F4C553',
  'crm':                                  '#F4C553',
  'portfolio-management':                 '#8AB899',
  'fund-admin-software':                  '#F4C553',
  'lp-tools':                             '#A9A4D4',
  'data-room':                            '#F4C553',
  'data':                                 '#7FAECC',
  'captable-equity-management':           '#F4C553',
  'research':                             '#7FAECC',
  'video-conferencing':                   '#8AB899',
  'fund-modeling-portfolio-forecasting':  '#8AB899',
  'project-management':                   '#A9A4D4',
  'email':                                '#F4C553',
  'platform':                             '#F4C553',
  'esg':                                  '#A9A4D4',
  'hiring-payroll':                       '#D9897A',
  'infrastructure':                       '#F4C553',
  'insurance':                            '#8AB899',
  'job-board-talent-pool':               '#A9A4D4',
  'liquidity-instruments':               '#F4C553',
  'newsletter-tools':                    '#F4C553',
  'news-resources':                      '#D9897A',
  'community':                           '#A9A4D4',
  'calendar':                            '#8AB899',
  'other-tools':                         '#F4C553',
  'website':                             '#8AB899',
}

/* Chip positions for the banner — fanned across the right side */
const BANNER_CHIP_POSITIONS = [
  { top: '18%', right: '8%',  rotate: '-6deg' },
  { top: '12%', right: '28%', rotate:  '5deg' },
  { top: '50%', right: '15%', rotate:  '3deg' },
  { top: '45%', right: '35%', rotate: '-4deg' },
  { top: '68%', right: '5%',  rotate:  '7deg' },
]

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ pricing?: string; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return {}
  return {
    title: category.name,
    description: category.description ?? `Browse ${category.name} tools for VC firms.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((c) => ({ slug: c.slug }))
}

export const revalidate = 3600

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { pricing, page: pageStr } = await searchParams
  const page = Number(pageStr ?? 1)

  const [category, result] = await Promise.all([
    getCategoryBySlug(slug),
    getToolsByCategory(slug, {
      pricing: (pricing as PricingModel) || undefined,
      page,
      pageSize: 24,
    }),
  ])

  if (!category) notFound()

  const { data: tools, total, totalPages } = result
  const bgColor = CATEGORY_COLORS[slug] ?? '#F4C553'

  /* Pick up to 5 tools with logos for the banner chips */
  const bannerTools = tools
    .filter((t) => t.logoUrl)
    .slice(0, 5)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/all-categories" className="hover:text-foreground transition-colors">Categories</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* ── Coloured banner ─────────────────────────────────────────────── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden mb-8"
        style={{ backgroundColor: bgColor, minHeight: 160 }}
      >
        {/* Decorative soft circles */}
        <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/15" />
        <div className="absolute -top-10 -left-10 h-36 w-36 rounded-full bg-white/10" />
        <div className="absolute top-6 left-6 h-20 w-20 rounded-full bg-white/10" />

        {/* Category info — bottom-left */}
        <div className="absolute bottom-5 left-6 flex items-center gap-3">
          {category.icon && (
            <span className="text-3xl">{category.icon}</span>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-sm text-gray-800/70 font-medium">{total} tools</p>
          </div>
        </div>

        {/* Floating tool logo chips — right side */}
        {bannerTools.map((tool, i) => {
          const pos = BANNER_CHIP_POSITIONS[i]
          if (!pos) return null
          const initials = tool.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
          const hue = (tool.name.charCodeAt(0) * 53 + (tool.name.charCodeAt(1) ?? 0) * 37) % 360
          return (
            <div
              key={tool.id}
              className="absolute flex items-center gap-1.5 bg-white rounded-lg shadow-md px-2 py-1.5 pointer-events-none select-none"
              style={{ top: pos.top, right: pos.right, rotate: pos.rotate, zIndex: 10 }}
            >
              {tool.logoUrl ? (
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  className="h-6 w-6 rounded object-contain shrink-0"
                />
              ) : (
                <span
                  className="h-6 w-6 rounded flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                  style={{ background: `oklch(0.50 0.20 ${hue})` }}
                >
                  {initials}
                </span>
              )}
              <span className="text-[11px] font-semibold text-gray-700 leading-tight truncate max-w-[80px]">
                {tool.name}
              </span>
            </div>
          )
        })}
      </div>

      {/* Description below banner */}
      {category.description && (
        <p className="text-muted-foreground mb-8 max-w-2xl">{category.description}</p>
      )}

      {/* Subcategory tabs */}
      {category.subCategories && category.subCategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <Link
            href={`/category/${slug}`}
            className="shrink-0 rounded-full border border-primary bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary"
          >
            All
          </Link>
          {category.subCategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/category/${slug}?sub=${sub.slug}`}
              className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* Filters + Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-56 shrink-0">
          <PricingFilter currentPricing={pricing} basePath={`/category/${slug}`} />
        </aside>

        {/* Tools grid */}
        <div className="flex-1">
          {tools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-foreground font-medium mb-1">No tools found</p>
              <p className="text-sm text-muted-foreground">Try removing filters</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/category/${slug}?page=${p}${pricing ? `&pricing=${pricing}` : ''}`}
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

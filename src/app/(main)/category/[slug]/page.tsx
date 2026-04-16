import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getCategoryBySlug, getToolsByCategory, getCategories } from '@/lib/data'
import ToolCard from '@/components/cards/ToolCard'
import PricingFilter from '@/components/filters/PricingFilter'
import type { PricingModel } from '@/lib/types'

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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/all-categories" className="hover:text-foreground transition-colors">Categories</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Category banner image */}
      {category.imageUrl && (
        <div className="relative h-48 md:h-56 w-full rounded-2xl overflow-hidden mb-8">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-5 left-6 flex items-center gap-3">
            {category.icon && (
              <span className="text-3xl drop-shadow-md">{category.icon}</span>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-md">{category.name}</h1>
              <p className="text-sm text-white/80 font-medium">{total} tools</p>
            </div>
          </div>
        </div>
      )}

      {/* Category header (fallback when no image) */}
      {!category.imageUrl && (
        <div className="flex items-start gap-4 mb-8">
          {category.icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-2xl shrink-0">
              {category.icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
            {category.description && (
              <p className="text-muted-foreground mt-1 max-w-2xl">{category.description}</p>
            )}
            <p className="text-sm text-primary mt-2 font-medium">{total} tools</p>
          </div>
        </div>
      )}

      {/* Category description (below banner) */}
      {category.imageUrl && category.description && (
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

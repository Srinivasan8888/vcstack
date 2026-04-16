import type { Metadata } from 'next'
import { getCategories } from '@/lib/data'
import CategoryCard from '@/components/cards/CategoryCard'

export const metadata: Metadata = {
  title: 'All Categories',
  description: 'Browse all VC tool categories — from deal sourcing to fund administration.',
}

export const revalidate = 3600

export default async function AllCategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Categories</h1>
        <p className="text-muted-foreground">
          {categories.length} categories covering the full VC operations stack
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  )
}

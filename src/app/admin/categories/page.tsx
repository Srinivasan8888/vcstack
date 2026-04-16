import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { getCategories } from '@/lib/data'

export const metadata: Metadata = { title: 'Categories' }

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{categories.length} total</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Category
        </Link>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border">
            <tr>
              {['Icon', 'Name', 'Slug', 'Tools', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 text-xl">{cat.icon ?? '—'}</td>
                <td className="px-4 py-3 font-medium text-foreground">{cat.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{cat.slug}</td>
                <td className="px-4 py-3 text-muted-foreground">{cat._count?.tools ?? 0}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/categories/${cat.id}/edit`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

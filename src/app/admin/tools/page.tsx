import type { Metadata } from 'next'
import Link from 'next/link'
import { searchTools } from '@/lib/data'
import { ExternalLink, Plus, Pencil } from 'lucide-react'

export const metadata: Metadata = { title: 'Tools' }

const PRICING_LABELS: Record<string, string> = { FREE: 'Free', FREEMIUM: 'Freemium', PAID: 'Paid', ENTERPRISE: 'Enterprise' }
const PRICING_CLASSES: Record<string, string> = { FREE: 'badge-free', FREEMIUM: 'badge-freemium', PAID: 'badge-paid', ENTERPRISE: 'badge-enterprise' }

interface Props { searchParams: Promise<{ page?: string; q?: string }> }

export default async function AdminToolsPage({ searchParams }: Props) {
  const { page: ps, q = '' } = await searchParams
  const page = Number(ps ?? 1)
  const { data: tools, total, totalPages } = await searchTools({ query: q, page, pageSize: 20 })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tools</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{total} total</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Tool
        </Link>
      </div>

      {/* Search */}
      <form className="mb-4">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search tools…"
          className="w-full max-w-sm rounded-lg border border-border bg-secondary px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </form>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border">
            <tr>
              {['Name', 'Category', 'Pricing', 'Featured', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {tools.map((tool) => (
              <tr key={tool.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">
                  <Link href={`/product/${tool.slug}`} className="hover:text-primary transition-colors flex items-center gap-1">
                    {tool.name}
                    <ExternalLink className="h-3 w-3 opacity-40" />
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{tool.category?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${PRICING_CLASSES[tool.pricingModel] ?? 'badge-paid'}`}>
                    {PRICING_LABELS[tool.pricingModel]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${tool.isFeatured ? 'text-primary' : 'text-muted-foreground'}`}>
                    {tool.isFeatured ? '★ Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/tools/${tool.id}/edit`}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/tools?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              className={`h-8 w-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                p === page ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-secondary'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

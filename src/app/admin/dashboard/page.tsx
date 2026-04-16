import type { Metadata } from 'next'
import { Layers, FolderOpen, ClipboardList, Star } from 'lucide-react'
import { getSiteStats } from '@/lib/data'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboardPage() {
  const stats = await getSiteStats()

  const cards = [
    { label: 'Total Tools',          value: stats.toolCount,        icon: Layers,        color: 'text-purple-400',  bg: 'bg-purple-500/10',  ring: 'ring-purple-500/20' },
    { label: 'Categories',           value: stats.categoryCount,    icon: FolderOpen,    color: 'text-blue-400',    bg: 'bg-blue-500/10',    ring: 'ring-blue-500/20' },
    { label: 'Pending Submissions',  value: stats.submissionCount,  icon: ClipboardList, color: 'text-amber-400',   bg: 'bg-amber-500/10',   ring: 'ring-amber-500/20' },
    { label: 'Approved Reviews',     value: stats.reviewCount,      icon: Star,          color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/20' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your VCStack directory</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color, bg, ring }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{label}</p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg} ring-1 ${ring}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Review Submissions', desc: `${stats.submissionCount} pending approval`, href: '/admin/submissions', cta: 'Review now →' },
          { title: 'Add New Tool',       desc: 'Manually add a tool to the directory',       href: '/admin/tools/new',   cta: 'Add tool →' },
          { title: 'Add Category',       desc: 'Create a new tool category',                 href: '/admin/categories/new', cta: 'Add category →' },
        ].map(({ title, desc, href, cta }) => (
          <a
            key={href}
            href={href}
            className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all"
          >
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground mb-3">{desc}</p>
            <p className="text-xs text-primary font-medium">{cta}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

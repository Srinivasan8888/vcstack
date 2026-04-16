'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/types'

/* Deterministic gradient per category slug */
const SLUG_GRADIENTS: Record<string, string> = {
  'deal-sourcing':                       'from-violet-500 to-purple-700',
  'crm':                                 'from-blue-500 to-indigo-700',
  'portfolio-management':                'from-emerald-500 to-teal-700',
  'fund-admin-software':                 'from-amber-500 to-orange-600',
  'lp-tools':                            'from-sky-500 to-cyan-700',
  'data-room':                           'from-slate-500 to-gray-700',
  'data':                                'from-yellow-500 to-amber-600',
  'captable-equity-management':          'from-purple-500 to-violet-700',
  'research':                            'from-fuchsia-500 to-purple-700',
  'video-conferencing':                  'from-red-400 to-rose-600',
  'fund-modeling-portfolio-forecasting': 'from-amber-400 to-yellow-600',
  'project-management':                  'from-indigo-500 to-blue-700',
  'email':                               'from-cyan-500 to-sky-700',
  'platform':                            'from-orange-500 to-red-600',
  'esg':                                 'from-green-500 to-emerald-700',
  'hiring-payroll':                      'from-lime-500 to-green-700',
  'infrastructure':                      'from-zinc-500 to-slate-700',
  'insurance':                           'from-teal-500 to-green-700',
  'job-board-talent-pool':               'from-blue-400 to-indigo-600',
  'liquidity-instruments':               'from-rose-500 to-pink-700',
  'newsletter-tools':                    'from-orange-400 to-amber-600',
  'news-resources':                      'from-red-500 to-orange-700',
  'community':                           'from-violet-400 to-fuchsia-600',
  'calendar':                            'from-sky-400 to-blue-600',
  'other-tools':                         'from-gray-500 to-zinc-700',
  'website':                             'from-pink-400 to-rose-600',
}

function gradientFor(slug: string) {
  return SLUG_GRADIENTS[slug] ?? 'from-primary/60 to-primary'
}

interface CategoryCardProps {
  category: Category
  variant?: 'default' | 'compact'
}

export default function CategoryCard({ category, variant = 'default' }: CategoryCardProps) {
  const toolCount = category._count?.tools ?? 0
  const gradient = gradientFor(category.slug)

  if (variant === 'compact') {
    return (
      <Link
        href={`/category/${category.slug}`}
        className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:border-primary/40 hover:bg-secondary transition-all group"
      >
        {category.icon && (
          <span className="text-xl shrink-0">{category.icon}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {category.name}
          </p>
          <p className="text-xs text-muted-foreground">{toolCount} tools</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
      </Link>
    )
  }

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-white overflow-hidden card-hover"
    >
      {/* Header: gradient always visible as background; CDN image overlaid if available */}
      <div className={`relative h-40 w-full overflow-hidden bg-linear-to-br ${gradient} flex items-end p-4`}>
        {/* Decorative circles */}
        <div className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-white/10" />
        <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-white/10" />

        {/* CDN image overlaid — gradient shows if this fails to load */}
        {category.imageUrl && (
          <img
            src={category.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        )}

        {/* Overlay so text is legible on both gradient and photo */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

        {/* Icon */}
        <span className="relative z-10 text-4xl drop-shadow-md">
          {category.icon ?? '🔧'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-foreground mb-1.5 leading-snug">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  )
}

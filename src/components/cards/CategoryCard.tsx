'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/types'

export interface PreviewTool {
  name: string
  logoUrl?: string | null
}

/* ── Flat background colours per category (matches real vcstack.io palette) ── */
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

/* Chip positions — fanned from center-left to upper-right */
const CHIP_PLACEMENTS = [
  { top: '10%',  left: '32%',  rotate: '-8deg'  },
  { top: '38%',  left: '50%',  rotate:  '4deg'  },
  { top: '56%',  left: '30%',  rotate: '-2deg'  },
  { top: '20%',  left: '60%',  rotate:  '9deg'  },
]

/* Single floating chip */
function LogoChip({ tool, placement }: {
  tool: PreviewTool
  placement: typeof CHIP_PLACEMENTS[number]
}) {
  const initials = tool.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const hue = (tool.name.charCodeAt(0) * 53 + (tool.name.charCodeAt(1) ?? 0) * 37) % 360

  return (
    <div
      className="absolute flex items-center gap-1.5 bg-white rounded-lg shadow-md px-2 py-1.5 max-w-[108px] pointer-events-none select-none"
      style={{ top: placement.top, left: placement.left, rotate: placement.rotate, zIndex: 10 }}
    >
      {tool.logoUrl ? (
        <img
          src={tool.logoUrl}
          alt={tool.name}
          className="h-5 w-5 rounded object-contain shrink-0"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      ) : (
        <span
          className="h-5 w-5 rounded flex items-center justify-center text-[8px] font-bold text-white shrink-0"
          style={{ background: `oklch(0.50 0.20 ${hue})` }}
        >
          {initials}
        </span>
      )}
      <span className="text-[10px] font-semibold text-gray-700 leading-tight truncate">
        {tool.name}
      </span>
    </div>
  )
}

interface CategoryCardProps {
  category: Category
  previewTools?: PreviewTool[]
  variant?: 'default' | 'compact'
}

export default function CategoryCard({
  category,
  previewTools = [],
  variant = 'default',
}: CategoryCardProps) {
  const toolCount = category._count?.tools ?? 0
  const bgColor = CATEGORY_COLORS[category.slug] ?? '#F4C553'

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

  const chips = previewTools.slice(0, 4)

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-white overflow-hidden card-hover"
    >
      {/* Header: solid colour + floating logo chips */}
      <div
        className="relative h-40 w-full overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Decorative soft circles */}
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/15" />
        <div className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-white/10" />
        <div className="absolute top-4 left-4 h-16 w-16 rounded-full bg-white/10" />

        {/* Floating tool chips */}
        {chips.map((tool, i) => (
          <LogoChip key={tool.name} tool={tool} placement={CHIP_PLACEMENTS[i]} />
        ))}
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

import Link from 'next/link'
import { ExternalLink, Star } from 'lucide-react'
import type { Tool } from '@/lib/types'

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

function ToolLogo({ name, logoUrl }: { name: string; logoUrl?: string | null }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="h-10 w-10 rounded-lg object-contain bg-secondary p-1"
      />
    )
  }
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const hue = (name.charCodeAt(0) * 47 + name.charCodeAt(1 % name.length) * 31) % 360
  return (
    <div
      className="h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
      style={{ background: `oklch(0.45 0.20 ${hue})` }}
    >
      {initials}
    </div>
  )
}

interface ToolCardProps {
  tool: Tool
  variant?: 'default' | 'compact'
}

export default function ToolCard({ tool, variant = 'default' }: ToolCardProps) {
  const reviewCount = tool._count?.reviews ?? tool.reviews?.length ?? 0

  if (variant === 'compact') {
    return (
      <Link
        href={`/product/${tool.slug}`}
        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-secondary transition-all group"
      >
        <ToolLogo name={tool.name} logoUrl={tool.logoUrl} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {tool.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">{tool.shortDesc ?? ''}</p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
            PRICING_CLASSES[tool.pricingModel] ?? 'badge-paid'
          }`}
        >
          {PRICING_LABELS[tool.pricingModel] ?? tool.pricingModel}
        </span>
      </Link>
    )
  }

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-5 card-hover transition-all">
      {/* Full-card clickable overlay */}
      <Link
        href={`/product/${tool.slug}`}
        className="absolute inset-0 rounded-xl"
        aria-label={tool.name}
      />

      {/* Featured badge */}
      {tool.isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary ring-1 ring-primary/30">
            <Star className="h-2.5 w-2.5 fill-current" />
            Featured
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <ToolLogo name={tool.name} logoUrl={tool.logoUrl} />
        <div className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {tool.name}
          </span>
          {tool.category && (
            <Link
              href={`/category/${tool.category.slug}`}
              className="relative z-10 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {tool.category.name}
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4">
        {tool.shortDesc ?? tool.description.slice(0, 100)}
      </p>

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            PRICING_CLASSES[tool.pricingModel] ?? 'badge-paid'
          }`}
        >
          {PRICING_LABELS[tool.pricingModel] ?? tool.pricingModel}
        </span>

        <div className="flex items-center gap-2">
          {reviewCount > 0 && (
            <span className="text-[11px] text-muted-foreground">
              {reviewCount} review{reviewCount !== 1 ? 's' : ''}
            </span>
          )}
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${tool.name}`}
            className="relative z-10 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

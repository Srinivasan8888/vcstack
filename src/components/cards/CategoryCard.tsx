'use client'

import Link from 'next/link'
import type { Category } from '@/lib/types'

export interface PreviewTool {
  name: string
  logoUrl?: string | null
}

interface CategoryCardProps {
  category: Category
  previewTools?: PreviewTool[]
  variant?: 'default' | 'compact'
  /** Display index — shows as a newspaper-style section number */
  index?: number
}

export default function CategoryCard({
  category,
  previewTools = [],
  variant = 'default',
  index,
}: CategoryCardProps) {
  const toolCount = category._count?.tools ?? 0
  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null

  if (variant === 'compact') {
    return (
      <Link
        href={`/category/${category.slug}`}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 12,
          padding: '12px 0',
          borderBottom: '1px solid var(--rule)',
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'var(--fs-card)',
            fontWeight: 700,
            color: 'var(--ink)',
          }}
        >
          {category.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            color: 'var(--ink-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {toolCount} tools →
        </span>
      </Link>
    )
  }

  const chips = previewTools.slice(0, 4)

  return (
    <Link
      href={`/category/${category.slug}`}
      style={{
        display: 'block',
        background: 'var(--paper)',
        border: '1px solid var(--rule)',
        padding: 20,
        textDecoration: 'none',
        transition: 'all var(--dur-fast)',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ink)'
        e.currentTarget.style.background = 'var(--paper-dark)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--rule)'
        e.currentTarget.style.background = 'var(--paper)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
          fontFamily: 'var(--mono)',
          fontSize: 'var(--fs-tag)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--ink-muted)',
        }}
      >
        <span>{num ? `No. ${num}` : 'Section'}</span>
        <span>{toolCount} tools</span>
      </div>

      <h3
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'var(--fs-hero)',
          fontWeight: 700,
          color: 'var(--ink)',
          lineHeight: 1.15,
          marginBottom: 8,
        }}
      >
        {category.name}
      </h3>

      {category.description && (
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--ink-light)',
            lineHeight: 1.5,
            marginBottom: 14,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {category.description}
        </p>
      )}

      {chips.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            paddingTop: 12,
            borderTop: '1px solid var(--rule)',
          }}
        >
          {chips.map((t) => (
            <span
              key={t.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: 'var(--mono)',
                fontSize: 'var(--fs-tag)',
                color: 'var(--ink-muted)',
                padding: '2px 6px',
                border: '1px solid var(--rule)',
                background: 'var(--paper)',
              }}
            >
              {t.logoUrl && (
                <img
                  src={t.logoUrl}
                  alt=""
                  style={{ width: 12, height: 12, objectFit: 'contain' }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
              {t.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

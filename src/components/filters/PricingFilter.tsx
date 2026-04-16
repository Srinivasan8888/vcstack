'use client'

import Link from 'next/link'

const PRICING_OPTIONS = [
  { value: '', label: 'All Pricing' },
  { value: 'FREE', label: 'Free' },
  { value: 'FREEMIUM', label: 'Freemium' },
  { value: 'PAID', label: 'Paid' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
]

interface PricingFilterProps {
  currentPricing?: string
  basePath: string
}

export default function PricingFilter({ currentPricing, basePath }: PricingFilterProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Pricing
      </h3>
      <div className="flex flex-col gap-1">
        {PRICING_OPTIONS.map(({ value, label }) => {
          const isActive = (currentPricing ?? '') === value
          const href = value ? `${basePath}?pricing=${value}` : basePath
          return (
            <Link
              key={value}
              href={href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

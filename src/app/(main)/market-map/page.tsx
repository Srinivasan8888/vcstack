import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Download } from 'lucide-react'
import { MARKET_MAP } from '@/lib/resources-data'

export const metadata: Metadata = {
  title: 'VC Tool Stack Market Map',
  description: MARKET_MAP.description,
}

export default function MarketMapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Market Map</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">{MARKET_MAP.title}</h1>
        <p className="text-muted-foreground max-w-2xl mb-6">{MARKET_MAP.description}</p>
        <a
          href={MARKET_MAP.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        <img
          src={MARKET_MAP.image}
          alt={MARKET_MAP.title}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

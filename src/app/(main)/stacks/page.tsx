import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { FIRMS } from '@/lib/resources-data'

export const metadata: Metadata = {
  title: 'VC Stacks — See What Tools Top VCs Use',
  description:
    'Explore the software stacks used by leading venture capital firms like Weekend Fund, Point Nine, Hustle Fund and more.',
}

export default function StacksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">VC Stacks</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">VC Stacks</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore the software stacks used by leading venture capital firms.
          See which tools they rely on for deal sourcing, CRM, portfolio management, and more.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FIRMS.map((firm) => (
          <Link
            key={firm.slug}
            href={`/firms/${firm.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden card-hover"
          >
            <div className="relative h-44 bg-slate-50 flex items-center justify-center p-8">
              <img src={firm.logo} alt={firm.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {firm.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">{firm.location}</p>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {firm.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5">
                <span className="text-sm font-medium text-brand">{firm.tools.length} tools</span>
                <span className="text-xs text-muted-foreground">in their stack</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

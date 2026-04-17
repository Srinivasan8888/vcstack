import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import NewsletterForm from '@/components/ui/NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter — VC Stack',
  description:
    'Subscribe to the VC Stack newsletter for bi-weekly deep dives, reads-of-the-week, resources and tools.',
}

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Newsletter</span>
      </nav>

      <div className="max-w-xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          VC Stack Newsletter
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Subscribe to our bi-weekly newsletter to receive a deep dive,
          reads-of-the-week, resources and tools curated for the venture
          capital community.
        </p>
        <div className="max-w-sm mx-auto">
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}

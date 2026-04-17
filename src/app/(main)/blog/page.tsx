import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — VC Stack',
  description: 'Insights, guides and news for the venture capital community.',
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Blog</span>
      </nav>

      <div className="max-w-xl mx-auto text-center py-24">
        <h1 className="text-3xl font-bold text-foreground mb-4">Blog</h1>
        <p className="text-muted-foreground leading-relaxed">
          Coming soon — insights, guides, and news for the venture capital
          community.
        </p>
      </div>
    </div>
  )
}

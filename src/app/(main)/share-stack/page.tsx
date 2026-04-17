import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Share Your Stack — VC Stack',
  description:
    'Share the tools your VC firm uses and help the community discover great software.',
}

export default function ShareStackPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Share Your Stack</span>
      </nav>

      <div className="max-w-xl mx-auto text-center py-24">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Share Your Stack
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          The community would love to see and hear about the tools you are
          using in your venture firm. Share your stack and help others find
          the right tools.
        </p>
        <a
          href="mailto:hello@vcstack.io?subject=Sharing our VC Stack"
          className="btn-primary"
        >
          Get in touch
        </a>
      </div>
    </div>
  )
}

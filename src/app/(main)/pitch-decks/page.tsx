import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { PITCH_DECKS } from '@/lib/resources-data'

export const metadata: Metadata = {
  title: 'VC Pitch Decks — Real Fund Pitch Decks',
  description:
    'Browse real pitch decks used by VC funds to raise capital. Learn from Shrug Capital, Seedcamp, Not Boring Capital and more.',
}

export default function PitchDecksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Pitch Decks</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">VC Pitch Decks</h1>
        <p className="text-muted-foreground max-w-2xl">
          Browse real pitch decks used by venture capital funds to raise capital.
          Learn from the best and get inspired for your own fund raise.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PITCH_DECKS.map((deck, i) => (
          <a
            key={`${deck.title}-${i}`}
            href={deck.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden card-hover"
          >
            <div className="relative h-44 bg-slate-50 flex items-center justify-center p-6">
              <img src={deck.image} alt={deck.title} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                {deck.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {deck.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                View deck <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

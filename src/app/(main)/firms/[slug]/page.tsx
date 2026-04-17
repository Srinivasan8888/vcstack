import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ExternalLink, MapPin } from 'lucide-react'
import { FIRMS } from '@/lib/resources-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return FIRMS.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const firm = FIRMS.find((f) => f.slug === slug)
  if (!firm) return {}
  return {
    title: `${firm.name} Stack — VC Stack`,
    description: `See the ${firm.tools.length} tools ${firm.name} uses: ${firm.tools.map((t) => t.name).join(', ')}.`,
  }
}

export default async function FirmPage({ params }: Props) {
  const { slug } = await params
  const firm = FIRMS.find((f) => f.slug === slug)
  if (!firm) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stacks" className="hover:text-foreground transition-colors">VC Stacks</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{firm.name}</span>
      </nav>

      {/* Firm header */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
        <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-border flex items-center justify-center p-3 shrink-0">
          <img src={firm.logo} alt={firm.name} className="max-h-full max-w-full object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">{firm.name}</h1>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            {firm.location}
          </div>
          <p className="text-muted-foreground max-w-xl mb-4">{firm.description}</p>
          <div className="flex items-center gap-3">
            <a
              href={firm.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Visit Website
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {firm.twitter && (
              <a href={firm.twitter} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                Twitter
              </a>
            )}
            {firm.linkedin && (
              <a href={firm.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <h2 className="text-lg font-bold text-foreground mb-5">
        Their Stack ({firm.tools.length} tools)
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {firm.tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.link}
            className="group flex items-center gap-4 rounded-xl border border-border bg-white p-4 card-hover"
          >
            <img
              src={tool.logo}
              alt={tool.name}
              className="h-12 w-12 rounded-lg object-contain bg-slate-50 p-1 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {tool.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">{tool.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

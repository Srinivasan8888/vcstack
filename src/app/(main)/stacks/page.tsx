import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VC Stacks — See What Tools Top VCs Use',
  description:
    'Explore the software stacks used by leading venture capital firms like Weekend Fund, Point Nine, Hustle Fund and more.',
}

const STACKS = [
  {
    title: 'Weekend Fund',
    description:
      'An early-stage fund from the founder of Product Hunt Ryan Hoover',
    link: '/firms/weekend-fund',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/62037938a59d8a56833c7917_weekend-fund.png',
  },
  {
    title: 'Point Nine',
    description:
      "We're an early-stage venture capital fund focused on backing seed-stage B2B SaaS and B2B marketplace entrepreneurs anywhere in the world.",
    link: '/firms/point-nine',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/62037cc7ca7fbd32e5bb4804_point-nine%201.svg',
  },
  {
    title: 'COCOA',
    description: 'Prev VC, now angels \ud83d\ude07',
    link: '/firms/cocoa',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/6346715a4f11843a9a9afa81_cocoa.jpg',
  },
  {
    title: 'Hustle Fund',
    description: 'Great hustlers look like anyone and come from anywhere. \ud83d\udc9b',
    link: '/firms/hustle-fund',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/63f761cd41d6554c29ae42f0_hustle-fund.jpeg',
  },
  {
    title: 'Angel School',
    description:
      'We help Angel investors build, run and scale their own syndicates',
    link: '/firms/angel-school',
    image:
      'https://cdn.prod.website-files.com/61fe68951d6778064dfa4241/641d820672db5f969fc2f9f9_angelschool.svg',
  },
]

export default function StacksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">VC Stacks</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">VC Stacks</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore the software stacks used by leading venture capital firms.
          See which tools they rely on for deal sourcing, CRM, portfolio
          management, and more.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STACKS.map((stack) => (
          <Link
            key={stack.title}
            href={stack.link}
            className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden card-hover"
          >
            {/* Image */}
            <div className="relative h-44 bg-slate-100 flex items-center justify-center p-6">
              <img
                src={stack.image}
                alt={stack.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                {stack.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {stack.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                View stack
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

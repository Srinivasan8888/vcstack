import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, Monitor, Share2 } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import CategoryCard from '@/components/cards/CategoryCard'
import SearchBox from '@/components/ui/SearchBox'
import NewsletterForm from '@/components/ui/NewsletterForm'
import { getCategories, getFeaturedTools } from '@/lib/data'
import type { Tool } from '@/lib/types'

export const revalidate = 3600

/* ─── Floating logo bubble ───────────────────────────────────────────────── */
function LogoBubble({
  initials, color, size = 'md', style,
}: {
  initials: string; color: string; size?: 'sm' | 'md' | 'lg'; style?: CSSProperties
}) {
  const sz = size === 'lg' ? 'h-14 w-14 text-base' : size === 'sm' ? 'h-9 w-9 text-[10px]' : 'h-12 w-12 text-xs'
  return (
    <div
      className={`absolute ${sz} rounded-full shadow-md flex items-center justify-center font-bold text-white border-2 border-white`}
      style={{ background: color, ...style }}
    >
      {initials}
    </div>
  )
}

/* ─── "Our Favorites" card ───────────────────────────────────────────────── */
function FavoriteCard({ tool, categoryLabel }: { tool: Tool; categoryLabel: string }) {
  const hue = (tool.name.charCodeAt(0) * 53 + (tool.name.charCodeAt(1) || 0) * 37) % 360
  const initials = tool.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-border overflow-hidden">
      {/* Category badge */}
      <div className="px-5 pt-5 pb-3">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <ArrowRight className="h-3 w-3" />
          {categoryLabel}
        </span>
      </div>

      {/* Screenshot area */}
      <div className="mx-5 rounded-xl overflow-hidden border border-border h-48 relative bg-secondary flex-shrink-0">
        {tool.screenshotUrl ? (
          <>
            <img
              src={tool.screenshotUrl}
              alt={`${tool.name} screenshot`}
              className="h-full w-full object-cover object-top"
            />
            {/* Logo pill overlay */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-lg px-2 py-1 shadow-sm">
              {tool.logoUrl ? (
                <img src={tool.logoUrl} alt={tool.name} className="h-5 w-auto max-w-20 object-contain shrink-0" />
              ) : (
                <>
                  <div
                    className="h-5 w-5 rounded-md flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                    style={{ background: `oklch(0.45 0.20 ${hue})` }}
                  >
                    {initials}
                  </div>
                  <span className="text-[10px] font-semibold text-foreground">{tool.name}</span>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="h-full w-full flex flex-col" style={{ background: `oklch(0.93 0.04 ${hue})` }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/40 border-b border-black/8">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <div className="ml-2 flex-1 h-3 rounded bg-white/50" />
            </div>
            {/* Mock UI */}
            <div className="flex-1 p-3 flex flex-col gap-2 relative overflow-hidden">
              <div className="h-2.5 rounded-full bg-white/50 w-3/5" />
              <div className="h-2 rounded-full bg-white/35 w-2/5" />
              <div className="mt-1 grid grid-cols-2 gap-2 flex-1">
                <div className="rounded-lg bg-white/30" />
                <div className="rounded-lg flex flex-col gap-1.5 p-2">
                  <div className="h-1.5 rounded bg-white/40 w-full" />
                  <div className="h-1.5 rounded bg-white/30 w-4/5" />
                  <div className="h-1.5 rounded bg-white/25 w-3/5" />
                </div>
              </div>
              {/* Tool logo pill at bottom of image */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-lg px-2 py-1 shadow-sm">
                {tool.logoUrl ? (
                  <img src={tool.logoUrl} alt={tool.name} className="h-5 w-auto max-w-20 object-contain shrink-0" />
                ) : (
                  <>
                    <div
                      className="h-5 w-5 rounded-md flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                      style={{ background: `oklch(0.45 0.20 ${hue})` }}
                    >
                      {initials}
                    </div>
                    <span className="text-[10px] font-semibold text-foreground">{tool.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tool info */}
      <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-foreground leading-snug mb-2">
          {tool.shortDesc ?? tool.description.slice(0, 60)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">
          {tool.description}
        </p>
        <div className="mt-auto">
          <Link
            href={`/product/${tool.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85 transition-opacity"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  )
}

/* Category → label mapping (matches real vcstack.io slugs) */
const CATEGORY_LABELS: Record<string, string> = {
  'deal-sourcing':                       '🔎 Data & Deal Sourcing',
  'crm':                                 '🤝 CRM',
  'portfolio-management':                '📈 Portfolio Management',
  'fund-admin-software':                 '🏦 Fund Admin & Reporting',
  'data':                                '📊 Data',
  'captable-equity-management':          '📑 Captable / Equity Management',
  'lp-tools':                            '📋 LP Tools',
  'data-room':                           '🔒 Data Room',
  'research':                            '📑 Research',
  'video-conferencing':                  '💬 Video Conferencing',
  'fund-modeling-portfolio-forecasting': '📉 Fund Modeling & Forecasting',
  'email':                               '📧 Email',
  'platform':                            '🏗️ Platform',
  'esg':                                 '🌱 ESG',
  'hiring-payroll':                      '👥 Hiring & Payroll',
  'infrastructure':                      '⚙️ Infrastructure',
  'insurance':                           '🛡️ Insurance',
  'job-board-talent-pool':               '💼 Job Board & Talent Pool',
  'liquidity-instruments':               '💧 Liquidity Instruments',
  'newsletter-tools':                    '📰 Newsletter Tools',
  'news-resources':                      '📡 News & Resources',
  'community':                           '🏘️ Community',
  'calendar':                            '📅 Calendar',
  'project-management':                  '📌 Project Management',
  'other-tools':                         '🔧 Other Tools',
  'website':                             '🌐 Website',
}

/* FAQ data */
const FAQ = [
  {
    q: 'Why does VC Stack exist?',
    a: 'We spent a lot of time looking at the stacks different VCs use and have seen the challenges from the inside. Hundreds of tools for different use-cases, geographies, non-transparent pricing, and no reviews at all. So we decided to change that and came up with VC Stack to support investors with everything besides the real investing.',
  },
  {
    q: 'Who curated the tools?',
    a: 'We collected all tools on our website from different sources and articles around the web. Furthermore we asked our VC friends to share their current stack.',
  },
  {
    q: 'I think a tool or category is missing?',
    a: '100%. VC Stack is and always will be work in progress. You can submit a product or new category here. We will regularly update the database to stay up to date and empower everyone to pick the tools they like.',
  },
  {
    q: 'Who is behind VC Stack?',
    a: 'VC Stack was founded as a community resource for the venture capital ecosystem. It has grown into a comprehensive directory serving 500+ VC firms worldwide, helping investors discover and evaluate tools for every part of their workflow.',
  },
  {
    q: 'How can I help?',
    a: 'The easiest way: Tell us which tools you like and why they solve a problem for you or share the current stack at your firm. Reach out to us via email or submit a tool through our submission form.',
  },
]

export default async function HomePage() {
  const [categories, featuredTools] = await Promise.all([
    getCategories(),
    getFeaturedTools(12),
  ])

  const favorites = featuredTools.slice(0, 6)

  return (
    <PageLayout>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-96 flex items-center justify-center py-20 px-4">
        {/* Floating brand logos – left side */}
        <div className="pointer-events-none absolute inset-0">
          <LogoBubble initials="H"  color="#FF6B35" size="md" style={{ top: '18%', left:  '3%' }} />
          <LogoBubble initials="N"  color="#000000" size="md" style={{ top: '12%', left: '14%' }} />
          <LogoBubble initials="C"  color="#146EF5" size="sm" style={{ top: '40%', left:  '7%' }} />
          <LogoBubble initials="CB" color="#0A66C2" size="sm" style={{ top: '28%', left: '20%' }} />
          <LogoBubble initials="A"  color="#6C5CE7" size="md" style={{ top: '55%', left: '12%' }} />
          <LogoBubble initials="S"  color="#00B4D8" size="sm" style={{ top: '70%', left:  '5%' }} />
          <LogoBubble initials="DC" color="#1D3557" size="sm" style={{ top: '65%', left: '22%' }} />
          <LogoBubble initials="V"  color="#00A878" size="lg" style={{ top: '80%', left: '15%' }} />
          {/* Right side */}
          <LogoBubble initials="W"  color="#4353FF" size="md" style={{ top: '12%', right: '14%' }} />
          <LogoBubble initials="Sf" color="#00A1E0" size="sm" style={{ top: '22%', right:  '4%' }} />
          <LogoBubble initials="Sl" color="#4A154B" size="md" style={{ top: '38%', right: '20%' }} />
          <LogoBubble initials="P"  color="#FF6584" size="sm" style={{ top: '52%', right:  '6%' }} />
          <LogoBubble initials="JS" color="#1B4332" size="sm" style={{ top: '48%', right: '18%' }} />
          <LogoBubble initials="Ct" color="#0073E6" size="md" style={{ top: '65%', right: '10%' }} />
          <LogoBubble initials="E"  color="#8338EC" size="sm" style={{ top: '72%', right: '22%' }} />
          <LogoBubble initials="Tr" color="#FF9500" size="lg" style={{ top: '80%', right:  '5%' }} />
        </div>

        {/* Central content */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            Find your VC software stack
          </h1>
          <p className="text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            The world&apos;s largest directory of tools and resources for venture capital and angel investors
          </p>
          <SearchBox placeholder="Search for product or category" />
        </div>
      </section>

      {/* ── Our Favorites ─────────────────────────────────────────────────── */}
      {favorites.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our favorites</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((tool) => {
              const catLabel =
                (tool.category?.slug && CATEGORY_LABELS[tool.category.slug]) ??
                tool.category?.name ?? 'Tool'
              return <FavoriteCard key={tool.id} tool={tool} categoryLabel={catLabel} />
            })}
          </div>
        </section>
      )}

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Categories</h2>
          <Link
            href="/all-categories"
            className="text-sm text-muted-foreground border border-border rounded-full px-3 py-1 hover:bg-card hover:text-foreground transition-colors"
          >
            All categories
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} variant="default" />
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Frequently asked<br />questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Just a few words on why we created this website and who built it.
            </p>
          </div>
          {/* Right */}
          <div className="divide-y divide-border">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-5 first:pt-0">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Support the community ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">Support the community</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Star,
              title: 'Write Review',
              desc: 'How do you like the products you are working with? Answer a few questions to help the VC Stack community.',
              href: '/review',
              linkLabel: 'Write Review',
            },
            {
              icon: Monitor,
              title: 'Submit Product',
              desc: "You think we are missing a product that you or someone else uses? Just give us a hint and we will add it.",
              href: '/submit-product',
              linkLabel: 'Submit Product',
            },
            {
              icon: Share2,
              title: 'Share your stack',
              desc: 'The community would love to see and hear about the tools you are using in your venture firm.',
              href: '/share-stack',
              linkLabel: 'Share Stack',
            },
          ].map(({ icon: Icon, title, desc, href, linkLabel }) => (
            <div key={title} className="bg-card rounded-2xl border border-border p-6">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
              <Link href={href} className="text-sm font-medium text-brand hover:underline">
                {linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-card rounded-2xl border border-border p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground mb-1">VC Stack Newsletter</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Subscribe to our bi-weekly newsletter to receive a deep dive, reads-of-the-week, resources and tools.
            </p>
            <NewsletterForm />
          </div>
          {/* Decorative avatars */}
          <div className="flex -space-x-3 shrink-0">
            {['#FF6B35','#6C5CE7','#00A878','#0073E6'].map((c, i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                style={{ background: c }}
              >
                {['H','A','V','C'][i]}
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageLayout>
  )
}

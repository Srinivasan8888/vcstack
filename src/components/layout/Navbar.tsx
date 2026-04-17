'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, Menu, X } from 'lucide-react'

const CATEGORIES = [
  { icon: '🔍', name: 'Deal Sourcing',              slug: 'deal-sourcing' },
  { icon: '🤝', name: 'CRM',                        slug: 'crm' },
  { icon: '📊', name: 'Portfolio Management',        slug: 'portfolio-management' },
  { icon: '🏦', name: 'Fund Admin & Reporting',      slug: 'fund-admin-software' },
  { icon: '📈', name: 'Data',                        slug: 'data' },
  { icon: '🔒', name: 'Data Room',                   slug: 'data-room' },
  { icon: '📑', name: 'Captable / Equity Mgmt',      slug: 'captable-equity-management' },
  { icon: '📋', name: 'LP Tools',                    slug: 'lp-tools' },
  { icon: '🔬', name: 'Research',                    slug: 'research' },
  { icon: '💬', name: 'Video Conferencing',          slug: 'video-conferencing' },
  { icon: '📉', name: 'Fund Modeling & Forecasting', slug: 'fund-modeling-portfolio-forecasting' },
  { icon: '📧', name: 'Email',                       slug: 'email' },
  { icon: '🏗️', name: 'Platform',                    slug: 'platform' },
  { icon: '🌱', name: 'ESG',                         slug: 'esg' },
  { icon: '👥', name: 'Hiring & Payroll',            slug: 'hiring-payroll' },
  { icon: '⚙️', name: 'Infrastructure',              slug: 'infrastructure' },
  { icon: '🛡️', name: 'Insurance',                   slug: 'insurance' },
  { icon: '💼', name: 'Job Board & Talent Pool',     slug: 'job-board-talent-pool' },
  { icon: '💧', name: 'Liquidity Instruments',       slug: 'liquidity-instruments' },
  { icon: '📰', name: 'Newsletter Tools',            slug: 'newsletter-tools' },
  { icon: '📡', name: 'News & Resources',            slug: 'news-resources' },
  { icon: '🏘️', name: 'Community',                   slug: 'community' },
  { icon: '📅', name: 'Calendar',                    slug: 'calendar' },
  { icon: '📌', name: 'Project Management',          slug: 'project-management' },
  { icon: '🌐', name: 'Website',                     slug: 'website' },
  { icon: '🔧', name: 'Other Tools',                 slug: 'other-tools' },
]

const RESOURCE_LINKS = [
  { label: 'VC Stacks',       href: '/stacks',         desc: 'See what tools top VCs use' },
  { label: 'Pitch Decks',     href: '/pitch-decks',    desc: 'Real pitch decks from VC funds' },
  { label: 'Submit Product',  href: '/submit-product', desc: 'Add a tool to our directory' },
  { label: 'Share your Stack', href: '/share-stack',   desc: 'Share the tools your firm uses' },
]

export default function Navbar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const catRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setShowCategories(false)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowResources(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setMobileOpen(false)
    }
  }

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo & Label */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-[#0f172a]">VC Stack</span>
          </Link>
          <span className="hidden md:block text-[10px] uppercase tracking-widest text-slate-400 font-semibold border-l pl-4">
            Powered by GoingVC
          </span>
        </div>

        {/* Search Bar — desktop */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative group hidden sm:block">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for product"
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
          />
        </form>

        {/* Nav Links — desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Categories dropdown */}
          <div ref={catRef} className="relative">
            <button
              onClick={() => { setShowCategories(!showCategories); setShowResources(false) }}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Categories
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${showCategories ? 'rotate-180' : ''}`}
              />
            </button>

            {showCategories && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-135 rounded-xl border border-slate-200 bg-white shadow-lg p-4 z-50">
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                  {CATEGORIES.map(({ icon, name, slug }) => (
                    <Link
                      key={slug}
                      href={`/category/${slug}`}
                      onClick={() => setShowCategories(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base shrink-0">{icon}</span>
                      <span className="text-sm text-slate-700 truncate">{name}</span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-slate-100 mt-3 pt-3">
                  <Link
                    href="/all-categories"
                    onClick={() => setShowCategories(false)}
                    className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    View all categories →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => { setShowResources(!showResources); setShowCategories(false) }}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Resources
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${showResources ? 'rotate-180' : ''}`}
              />
            </button>

            {showResources && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white shadow-lg py-2 z-50">
                {RESOURCE_LINKS.map(({ label, href, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setShowResources(false)}
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <span className="block text-sm font-medium text-slate-800">{label}</span>
                    <span className="block text-xs text-slate-400 mt-0.5">{desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Blog
          </Link>
          <Link href="/newsletter" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Newsletter
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="px-4 py-3 sm:hidden">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for product"
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </form>

          {/* Mobile nav links */}
          <div className="px-4 pb-4 space-y-1">
            {/* Categories — expanded inline on mobile */}
            <div className="py-2.5">
              <span className="text-sm font-medium text-slate-700">Categories</span>
              <div className="mt-2 ml-3 space-y-0.5 border-l-2 border-slate-100 pl-3 max-h-60 overflow-y-auto">
                {CATEGORIES.map(({ icon, name, slug }) => (
                  <Link
                    key={slug}
                    href={`/category/${slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-1.5 text-sm text-slate-500 hover:text-slate-900"
                  >
                    <span className="text-sm">{icon}</span>
                    {name}
                  </Link>
                ))}
                <Link
                  href="/all-categories"
                  onClick={() => setMobileOpen(false)}
                  className="block py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  View all →
                </Link>
              </div>
            </div>

            {/* Resources — expanded inline on mobile */}
            <div className="py-2.5">
              <span className="text-sm font-medium text-slate-700">Resources</span>
              <div className="mt-2 ml-3 space-y-1 border-l-2 border-slate-100 pl-3">
                {RESOURCE_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-slate-500 hover:text-slate-900"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Blog
            </Link>
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Newsletter
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

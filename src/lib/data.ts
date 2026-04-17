/**
 * Data-fetching layer.
 * Tries Prisma first; falls back to STATIC_* constants so the UI
 * renders in development without a live database.
 */

import type { Category, Tool, PaginatedResult, SearchFilters } from './types'
import type { PreviewTool } from '@/components/cards/CategoryCard'
import { setCategoryResolver, buildAllTools } from './tools-data'

async function getPrisma() {
  try {
    const { prisma } = await import('./db/prisma')
    return prisma
  } catch {
    return null
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const db = await getPrisma()
  if (db) {
    try {
      return await db.category.findMany({
        include: { _count: { select: { tools: true } }, subCategories: true },
        orderBy: { name: 'asc' },
      })
    } catch { /* fall through */ }
  }
  return STATIC_CATEGORIES
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = await getPrisma()
  if (db) {
    try {
      return await db.category.findUnique({
        where: { slug },
        include: {
          _count: { select: { tools: true } },
          subCategories: { include: { _count: { select: { tools: true } } } },
        },
      })
    } catch { /* fall through */ }
  }
  return STATIC_CATEGORIES.find((c) => c.slug === slug) ?? null
}

export async function getToolsByCategory(
  categorySlug: string,
  filters: SearchFilters = {}
): Promise<PaginatedResult<Tool>> {
  const { page = 1, pageSize = 24, pricing, query } = filters
  const db = await getPrisma()
  if (db) {
    try {
      const where = {
        category: { slug: categorySlug },
        ...(pricing ? { pricingModel: pricing } : {}),
        ...(query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' as const } },
                { shortDesc: { contains: query, mode: 'insensitive' as const } },
              ],
            }
          : {}),
      }
      const [data, total] = await Promise.all([
        db.tool.findMany({
          where,
          include: { category: true, tags: true, _count: { select: { reviews: true } } },
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
        }),
        db.tool.count({ where }),
      ])
      return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
    } catch { /* fall through */ }
  }
  let filtered = STATIC_TOOLS.filter((t) => t.category?.slug === categorySlug)
  if (pricing) filtered = filtered.filter((t) => t.pricingModel === pricing)
  if (query) {
    const q = query.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.shortDesc ?? '').toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    )
  }
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const data = filtered.slice((page - 1) * pageSize, page * pageSize)
  return { data, total, page, pageSize, totalPages }
}

export async function getFeaturedTools(limit = 12): Promise<Tool[]> {
  const db = await getPrisma()
  if (db) {
    try {
      return await db.tool.findMany({
        where: { isFeatured: true },
        include: { category: true, tags: true, _count: { select: { reviews: true } } },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      })
    } catch { /* fall through */ }
  }
  return STATIC_TOOLS.filter((t) => t.isFeatured).slice(0, limit)
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const db = await getPrisma()
  if (db) {
    try {
      return await db.tool.findUnique({
        where: { slug },
        include: {
          category: true,
          subCategory: true,
          tags: true,
          reviews: {
            where: { isApproved: true },
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
          _count: { select: { reviews: true } },
        },
      })
    } catch { /* fall through */ }
  }
  return STATIC_TOOLS.find((t) => t.slug === slug) ?? null
}

export async function searchTools(filters: SearchFilters): Promise<PaginatedResult<Tool>> {
  const { query = '', category, pricing, page = 1, pageSize = 24 } = filters
  const db = await getPrisma()
  if (db) {
    try {
      const where = {
        ...(query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' as const } },
                { description: { contains: query, mode: 'insensitive' as const } },
                { shortDesc: { contains: query, mode: 'insensitive' as const } },
              ],
            }
          : {}),
        ...(category ? { category: { slug: category } } : {}),
        ...(pricing ? { pricingModel: pricing } : {}),
      }
      const [data, total] = await Promise.all([
        db.tool.findMany({
          where,
          include: { category: true, tags: true, _count: { select: { reviews: true } } },
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
        }),
        db.tool.count({ where }),
      ])
      return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
    } catch { /* fall through */ }
  }
  let results = STATIC_TOOLS
  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.shortDesc ?? '').toLowerCase().includes(q)
    )
  }
  if (category) results = results.filter((t) => t.category?.slug === category)
  if (pricing) results = results.filter((t) => t.pricingModel === pricing)
  return { data: results, total: results.length, page: 1, pageSize: results.length, totalPages: 1 }
}

export async function getRelatedTools(toolId: string, categoryId: string, limit = 4): Promise<Tool[]> {
  const db = await getPrisma()
  if (db) {
    try {
      return await db.tool.findMany({
        where: { categoryId, id: { not: toolId } },
        include: { category: true, tags: true },
        take: limit,
        orderBy: { isFeatured: 'desc' },
      })
    } catch { /* fall through */ }
  }
  return STATIC_TOOLS.filter((t) => t.categoryId === categoryId && t.id !== toolId).slice(0, limit)
}

export async function getSiteStats() {
  const db = await getPrisma()
  if (db) {
    try {
      const [toolCount, categoryCount, reviewCount, submissionCount] = await Promise.all([
        db.tool.count(),
        db.category.count(),
        db.review.count({ where: { isApproved: true } }),
        db.submission.count({ where: { status: 'PENDING' } }),
      ])
      return { toolCount, categoryCount, reviewCount, submissionCount }
    } catch { /* fall through */ }
  }
  return {
    toolCount: STATIC_TOOLS.length,
    categoryCount: STATIC_CATEGORIES.length,
    reviewCount: 0,
    submissionCount: 0,
  }
}

/** Returns up to 4 preview tools (name + logoUrl) per category slug. */
export async function getCategoryPreviewTools(): Promise<Record<string, PreviewTool[]>> {
  const result: Record<string, PreviewTool[]> = {}
  for (const tool of STATIC_TOOLS) {
    const slug = tool.category?.slug
    if (!slug) continue
    if (!result[slug]) result[slug] = []
    if (result[slug].length < 4) {
      result[slug].push({ name: tool.name, logoUrl: tool.logoUrl ?? null })
    }
  }
  return result
}

// ─── Category images — served locally from public/images/categories/ ──────────
// Only real landscape photos included; small tool logos use gradient fallback.
// Downloaded by: python3 download_cat_images.py
const CAT_IMAGES: Record<string, string> = {
  // ✅ Verified real photos (>30 KB)
  'captable-equity-management':          '/images/categories/captable-equity-management.jpg',
  'community':                           '/images/categories/community.jpg',
  'crm':                                 '/images/categories/crm.jpg',
  'data':                                '/images/categories/data.jpg',
  'data-room':                           '/images/categories/data-room.jpg',
  'fund-admin-software':                 '/images/categories/fund-admin-software.jpg',
  'infrastructure':                      '/images/categories/infrastructure.jpg',
  'platform':                            '/images/categories/platform.jpg',
  // ✅ Smaller but verified photos
  'calendar':                            '/images/categories/calendar.jpg',
  'esg':                                 '/images/categories/esg.jpg',
  'lp-tools':                            '/images/categories/lp-tools.jpg',
  'newsletter-tools':                    '/images/categories/newsletter-tools.jpg',
  'research':                            '/images/categories/research.jpg',
  // ❌ Removed — these downloaded as tool logos, gradient looks better:
  // deal-sourcing, portfolio-management (both = Edda logo, 18K)
  // email, fund-modeling, hiring-payroll, insurance, job-board,
  // liquidity-instruments, news-resources, other-tools,
  // project-management, video-conferencing, website (all 2–8K logos)
}

// ─── Static fallback data (real vcstack.io categories) ────────────────────────

export const STATIC_CATEGORIES: Category[] = [
  { id: 'cat-24', name: 'Calendar',                       slug: 'calendar',                          description: 'Most investors know the feeling of hopping from call to call. These tools can help you manage your calendar and be the boss of your calendar again.',                icon: '📅', imageUrl: CAT_IMAGES['calendar'], _count: { tools: 8 } },
  { id: 'cat-8',  name: 'Captable / Equity Management',   slug: 'captable-equity-management',        description: 'Software to facilitate the management of the portfolio companies equity & captable.',           icon: '📑', imageUrl: CAT_IMAGES['captable-equity-management'], _count: { tools: 19 } },
  { id: 'cat-23', name: 'Community',                      slug: 'community',                         description: 'Tools & Software to create community platforms.',                                              icon: '🏘️', imageUrl: CAT_IMAGES['community'], _count: { tools: 7 } },
  { id: 'cat-2',  name: 'CRM',                            slug: 'crm',                               description: 'Software to record all interactions with (potential) portfolio companies & founders.',          icon: '🤝', imageUrl: CAT_IMAGES['crm'], _count: { tools: 22 } },
  { id: 'cat-7',  name: 'Data',                           slug: 'data',                              description: 'Tools or websites that help you to get different data points on your startups.',               icon: '📈', imageUrl: CAT_IMAGES['data'], _count: { tools: 80 } },
  { id: 'cat-6',  name: 'Data Room',                      slug: 'data-room',                         description: 'Tools to create & manage secure Data Rooms.',                                                  icon: '🔒', imageUrl: CAT_IMAGES['data-room'], _count: { tools: 17 } },
  { id: 'cat-1',  name: 'Deal Sourcing',                  slug: 'deal-sourcing',                     description: 'Websites that help you find deals and facilitate matchmaking.',                                 icon: '🔍', imageUrl: CAT_IMAGES['deal-sourcing'], _count: { tools: 88 } },
  { id: 'cat-13', name: 'Email',                          slug: 'email',                             description: 'Tools to run the emails in your firm.',                                                         icon: '📧', imageUrl: CAT_IMAGES['email'], _count: { tools: 4 } },
  { id: 'cat-15', name: 'ESG',                            slug: 'esg',                               description: 'Tools to manage ESG reporting for your investment portfolio.',                                  icon: '🌱', imageUrl: CAT_IMAGES['esg'], _count: { tools: 12 } },
  { id: 'cat-4',  name: 'Fund Admin & Reporting',         slug: 'fund-admin-software',               description: 'Software that helps manage & report your VC fund.',                                             icon: '🏦', imageUrl: CAT_IMAGES['fund-admin-software'], _count: { tools: 35 } },
  { id: 'cat-11', name: 'Fund Modeling & Forecasting',    slug: 'fund-modeling-portfolio-forecasting', description: 'Tools that help fund managers model their fund and forecast their portfolio.',                  icon: '📉', imageUrl: CAT_IMAGES['fund-modeling-portfolio-forecasting'], _count: { tools: 11 } },
  { id: 'cat-16', name: 'Hiring & Payroll',               slug: 'hiring-payroll',                    description: 'Tools & Software you need to find world-class talents and hire a global diverse team.',        icon: '👥', imageUrl: CAT_IMAGES['hiring-payroll'], _count: { tools: 9 } },
  { id: 'cat-17', name: 'Infrastructure',                 slug: 'infrastructure',                    description: 'Tools & Services to run your Venture Capital fund or Investment SPV.',                         icon: '⚙️', imageUrl: CAT_IMAGES['infrastructure'], _count: { tools: 18 } },
  { id: 'cat-18', name: 'Insurance',                      slug: 'insurance',                         description: 'Companies that provide insurance solutions for Investors and GPs.',                             icon: '🛡️', imageUrl: CAT_IMAGES['insurance'], _count: { tools: 2 } },
  { id: 'cat-19', name: 'Job Board & Talent Pool',        slug: 'job-board-talent-pool',             description: 'Tools or websites that help you to set up a job board or talent pool for portfolio companies.', icon: '💼', imageUrl: CAT_IMAGES['job-board-talent-pool'], _count: { tools: 6 } },
  { id: 'cat-20', name: 'Liquidity Instruments',          slug: 'liquidity-instruments',             description: 'Instruments that help with the liquidity of your assets.',                                     icon: '💧', imageUrl: CAT_IMAGES['liquidity-instruments'], _count: { tools: 17 } },
  { id: 'cat-5',  name: 'LP Tools',                       slug: 'lp-tools',                          description: 'Software that helps Limited Partners with research, benchmarking and more.',                   icon: '📋', imageUrl: CAT_IMAGES['lp-tools'], _count: { tools: 19 } },
  { id: 'cat-21', name: 'Newsletter Tools',               slug: 'newsletter-tools',                  description: 'Providers that let you send out newsletter emails to your network.',                           icon: '📰', imageUrl: CAT_IMAGES['newsletter-tools'], _count: { tools: 4 } },
  { id: 'cat-22', name: 'News & Resources',               slug: 'news-resources',                    description: 'Websites, newsletters to stay up to date on the latest tech news.',                           icon: '📡', imageUrl: CAT_IMAGES['news-resources'], _count: { tools: 15 } },
  { id: 'cat-25', name: 'Other Tools',                    slug: 'other-tools',                       description: 'Other tools that can be helpful for running your VC firm.',                                    icon: '🔧', imageUrl: CAT_IMAGES['other-tools'], _count: { tools: 18 } },
  { id: 'cat-14', name: 'Platform',                       slug: 'platform',                          description: 'Tools that help to setup VC platform features like vendor operations or deals.',               icon: '🏗️', imageUrl: CAT_IMAGES['platform'], _count: { tools: 11 } },
  { id: 'cat-3',  name: 'Portfolio Management',           slug: 'portfolio-management',              description: 'Software to manage and monitor your investment portfolio.',                                     icon: '📊', imageUrl: CAT_IMAGES['portfolio-management'], _count: { tools: 25 } },
  { id: 'cat-12', name: 'Project Management',             slug: 'project-management',                description: 'Software that helps manage tasks & goals inside the VC firm.',                                 icon: '📌', imageUrl: CAT_IMAGES['project-management'], _count: { tools: 6 } },
  { id: 'cat-9',  name: 'Research',                       slug: 'research',                          description: 'Companies & Websites that help with market research.',                                          icon: '🔬', imageUrl: CAT_IMAGES['research'], _count: { tools: 46 } },
  { id: 'cat-10', name: 'Video Conferencing',             slug: 'video-conferencing',                description: 'Tools to run your virtual meetings.',                                                           icon: '💬', imageUrl: CAT_IMAGES['video-conferencing'], _count: { tools: 6 } },
  { id: 'cat-26', name: 'Website',                        slug: 'website',                           description: 'Tools to run your own website as a VC firm.',                                                  icon: '🌐', imageUrl: CAT_IMAGES['website'], _count: { tools: 4 } },
]

function catById(id: string): Category {
  return STATIC_CATEGORIES.find((c) => c.id === id) ?? STATIC_CATEGORIES[0]
}

// Wire up category resolver and build comprehensive tool catalog (510 tools)
setCategoryResolver(catById)
export const STATIC_TOOLS: Tool[] = buildAllTools()

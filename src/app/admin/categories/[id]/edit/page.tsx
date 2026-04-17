import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { STATIC_CATEGORIES } from '@/lib/data'
import type { Category } from '@/lib/types'
import EditCategoryForm from './EditCategoryForm'

export const metadata: Metadata = { title: 'Edit section — Editor’s Desk' }

async function getPrisma() {
  try {
    const { prisma } = await import('@/lib/db/prisma')
    return prisma
  } catch {
    return null
  }
}

async function getCategoryById(id: string): Promise<{ category: Category | null; dbAvailable: boolean }> {
  const db = await getPrisma()
  if (db) {
    try {
      const row = await db.category.findUnique({
        where: { id },
        include: { _count: { select: { tools: true } } },
      })
      if (row) return { category: row as Category, dbAvailable: true }
      // DB available but no row with this id — fall through to static lookup
      const staticHit = STATIC_CATEGORIES.find((c) => c.id === id) ?? null
      return { category: staticHit, dbAvailable: true }
    } catch {
      /* fall through */
    }
  }
  const staticHit = STATIC_CATEGORIES.find((c) => c.id === id) ?? null
  return { category: staticHit, dbAvailable: false }
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const { category, dbAvailable } = await getCategoryById(id)

  if (!category) notFound()

  return (
    <div style={{ padding: '32px 40px 64px' }}>
      <header
        style={{
          borderTop: '3px double var(--ink)',
          borderBottom: '1px solid var(--ink)',
          padding: '20px 0',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--red)',
            marginBottom: 8,
          }}
        >
          <Link
            href="/admin/categories"
            style={{ color: 'var(--red)', textDecoration: 'none' }}
          >
            ← Sections
          </Link>
          <span style={{ margin: '0 10px', color: 'var(--ink-muted)' }}>·</span>
          Edit
        </div>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            fontSize: 'var(--fs-name)',
            color: 'var(--ink)',
            lineHeight: 1.1,
          }}
        >
          {category.icon ? `${category.icon} ` : ''}
          {category.name}
        </h1>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            color: 'var(--ink-muted)',
            marginTop: 6,
            letterSpacing: '0.14em',
          }}
        >
          id: {category.id} · {category._count?.tools ?? 0} tool(s)
        </div>
      </header>

      <EditCategoryForm category={category} dbAvailable={dbAvailable} />
    </div>
  )
}

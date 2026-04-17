import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategories, STATIC_TOOLS } from '@/lib/data'
import type { Tool } from '@/lib/types'
import EditToolForm from './EditToolForm'

export const metadata: Metadata = { title: 'Edit entry — Editor’s Desk' }

async function getPrisma() {
  try {
    const { prisma } = await import('@/lib/db/prisma')
    return prisma
  } catch {
    return null
  }
}

async function getToolById(
  id: string,
): Promise<{ tool: Tool | null; dbAvailable: boolean }> {
  const db = await getPrisma()
  if (db) {
    try {
      const row = await db.tool.findUnique({
        where: { id },
        include: { category: true },
      })
      if (row) return { tool: row as Tool, dbAvailable: true }
      const staticHit = STATIC_TOOLS.find((t) => t.id === id) ?? null
      return { tool: staticHit, dbAvailable: true }
    } catch {
      /* fall through */
    }
  }
  const staticHit = STATIC_TOOLS.find((t) => t.id === id) ?? null
  return { tool: staticHit, dbAvailable: false }
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditToolPage({ params }: Props) {
  const { id } = await params
  const [{ tool, dbAvailable }, categories] = await Promise.all([
    getToolById(id),
    getCategories(),
  ])

  if (!tool) notFound()

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
          <Link href="/admin/tools" style={{ color: 'var(--red)', textDecoration: 'none' }}>
            ← Index
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
          {tool.name}
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
          id: {tool.id} · {tool.isFeatured ? '★ featured' : 'not featured'}
        </div>
      </header>

      <EditToolForm tool={tool} categories={categories} dbAvailable={dbAvailable} />
    </div>
  )
}

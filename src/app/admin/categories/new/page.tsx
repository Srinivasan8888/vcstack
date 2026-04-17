import type { Metadata } from 'next'
import Link from 'next/link'
import NewCategoryForm from './NewCategoryForm'

export const metadata: Metadata = { title: 'New section — Editor’s Desk' }

async function checkDb(): Promise<boolean> {
  try {
    const { prisma } = await import('@/lib/db/prisma')
    await prisma.category.count()
    return true
  } catch {
    return false
  }
}

export default async function NewCategoryPage() {
  const dbAvailable = await checkDb()

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
          <Link href="/admin/categories" style={{ color: 'var(--red)', textDecoration: 'none' }}>
            ← Sections
          </Link>
          <span style={{ margin: '0 10px', color: 'var(--ink-muted)' }}>·</span>
          New
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
          New Section
        </h1>
      </header>

      <NewCategoryForm dbAvailable={dbAvailable} />
    </div>
  )
}

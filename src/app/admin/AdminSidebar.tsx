'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { label: 'Dashboard',   href: '/admin/dashboard' },
  { label: 'Tools',       href: '/admin/tools' },
  { label: 'Categories',  href: '/admin/categories' },
  { label: 'Submissions', href: '/admin/submissions' },
  { label: 'Reviews',     href: '/admin/reviews' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside
      className="w-60 shrink-0 flex flex-col"
      style={{ background: 'var(--paper)', borderRight: '1px solid var(--ink)' }}
    >
      <div style={{ padding: '24px 20px', borderBottom: '2px solid var(--ink)' }}>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            fontSize: '1.6rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: 'var(--ink)',
          }}
        >
          IndianVCs
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            marginTop: 6,
          }}
        >
          Admin · Desk
        </div>
      </div>

      <nav className="flex-1" style={{ padding: '16px 12px' }}>
        {NAV.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'block',
                padding: '10px 12px',
                fontFamily: 'var(--mono)',
                fontSize: 'var(--fs-btn)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                color: active ? 'var(--paper)' : 'var(--ink-light)',
                background: active ? 'var(--ink)' : 'transparent',
                borderBottom: '1px solid var(--rule)',
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: 12, borderTop: '1px solid var(--rule)' }}>
        <Link href="/" className="btn btn--ghost w-full justify-center" style={{ marginBottom: 8 }}>
          ← Back to site
        </Link>
        <button onClick={signOut} className="btn w-full justify-center" type="button">
          Sign out
        </button>
      </div>
    </aside>
  )
}

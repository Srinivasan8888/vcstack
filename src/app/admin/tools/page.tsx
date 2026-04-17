import type { Metadata } from 'next'
import Link from 'next/link'
import { searchTools } from '@/lib/data'

export const metadata: Metadata = { title: 'Tools — Editor’s Desk' }

const PRICING_LABELS: Record<string, string> = {
  FREE: 'Free',
  FREEMIUM: 'Freemium',
  PAID: 'Paid',
  ENTERPRISE: 'Enterprise',
}

interface Props { searchParams: Promise<{ page?: string; q?: string }> }

export default async function AdminToolsPage({ searchParams }: Props) {
  const { page: ps, q = '' } = await searchParams
  const page = Number(ps ?? 1)
  const { data: tools, total, totalPages } = await searchTools({ query: q, page, pageSize: 20 })

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
          The Index · {total} entries
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 900,
              fontSize: 'var(--fs-name)',
              color: 'var(--ink)',
              lineHeight: 1.1,
            }}
          >
            Tools on the Paper
          </h1>
          <Link href="/admin/tools/new" className="btn btn--primary">
            + New Entry
          </Link>
        </div>
      </header>

      <form style={{ marginBottom: 20 }}>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search the index…"
          style={{
            width: '100%',
            maxWidth: 420,
            background: 'var(--paper)',
            border: '1px solid var(--ink)',
            padding: '10px 12px',
            fontFamily: 'var(--body)',
            fontSize: '0.95rem',
            color: 'var(--ink)',
            outline: 'none',
            borderRadius: 0,
          }}
        />
      </form>

      <div style={{ border: '1px solid var(--ink)', overflow: 'hidden' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--body)',
            fontSize: '0.95rem',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid var(--ink)', background: 'var(--paper-alt)' }}>
              {['Name', 'Section', 'Pricing', 'Featured', ''].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    fontFamily: 'var(--mono)',
                    fontSize: 'var(--fs-tag)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--ink-muted)',
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                <td style={{ padding: '10px 14px' }}>
                  <Link
                    href={`/product/${tool.slug}`}
                    style={{
                      fontFamily: 'var(--serif)',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      textDecoration: 'none',
                    }}
                  >
                    {tool.name}
                  </Link>
                </td>
                <td style={{ padding: '10px 14px', color: 'var(--ink-light)' }}>
                  {tool.category?.name ?? '—'}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 'var(--fs-tag)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--ink-light)',
                    }}
                  >
                    {PRICING_LABELS[tool.pricingModel] ?? tool.pricingModel}
                  </span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 'var(--fs-tag)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: tool.isFeatured ? 'var(--red)' : 'var(--ink-muted)',
                    }}
                  >
                    {tool.isFeatured ? '★ Yes' : 'No'}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                  <Link
                    href={`/admin/tools/${tool.id}/edit`}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 'var(--fs-tag)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--red)',
                      textDecoration: 'none',
                    }}
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            marginTop: 24,
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/tools?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                border: '1px solid var(--rule)',
                fontFamily: 'var(--mono)',
                fontSize: 'var(--fs-btn)',
                textDecoration: 'none',
                background: p === page ? 'var(--ink)' : 'var(--paper)',
                color: p === page ? 'var(--paper)' : 'var(--ink-light)',
              }}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

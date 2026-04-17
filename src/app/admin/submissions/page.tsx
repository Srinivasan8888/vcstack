import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Submissions — Editor’s Desk' }

async function getSubmissions() {
  try {
    const { prisma } = await import('@/lib/db/prisma')
    return await prisma.submission.findMany({
      include: { submitter: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'var(--red)',
  APPROVED: 'var(--success)',
  REJECTED: 'var(--ink-muted)',
}

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions()
  const pending = submissions.filter((s: any) => s.status === 'PENDING').length

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
          Inbox · {pending} pending
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
          Submissions to the Desk
        </h1>
      </header>

      {submissions.length === 0 ? (
        <div
          style={{
            border: '1px solid var(--ink)',
            padding: 64,
            textAlign: 'center',
            background: 'var(--paper-alt)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.4rem',
              fontStyle: 'italic',
              color: 'var(--ink)',
              marginBottom: 6,
            }}
          >
            No correspondence today.
          </p>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: '0.95rem',
              color: 'var(--ink-light)',
            }}
          >
            New submissions will appear here for review.
          </p>
        </div>
      ) : (
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
                {['Tool', 'URL', 'From', 'Filed', 'Status', 'Actions'].map((h) => (
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
              {submissions.map((sub: any) => (
                <tr key={sub.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, color: 'var(--ink)' }}>
                      {sub.toolName}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', maxWidth: 180 }}>
                    <a
                      href={sub.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 'var(--fs-tag)',
                        color: 'var(--red)',
                        textDecoration: 'none',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {sub.websiteUrl.replace(/^https?:\/\//, '')}
                    </a>
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontFamily: 'var(--mono)',
                      fontSize: 'var(--fs-tag)',
                      color: 'var(--ink-light)',
                    }}
                  >
                    {sub.submitter?.email ?? '—'}
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontFamily: 'var(--mono)',
                      fontSize: 'var(--fs-tag)',
                      color: 'var(--ink-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 'var(--fs-tag)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: STATUS_COLORS[sub.status] ?? 'var(--ink-muted)',
                        fontWeight: 600,
                      }}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {sub.status === 'PENDING' && (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'var(--mono)',
                            fontSize: 'var(--fs-tag)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            color: 'var(--success)',
                            padding: 0,
                          }}
                        >
                          ✓ Approve
                        </button>
                        <button
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'var(--mono)',
                            fontSize: 'var(--fs-tag)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            color: 'var(--red)',
                            padding: 0,
                          }}
                        >
                          ✗ Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

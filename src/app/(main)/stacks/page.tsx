import type { Metadata } from 'next'
import Link from 'next/link'
import { FIRMS } from '@/lib/resources-data'

export const metadata: Metadata = {
  title: 'VC Stacks — See What Tools Top VCs Use',
  description:
    'Explore the software stacks used by leading venture capital firms like Weekend Fund, Point Nine, Hustle Fund and more.',
}

export default function StacksPage() {
  return (
    <div className="page" style={{ padding: '24px 24px 48px' }}>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        <span style={{ color: 'var(--ink)' }}>VC Stacks</span>
      </div>

      <header
        style={{
          borderTop: '2px solid var(--ink)',
          borderBottom: '1px solid var(--ink)',
          padding: '20px 0',
          marginBottom: 28,
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
          Feature · The Stacks Column
        </div>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            fontSize: 'var(--fs-name)',
            lineHeight: 1.1,
            color: 'var(--ink)',
          }}
        >
          What the Best Funds Actually Run On
        </h1>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '1.05rem',
            color: 'var(--ink-light)',
            marginTop: 10,
            maxWidth: 720,
            fontStyle: 'italic',
          }}
        >
          Dispatches from {FIRMS.length} firms — their CRM of record, their deal-sourcing
          rigs, the analytics they trust. Presented without marketing copy.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 0 }}>
        {FIRMS.map((firm, i) => (
          <Link
            key={firm.slug}
            href={`/firms/${firm.slug}`}
            style={{
              display: 'block',
              padding: 20,
              border: '1px solid var(--rule)',
              background: 'var(--paper)',
              textDecoration: 'none',
              marginLeft: -1,
              marginTop: -1,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 'var(--fs-tag)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: 8,
              }}
            >
              No. {String(i + 1).padStart(2, '0')} · {firm.location}
            </div>
            <div
              style={{
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                borderBottom: '1px solid var(--rule)',
                marginBottom: 12,
              }}
            >
              <img
                src={firm.logo}
                alt={firm.name}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'grayscale(1) contrast(1.1)' }}
              />
            </div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 700,
                fontSize: 'var(--fs-card)',
                color: 'var(--ink)',
                marginBottom: 6,
              }}
            >
              {firm.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--ink-light)',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: 10,
              }}
            >
              {firm.description}
            </p>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 'var(--fs-tag)',
                color: 'var(--red)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {firm.tools.length} tools in stack →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

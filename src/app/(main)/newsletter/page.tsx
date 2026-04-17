import type { Metadata } from 'next'
import Link from 'next/link'
import NewsletterForm from '@/components/ui/NewsletterForm'

export const metadata: Metadata = {
  title: 'The Dispatch — IndianVCs Newsletter',
  description:
    'Subscribe to the IndianVCs Dispatch for bi-weekly deep dives, reads-of-the-week, resources and tools.',
}

export default function NewsletterPage() {
  return (
    <div className="page" style={{ padding: '24px 24px 64px', maxWidth: 760 }}>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        <span style={{ color: 'var(--ink)' }}>The Dispatch</span>
      </div>

      <header
        style={{
          borderTop: '2px solid var(--ink)',
          borderBottom: '1px solid var(--ink)',
          padding: '24px 0',
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--red)',
            marginBottom: 10,
          }}
        >
          The Dispatch · Forthcoming
        </div>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            fontSize: 'var(--fs-name)',
            color: 'var(--ink)',
            lineHeight: 1.05,
          }}
        >
          A newsletter, in the<br />making.
        </h1>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '1.1rem',
            color: 'var(--ink-light)',
            marginTop: 14,
            fontStyle: 'italic',
            maxWidth: 540,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          The Dispatch isn’t printed yet. We’re putting together the first edition
          — deep dives, new tools, and commentary from Indian VCs and operators —
          and it will land in inboxes soon.
        </p>
      </header>

      <div
        style={{
          border: '2px solid var(--ink)',
          padding: 32,
          textAlign: 'center',
        }}
      >
        <div className="section-header" style={{ textAlign: 'center' }}>Join the waitlist</div>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '0.95rem',
            color: 'var(--ink-light)',
            marginBottom: 20,
            fontStyle: 'italic',
          }}
        >
          Leave your address and we’ll send the first edition when it prints.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NewsletterForm />
        </div>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            color: 'var(--ink-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginTop: 20,
          }}
        >
          Coming soon · Free · No spam, ever.
        </p>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Share Your Stack — IndianVCs',
  description:
    'Share the tools your VC firm uses and help the community discover great software.',
}

export default function ShareStackPage() {
  return (
    <div className="page" style={{ padding: '24px 24px 64px', maxWidth: 720 }}>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        <span style={{ color: 'var(--ink)' }}>Share Your Stack</span>
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
          Dear Editor
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
          Share Your Stack
        </h1>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '1.1rem',
            color: 'var(--ink-light)',
            marginTop: 14,
            fontStyle: 'italic',
            maxWidth: 560,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          The community would love to hear which tools your firm actually uses — the CRM,
          the data-sourcing rig, the analytics suite, the whiteboards you can’t quit.
        </p>
      </header>

      <div style={{ textAlign: 'center' }}>
        <a
          href="mailto:desk@indianvcs.com?subject=Sharing our stack"
          className="btn btn--primary"
        >
          Write to the desk →
        </a>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            color: 'var(--ink-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginTop: 16,
          }}
        >
          Or file a submission via the form below
        </p>
        <div style={{ marginTop: 12 }}>
          <Link href="/submit-product" className="btn btn--ghost">
            Submit a product
          </Link>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import ReviewForm from './ReviewForm'

export const metadata: Metadata = {
  title: 'Letter to the Editor — IndianVCs',
  description: 'Write a review of a tool listed on the paper.',
}

interface Props {
  searchParams: Promise<{ tool?: string }>
}

export default async function ReviewPage({ searchParams }: Props) {
  const { tool } = await searchParams
  return (
    <div className="page" style={{ padding: '24px 24px 64px', maxWidth: 720 }}>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        <span style={{ color: 'var(--ink)' }}>Letter to the Editor</span>
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
          Letters · Field Notes
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
          Write a Review
        </h1>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '1.05rem',
            color: 'var(--ink-light)',
            marginTop: 14,
            fontStyle: 'italic',
            maxWidth: 520,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          A note from the field — help other VCs make informed calls. Reviews are
          moderated before they run in print.
        </p>
      </header>

      <ReviewForm defaultToolSlug={tool} />
    </div>
  )
}

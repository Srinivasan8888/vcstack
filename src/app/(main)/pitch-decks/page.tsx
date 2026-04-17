import type { Metadata } from 'next'
import Link from 'next/link'
import { PITCH_DECKS } from '@/lib/resources-data'

export const metadata: Metadata = {
  title: 'VC Pitch Decks — Real Fund Pitch Decks',
  description:
    'Browse real pitch decks used by VC funds to raise capital. Learn from Shrug Capital, Seedcamp, Not Boring Capital and more.',
}

export default function PitchDecksPage() {
  return (
    <div className="page" style={{ padding: '24px 24px 48px' }}>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        <span style={{ color: 'var(--ink)' }}>Pitch Decks</span>
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
          Archive · The LP Correspondence
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
          The Pitch Decks
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
          Real pitch decks used by venture capital funds to raise capital.
          Useful fodder for your own fund raise — or your next thesis debate.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 0 }}>
        {PITCH_DECKS.map((deck, i) => (
          <a
            key={`${deck.title}-${i}`}
            href={deck.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              border: '1px solid var(--rule)',
              background: 'var(--paper)',
              textDecoration: 'none',
              marginLeft: -1,
              marginTop: -1,
            }}
          >
            <div
              style={{
                height: 200,
                background: 'var(--paper-dark)',
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--rule)',
              }}
            >
              <img
                src={deck.image}
                alt={deck.title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter: 'grayscale(0.2)',
                }}
              />
            </div>
            <div style={{ padding: 16 }}>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 'var(--fs-tag)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--ink-muted)',
                  marginBottom: 4,
                }}
              >
                No. {String(i + 1).padStart(2, '0')}
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
                {deck.title}
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
                {deck.description}
              </p>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 'var(--fs-tag)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--red)',
                }}
              >
                View deck ↗
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

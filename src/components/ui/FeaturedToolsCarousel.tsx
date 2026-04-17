'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Tool } from '@/lib/types'

interface Props {
  tools: Tool[]
}

function faviconFor(url: string) {
  try {
    const d = new URL(url).hostname.replace(/^www\./, '')
    return `https://www.google.com/s2/favicons?domain=${d}&sz=128`
  } catch {
    return ''
  }
}

function initials(name: string) {
  const w = name.trim().split(/\s+/)
  return w.length === 1
    ? w[0].substring(0, 2).toUpperCase()
    : (w[0][0] + w[1][0]).toUpperCase()
}

const AUTOPLAY_MS = 5000

export default function FeaturedToolsCarousel({ tools }: Props) {
  const [perPage, setPerPage] = useState(3)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Responsive cards-per-page
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 640) setPerPage(1)
      else if (w < 1024) setPerPage(2)
      else setPerPage(3)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const pageCount = Math.max(1, Math.ceil(tools.length / perPage))

  // Clamp page when perPage changes
  useEffect(() => {
    if (page >= pageCount) setPage(0)
  }, [pageCount, page])

  // Autoplay
  useEffect(() => {
    if (paused || pageCount < 2) return
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, pageCount])

  const goPrev = () => setPage((p) => (p - 1 + pageCount) % pageCount)
  const goNext = () => setPage((p) => (p + 1) % pageCount)

  if (!tools.length) return null

  return (
    <div className="ft-wrap">
      <div className="ft-head">
        <div>
          <div className="ft-kicker">Featured · This issue</div>
          <h2 className="ft-title">Tools on the Desk</h2>
          <p className="ft-sub">A rotating selection of tools the editors keep coming back to.</p>
        </div>
        <div className="ft-nav" role="group" aria-label="Carousel controls">
          <button type="button" className="ft-btn" onClick={goPrev} aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="ft-btn" onClick={goNext} aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="ft-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="ft-track"
          ref={trackRef}
          style={{
            width: `${(tools.length / perPage) * 100}%`,
            transform: `translateX(-${(page * perPage * 100) / tools.length}%)`,
          }}
        >
          {tools.map((t) => {
            const icon = t.logoUrl || faviconFor(t.websiteUrl)
            const slotWidthPct = 100 / tools.length
            return (
              <div
                key={t.id}
                className="ft-slot"
                style={{ width: `${slotWidthPct}%` }}
              >
                <Link href={`/product/${t.slug}`} className="ft-card">
                  <div className="ft-card-top">
                    <div className="ft-icon-wrap">
                      {icon ? (
                        <img src={icon} alt="" className="ft-icon" loading="lazy" />
                      ) : (
                        <div className="ft-icon ft-icon-fb">{initials(t.name)}</div>
                      )}
                    </div>
                    {t.category && <span className="ft-cat">{t.category.name}</span>}
                  </div>

                  <h3 className="ft-name">{t.name}</h3>
                  <p className="ft-desc">
                    {t.shortDesc ?? t.description.slice(0, 140)}
                  </p>

                  <div className="ft-foot">
                    <span className="ft-cta">Read the entry</span>
                    <span className="ft-cta-arrow" aria-hidden="true">→</span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="ft-dots" role="tablist" aria-label="Carousel pages">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`ft-dot ${i === page ? 'is-on' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-selected={i === page}
              role="tab"
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .ft-wrap { display: flex; flex-direction: column; gap: 20px; }

        .ft-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--ink);
        }
        .ft-kicker {
          font-family: var(--mono);
          font-size: var(--fs-tag);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--red);
          margin-bottom: 6px;
        }
        .ft-title {
          font-family: var(--serif);
          font-weight: 900;
          font-size: var(--fs-hero);
          color: var(--ink);
          text-transform: uppercase;
          letter-spacing: 0.01em;
          line-height: 1.1;
        }
        .ft-sub {
          font-family: var(--body);
          font-size: var(--fs-body);
          color: var(--ink-muted);
          font-style: italic;
          margin-top: 6px;
        }

        .ft-nav { display: flex; gap: 8px; }
        .ft-btn {
          width: 42px;
          height: 42px;
          border: 1px solid var(--ink);
          background: var(--paper);
          color: var(--ink);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 160ms ease, color 160ms ease;
        }
        .ft-btn:hover { background: var(--ink); color: var(--paper); }

        /* Carousel viewport + track */
        .ft-viewport {
          overflow: hidden;
          width: 100%;
          padding: 4px 2px;
        }
        .ft-track {
          display: flex;
          transition: transform 520ms cubic-bezier(0.4, 0.0, 0.2, 1);
          will-change: transform;
        }
        .ft-slot {
          flex: 0 0 auto;
          padding: 0 12px;
          box-sizing: border-box;
          min-width: 0;
        }

        /* Card */
        .ft-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 260px;
          padding: 22px;
          background: var(--paper);
          border: 1px solid var(--ink);
          color: inherit;
          position: relative;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
          box-shadow: 4px 4px 0 0 var(--rule);
        }
        .ft-card::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px; right: -1px;
          height: 3px;
          background: var(--red);
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .ft-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 0 var(--ink);
          border-color: var(--ink);
        }
        .ft-card:hover::before { opacity: 1; }

        .ft-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--rule);
        }
        .ft-icon-wrap {
          width: 52px;
          height: 52px;
          border: 1px solid var(--rule);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ft-icon {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }
        .ft-icon-fb {
          width: 100%;
          height: 100%;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--mono);
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ft-cat {
          font-family: var(--mono);
          font-size: var(--fs-tag);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--ink-muted);
          text-align: right;
          line-height: 1.3;
          padding-top: 4px;
          max-width: 50%;
        }

        .ft-name {
          font-family: var(--serif);
          font-weight: 900;
          font-size: 1.5rem;
          color: var(--ink);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }
        .ft-desc {
          font-family: var(--body);
          font-size: var(--fs-body);
          color: var(--ink-light, var(--ink-muted));
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .ft-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--rule);
        }
        .ft-cta {
          font-family: var(--mono);
          font-size: var(--fs-tag);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--red);
          font-weight: 600;
        }
        .ft-cta-arrow {
          font-family: var(--mono);
          color: var(--red);
          font-size: 1.1rem;
          transition: transform 220ms ease;
        }
        .ft-card:hover .ft-cta-arrow { transform: translateX(4px); }

        /* Dots */
        .ft-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding-top: 4px;
        }
        .ft-dot {
          width: 28px;
          height: 4px;
          background: var(--rule);
          border: 0;
          padding: 0;
          cursor: pointer;
          transition: background 220ms ease, width 220ms ease;
        }
        .ft-dot:hover { background: var(--ink-muted); }
        .ft-dot.is-on {
          background: var(--red);
          width: 44px;
        }

        @media (max-width: 640px) {
          .ft-slot { padding: 0 6px; }
          .ft-card { min-height: 240px; padding: 18px; }
          .ft-name { font-size: 1.3rem; }
        }
      `}</style>

      <style jsx global>{`
        .ft-card, .ft-card *, .ft-card:hover, .ft-card:hover * {
          text-decoration: none !important;
        }
      `}</style>
    </div>
  )
}

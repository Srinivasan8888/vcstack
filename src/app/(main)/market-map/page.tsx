'use client'

import Link from 'next/link'

/* ── Tool data (mirrors the IndianVCs Tech Stack 2026 poster) ───────────── */
interface Tool {
  n: string
  c: string
  d: string
  u?: string
  bg?: string
}

const D: Tool[] = [
  // CRM (12)
  { n: 'Affinity', c: 'CRM', d: 'affinity.co' },
  { n: 'Airtable', c: 'CRM', d: 'airtable.com' },
  { n: 'Asana', c: 'CRM', d: 'asana.com' },
  { n: 'Attio', c: 'CRM', d: 'attio.com' },
  { n: 'Clay', c: 'CRM', d: 'clay.com' },
  { n: 'EverTrace', c: 'CRM', d: 'evertrace.ai' },
  { n: 'Folk', c: 'CRM', d: 'folk.app' },
  { n: 'HubSpot', c: 'CRM', d: 'hubspot.com' },
  { n: 'Notion', c: 'CRM', d: 'notion.so' },
  { n: 'Pipedrive', c: 'CRM', d: 'pipedrive.com' },
  { n: 'Streak', c: 'CRM', d: 'streak.com' },
  { n: 'Taghash', c: 'CRM', d: 'taghash.io' },
  // Admin/Ops (4)
  { n: 'AngelList', c: 'Admin/Ops', d: 'angellistindia.com' },
  { n: 'Incentive Finance', c: 'Admin/Ops', d: 'incentiv.finance' },
  { n: 'Infynite Club', c: 'Admin/Ops', d: 'infinyte.club' },
  { n: 'LetsVenture', c: 'Admin/Ops', d: 'letsventure.com' },
  // Captable (3)
  { n: 'Carta', c: 'Captable', d: 'carta.com' },
  { n: 'Equity List', c: 'Captable', d: 'equitylist.com' },
  { n: 'Qapita', c: 'Captable', d: 'qapita.com' },
  // Data (13)
  { n: 'CB Insights', c: 'Data', d: 'cbinsights.com' },
  { n: 'Crunchbase', c: 'Data', d: 'crunchbase.com' },
  { n: 'Harmonic', c: 'Data', d: 'harmonic.ai' },
  { n: 'Inc42 Data Labs', c: 'Data', d: 'inc42.com' },
  { n: 'LinkedIn Sales Nav', c: 'Data', d: 'linkedin.com' },
  { n: 'PitchBook', c: 'Data', d: 'pitchbook.com' },
  { n: 'Preqin', c: 'Data', d: 'preqin.com' },
  { n: 'Private Circle', c: 'Data', d: 'privatecircle.co' },
  { n: 'Product Hunt', c: 'Data', d: 'producthunt.com' },
  { n: 'Sanchi Connect', c: 'Data', d: 'sanchiconnect.com' },
  { n: 'Tracxn', c: 'Data', d: 'tracxn.com' },
  { n: 'Twitter', c: 'Data', d: 'x.com' },
  { n: 'Venture Intelligence', c: 'Data', d: '', u: 'https://www.ventureintelligence.info/static/images/icon.png' },
  // Finance (3)
  { n: 'Darwin Box', c: 'Finance', d: 'darwinbox.com' },
  { n: 'Keka', c: 'Finance', d: 'keka.com' },
  { n: 'Zoho', c: 'Finance', d: 'zoho.com' },
  // Productivity (4)
  { n: 'Airtable', c: 'Productivity', d: 'airtable.com' },
  { n: 'Coda', c: 'Productivity', d: 'coda.io' },
  { n: 'Google Sheets', c: 'Productivity', d: 'google.com' },
  { n: 'Notion', c: 'Productivity', d: 'notion.so' },
  // Research (15)
  { n: '1Lattice', c: 'Research', d: '1lattice.com' },
  { n: 'Ahrefs', c: 'Research', d: 'ahrefs.com', u: 'https://assets-3b70.kxcdn.com/images/mediakit/logo_blue@2x.png?v=2' },
  { n: 'AlphaSense', c: 'Research', d: 'alpha-sense.com' },
  { n: 'Bain', c: 'Research', d: 'bain.com' },
  { n: 'Clearbit', c: 'Research', d: 'clearbit.com' },
  { n: 'Data AI', c: 'Research', d: 'data.ai' },
  { n: 'G2', c: 'Research', d: 'g2.com' },
  { n: 'GLG', c: 'Research', d: 'glginsights.com' },
  { n: 'Gartner', c: 'Research', d: 'gartner.com' },
  { n: 'Kavi Research', c: 'Research', d: 'joinkavi.com' },
  { n: 'Owler', c: 'Research', d: 'owler.com' },
  { n: 'RedSeer', c: 'Research', d: 'redseer.com' },
  { n: 'SEMRush', c: 'Research', d: 'semrush.com' },
  { n: 'Similarweb', c: 'Research', d: 'similarweb.com' },
  { n: 'Statista', c: 'Research', d: 'statista.com' },
  // Communication (4)
  { n: 'Discord', c: 'Communication', d: 'discord.com' },
  { n: 'Slack', c: 'Communication', d: 'slack.com' },
  { n: 'Telegram', c: 'Communication', d: 'telegram.org' },
  { n: 'WhatsApp', c: 'Communication', d: 'whatsapp.com' },
  // Vibe Coding (5)
  { n: 'Bolt', c: 'Vibe Coding', d: 'bolt.new' },
  { n: 'Emergent', c: 'Vibe Coding', d: 'emergent.sh' },
  { n: 'Lovable', c: 'Vibe Coding', d: 'lovable.dev' },
  { n: 'Replit', c: 'Vibe Coding', d: 'replit.com' },
  { n: 'v0', c: 'Vibe Coding', d: 'v0.dev' },
  // News (14)
  { n: 'Arc', c: 'News', d: 'thearcweb.com', bg: '#000' },
  { n: 'Economic Times', c: 'News', d: 'economictimes.indiatimes.com' },
  { n: 'Entrepreneur India', c: 'News', d: 'entrepreneur.com' },
  { n: 'Forbes', c: 'News', d: 'forbes.com' },
  { n: 'Inc42', c: 'News', d: 'inc42.com' },
  { n: 'Ken', c: 'News', d: 'the-ken.com' },
  { n: 'Live Mint', c: 'News', d: 'livemint.com' },
  { n: 'Money Control', c: 'News', d: 'moneycontrol.com' },
  { n: 'The Morning Context', c: 'News', d: 'themorningcontext.com' },
  { n: 'TechCrunch', c: 'News', d: 'techcrunch.com' },
  { n: 'The Generalist', c: 'News', d: 'generalist.com' },
  { n: 'VCCircle', c: 'News', d: 'vccircle.com' },
  { n: 'YourStory', c: 'News', d: 'yourstory.com' },
  { n: 'entrackr', c: 'News', d: 'entrackr.com' },
  // AI (7)
  { n: 'ChatGPT', c: 'AI', d: 'openai.com' },
  { n: 'Claude', c: 'AI', d: 'claude.ai' },
  { n: 'Gemini', c: 'AI', d: 'gemini.google.com' },
  { n: 'Manus', c: 'AI', d: 'manus.ai' },
  { n: 'MiniMax', c: 'AI', d: 'minimax.io' },
  { n: 'Perplexity', c: 'AI', d: 'perplexity.ai' },
  { n: 'Qwen', c: 'AI', d: 'qwen.ai' },
  // Voice to Text (4)
  { n: 'Aqua Voice', c: 'Voice to Text', d: 'aquavoice.com' },
  { n: 'Superwhisper', c: 'Voice to Text', d: 'superwhisper.ai' },
  { n: 'Willow Voice', c: 'Voice to Text', d: 'willowvoice.com' },
  { n: 'Wispr Flow', c: 'Voice to Text', d: 'wisprflow.com' },
  // Other Tools (23)
  { n: 'Axiom', c: 'Other Tools', d: 'axiom.co' },
  { n: 'Bardeen', c: 'Other Tools', d: 'bardeen.ai' },
  { n: 'Canva', c: 'Other Tools', d: 'canva.com' },
  { n: 'Chronicle HQ', c: 'Other Tools', d: 'chroniclehq.com' },
  { n: 'Circle', c: 'Other Tools', d: 'circle.so' },
  { n: 'Coresignal', c: 'Other Tools', d: 'coresignal.com' },
  { n: 'DocSend', c: 'Other Tools', d: 'docsend.com' },
  { n: 'Exa', c: 'Other Tools', d: 'exa.ai' },
  { n: 'Gamma', c: 'Other Tools', d: 'gamma.app' },
  { n: 'Getro', c: 'Other Tools', d: 'getro.com' },
  { n: 'Gumloop', c: 'Other Tools', d: 'gumloop.com' },
  { n: 'Icypeas', c: 'Other Tools', d: 'icypeas.com' },
  { n: 'Luma', c: 'Other Tools', d: 'lu.ma' },
  { n: 'Mailchimp', c: 'Other Tools', d: 'mailchimp.com' },
  { n: 'Medium', c: 'Other Tools', d: 'medium.com' },
  { n: 'Raycast', c: 'Other Tools', d: 'raycast.com' },
  { n: 'Substack', c: 'Other Tools', d: 'substack.com' },
  { n: 'Tally', c: 'Other Tools', d: 'tally.so' },
  { n: 'Trello', c: 'Other Tools', d: 'trello.com' },
  { n: 'Typeform', c: 'Other Tools', d: 'typeform.com' },
  { n: 'Webflow', c: 'Other Tools', d: 'webflow.com' },
  { n: 'Wizikey', c: 'Other Tools', d: 'wizikey.com' },
  { n: 'Zoom', c: 'Other Tools', d: 'zoom.us' },
  // Portfolio Mgmt (3)
  { n: 'Carta', c: 'Portfolio Mgmt', d: 'carta.com' },
  { n: 'Standard Metrics', c: 'Portfolio Mgmt', d: 'standardmetrics.io' },
  { n: 'Vestberry', c: 'Portfolio Mgmt', d: 'vestberry.com' },
  // Automation (4)
  { n: 'Make', c: 'Automation', d: 'make.com' },
  { n: 'Phantom Buster', c: 'Automation', d: 'phantombuster.com' },
  { n: 'Zapier', c: 'Automation', d: 'zapier.com' },
  { n: 'n8n', c: 'Automation', d: 'n8n.io' },
  // Mailing (4)
  { n: 'Notion Mail', c: 'Mailing', d: 'notion.so' },
  { n: 'Shortwave', c: 'Mailing', d: 'shortwave.com' },
  { n: 'Simplehuman', c: 'Mailing', d: 'simplehuman.email' },
  { n: 'Superhuman', c: 'Mailing', d: 'superhuman.com' },
  // Calendar (4)
  { n: 'Cal.com', c: 'Calendar', d: 'cal.com' },
  { n: 'Calendly', c: 'Calendar', d: 'calendly.com' },
  { n: 'Notion Calendar', c: 'Calendar', d: 'notion.so' },
  { n: 'Vimcal', c: 'Calendar', d: 'vimcal.com' },
  // Browser (6)
  { n: 'Arc', c: 'Browser', d: 'arc.net' },
  { n: 'Atlas', c: 'Browser', d: 'chatgpt.com' },
  { n: 'Brave', c: 'Browser', d: 'brave.com' },
  { n: 'Comet', c: 'Browser', d: 'perplexity.ai' },
  { n: 'Dia', c: 'Browser', d: 'diabrowser.com' },
  { n: 'Google Chrome', c: 'Browser', d: 'chrome.google.com' },
  // Transcription (6)
  { n: 'Circleback', c: 'Transcription', d: 'circleback.ai' },
  { n: 'Fathom', c: 'Transcription', d: 'fathom.ai' },
  { n: 'Fireflies', c: 'Transcription', d: 'fireflies.ai' },
  { n: 'Granola', c: 'Transcription', d: 'granola.so' },
  { n: 'Notion', c: 'Transcription', d: 'notion.so' },
  { n: 'Otter', c: 'Transcription', d: 'otter.ai' },
]

/* Desktop: 5-column layout (matches the printed poster). */
const COLS: string[][] = [
  ['CRM', 'Admin/Ops', 'Captable', 'Voice to Text', 'Mailing'],
  ['Data', 'Finance', 'Productivity', 'Calendar'],
  ['Research', 'Communication', 'Vibe Coding', 'Automation'],
  ['News', 'AI', 'Browser'],
  ['Other Tools', 'Portfolio Mgmt', 'Transcription'],
]

/* Mobile: flat vertical order following a VC workflow. */
const MOBILE_ORDER = [
  'CRM', 'Data', 'Research', 'News', 'AI',
  'Portfolio Mgmt', 'Captable', 'Finance',
  'Admin/Ops', 'Automation',
  'Communication', 'Mailing', 'Calendar',
  'Transcription', 'Voice to Text',
  'Productivity', 'Vibe Coding', 'Browser',
  'Other Tools',
]

const GRAD_PAIRS = [
  ['#D21905', '#AB342B'], ['#301008', '#5a2a1e'], ['#1a1a2e', '#16213e'],
  ['#0f3460', '#533483'], ['#2d6a4f', '#40916c'], ['#6930c3', '#5390d9'],
  ['#e85d04', '#dc2f02'], ['#7b2cbf', '#c77dff'], ['#3a0ca3', '#4895ef'],
  ['#495057', '#810100'],
]

function gradient(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  const [a, b] = GRAD_PAIRS[Math.abs(h) % GRAD_PAIRS.length]
  return `linear-gradient(135deg,${a},${b})`
}

function initials(name: string) {
  const w = name.trim().split(/\s+/)
  return w.length === 1
    ? w[0].substring(0, 2).toUpperCase()
    : (w[0][0] + w[1][0]).toUpperCase()
}

function ToolPill({ t }: { t: Tool }) {
  const src = t.u || (t.d ? `https://www.google.com/s2/favicons?domain=${t.d}&sz=128` : '')
  return (
    <div className="t" title={t.n + (t.d ? ` — ${t.d}` : '')}>
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          style={t.bg ? { background: t.bg } : undefined}
          onError={(e) => {
            const img = e.currentTarget
            const fb = document.createElement('div')
            fb.className = 't-fb'
            fb.textContent = initials(t.n)
            fb.style.background = gradient(t.n)
            img.replaceWith(fb)
          }}
        />
      ) : (
        <div className="t-fb" style={{ background: gradient(t.n) }}>{initials(t.n)}</div>
      )}
      <span>{t.n}</span>
    </div>
  )
}

function CategoryCard({ cat, tools }: { cat: string; tools: Tool[] }) {
  return (
    <div className="card">
      <div className="card-head"><span className="name">{cat}</span></div>
      <div className="tools">
        {tools.map((t, i) => <ToolPill key={`${t.n}-${i}`} t={t} />)}
      </div>
    </div>
  )
}

export default function MarketMapPage() {
  const grouped: Record<string, Tool[]> = {}
  D.forEach((t) => {
    if (!grouped[t.c]) grouped[t.c] = []
    grouped[t.c].push(t)
  })
  Object.values(grouped).forEach((list) => list.sort((a, b) => a.n.localeCompare(b.n)))

  return (
    <div
      className="page"
      style={{ padding: '24px 24px 64px', maxWidth: 'min(1600px, calc(100vw - 32px))' }}
    >
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">·</span>
        <span style={{ color: 'var(--ink)' }}>Market Map</span>
      </div>

      {/* ═══ Poster frame ═══════════════════════════════════════════ */}
      <div className="poster">
        {/* ── Header band ── */}
        <header className="header">
          <h1>
            <a
              href="https://indianvcs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="logo-link"
              title="Indian VCs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420.99 60.48" aria-label="Indian_VCs">
                <g>
                  <path fill="#f8f8ee" d="M0,59.04v-1.51l6.62-1.08V4.03L0,3.02v-1.58h21.17v1.58l-6.62,1.01v52.42l6.62,1.08v1.51H0Z" />
                  <path fill="#f8f8ee" d="M25.99,57.6l5.04-.72V23.9l-5.04-.72v-1.44h12.24v7.78c1.78-2.59,3.86-4.64,6.26-6.16,2.4-1.51,4.99-2.27,7.78-2.27,3.46,0,6.18.86,8.17,2.59,1.99,1.73,2.99,4.3,2.99,7.7v25.49l5.04.72v1.44h-16.56v-1.44l4.32-.72v-25.34c0-2.5-.5-4.43-1.51-5.8-1.01-1.37-2.57-2.05-4.68-2.05s-4.33.8-6.37,2.41c-2.04,1.61-3.85,3.59-5.44,5.94v24.84l4.32.72v1.44h-16.56v-1.44Z" />
                  <path fill="#f8f8ee" d="M81.07,57.35c-2.59-1.61-4.61-3.86-6.05-6.77-1.44-2.9-2.16-6.3-2.16-10.19s.72-7.28,2.16-10.19c1.44-2.9,3.46-5.15,6.05-6.73,2.59-1.58,5.59-2.38,9-2.38,2.78,0,5.21.73,7.27,2.2,2.06,1.46,3.7,3.47,4.9,6.01V3.6l-5.04-.72v-1.44h12.24v55.44l5.04.72v1.44h-12.24v-7.49c-1.2,2.54-2.83,4.55-4.9,6.01-2.06,1.46-4.49,2.2-7.27,2.2-3.41,0-6.41-.8-9-2.41ZM96.52,56.12c1.7-1.22,3.07-2.86,4.1-4.9,1.03-2.04,1.57-4.26,1.62-6.66v-8.28c-.05-2.4-.59-4.62-1.62-6.66-1.03-2.04-2.4-3.67-4.1-4.9-1.7-1.22-3.61-1.84-5.72-1.84-6.67,0-10.01,4.63-10.01,13.9v7.2c0,9.31,3.34,13.97,10.01,13.97,2.11,0,4.02-.61,5.72-1.84Z" />
                  <path fill="#f8f8ee" d="M118.01,59.04v-1.44l5.04-.72V23.98l-5.04-.72v-1.44h12.24v35.06l5.04.72v1.44h-17.28ZM122.18,11.99c-.96-.94-1.44-2.08-1.44-3.42s.47-2.47,1.4-3.38c.94-.91,2.1-1.37,3.49-1.37,1.3,0,2.4.46,3.31,1.37.91.91,1.37,2.04,1.37,3.38s-.46,2.48-1.37,3.42c-.91.94-2.02,1.4-3.31,1.4s-2.5-.47-3.46-1.4Z" />
                  <path fill="#f8f8ee" d="M143.06,57.35c-1.97-1.61-2.95-4-2.95-7.16,0-4.51,1.9-7.72,5.69-9.61,3.79-1.9,8.18-2.84,13.18-2.84h4.82v-5.54c0-2.5-.28-4.43-.83-5.8-.55-1.37-1.4-2.33-2.56-2.88-1.15-.55-2.71-.83-4.68-.83-2.26,0-3.94.44-5.04,1.33-1.11.89-1.66,2.08-1.66,3.56,0,1.39.67,2.3,2.02,2.74,0,1.2-.46,2.26-1.37,3.17s-1.99,1.37-3.24,1.37c-1.34,0-2.42-.37-3.24-1.12-.82-.74-1.22-1.88-1.22-3.42,0-2.78,1.39-5.02,4.18-6.7,2.78-1.68,6.26-2.52,10.44-2.52,9.6,0,14.4,4.18,14.4,12.53v20.59c0,1.06.23,1.86.68,2.41.46.55,1.12.83,1.98.83.82,0,1.46-.28,1.94-.83.48-.55.72-1.31.72-2.27h1.51c0,1.68-.54,3-1.62,3.96-1.08.96-2.58,1.44-4.5,1.44-2.21,0-4.07-.64-5.58-1.91-1.51-1.27-2.29-3.25-2.34-5.94-1.15,2.45-2.92,4.37-5.29,5.76s-5,2.09-7.88,2.09c-3.07,0-5.59-.8-7.56-2.41ZM158.58,55.44c1.37-.77,2.53-1.88,3.49-3.35.96-1.46,1.54-3.23,1.73-5.29v-7.49h-4.82c-3.94,0-6.88.88-8.82,2.63-1.94,1.75-2.92,4.21-2.92,7.38,0,2.64.62,4.51,1.87,5.62,1.25,1.1,3.07,1.66,5.47,1.66,1.3,0,2.63-.38,4-1.15Z" />
                  <path fill="#f8f8ee" d="M179.57,57.6l5.04-.72V23.9l-5.04-.72v-1.44h12.24v7.78c1.78-2.59,3.86-4.64,6.26-6.16,2.4-1.51,4.99-2.27,7.78-2.27,3.46,0,6.18.86,8.17,2.59,1.99,1.73,2.99,4.3,2.99,7.7v25.49l5.04.72v1.44h-16.56v-1.44l4.32-.72v-25.34c0-2.5-.5-4.43-1.51-5.8-1.01-1.37-2.57-2.05-4.68-2.05s-4.33.8-6.37,2.41c-2.04,1.61-3.85,3.59-5.44,5.94v24.84l4.32.72v1.44h-16.56v-1.44Z" />
                  <path fill="#f8f8ee" d="M313.49,60.48l-20.74-56.45-5.76-1.01v-1.58h21.1v1.58l-6.77.86,15.84,43.13,15.55-40.75-8.28-3.24v-1.58h15.48v1.58l-5.26,3.17-20.59,54.29h-.58Z" />
                  <path fill="#f8f8ee" d="M352.88,56.66c-3.94-2.54-6.97-6.1-9.11-10.66-2.14-4.56-3.2-9.82-3.2-15.77s1.09-11.22,3.28-15.8c2.18-4.58,5.28-8.14,9.29-10.66,4.01-2.52,8.63-3.78,13.86-3.78,2.06,0,4.16.36,6.3,1.08,2.13.72,4.07,1.73,5.8,3.02l4.82-4.1h1.51v17.86h-1.51l-4.46-11.16c-1.68-1.54-3.64-2.76-5.87-3.67-2.23-.91-4.43-1.37-6.59-1.37-3.36,0-6.32.86-8.89,2.59-2.57,1.73-4.57,4.25-6.01,7.56-1.44,3.31-2.16,7.25-2.16,11.81v13.18c0,4.56.7,8.5,2.09,11.81,1.39,3.31,3.34,5.84,5.83,7.6,2.5,1.75,5.42,2.63,8.78,2.63,2.45,0,4.9-.54,7.34-1.62,2.45-1.08,4.49-2.53,6.12-4.36l4.18-11.59h1.51v18.5h-1.51l-5.18-3.67c-1.73,1.39-3.7,2.47-5.9,3.24-2.21.77-4.39,1.15-6.55,1.15-5.23,0-9.82-1.27-13.75-3.82Z" />
                  <path fill="#f8f8ee" d="M397.73,57.24c-2.64-1.68-3.96-3.86-3.96-6.55,0-1.39.37-2.48,1.12-3.28.74-.79,1.74-1.19,2.99-1.19.96,0,1.78.24,2.45.72.67.48,1.15,1.15,1.44,2.02-1.06,1.15-1.58,2.38-1.58,3.67,0,1.49.67,2.78,2.02,3.89,1.34,1.1,3.14,1.66,5.4,1.66,3.02,0,5.5-.68,7.42-2.05,1.92-1.37,2.88-3.2,2.88-5.51,0-1.34-.41-2.35-1.22-3.02-.82-.67-2.4-1.44-4.75-2.3l-10.87-3.96c-4.27-1.54-6.41-4.39-6.41-8.57,0-3.41,1.18-6.2,3.53-8.39,2.35-2.18,5.59-3.28,9.72-3.28,3.41,0,6.32.78,8.75,2.34,2.42,1.56,3.64,3.78,3.64,6.66,0,1.15-.31,2.08-.94,2.77-.62.7-1.44,1.04-2.45,1.04s-1.84-.28-2.48-.83c-.65-.55-.97-1.31-.97-2.27.62-.48,1.05-1,1.3-1.55.24-.55.36-1.21.36-1.98,0-1.34-.59-2.45-1.76-3.31-1.18-.86-2.99-1.3-5.44-1.3-2.11,0-3.92.32-5.44.97s-2.65,1.5-3.42,2.56c-.77,1.06-1.15,2.14-1.15,3.24s.42,2.06,1.26,2.74c.84.67,2.39,1.42,4.64,2.23l10.08,3.6c2.35.86,4.13,2.06,5.33,3.6,1.2,1.54,1.8,3.53,1.8,5.98,0,3.5-1.1,6.41-3.31,8.71-2.21,2.3-5.57,3.46-10.08,3.46-3.94,0-7.22-.84-9.86-2.52Z" />
                  <rect fill="#d21905" x="258.9" y="26.26" width="7.92" height="57.6" transform="translate(317.92 -207.79) rotate(90)" />
                </g>
              </svg>
            </a>{' '}Tech Stack 2026
          </h1>
        </header>

        {/* ── Columns ── */}
        <div className="landscape landscape-desktop">
          {COLS.map((catList, idx) => (
            <div key={idx} className="col">
              {catList.map((cat) => {
                const tools = grouped[cat] || []
                if (!tools.length) return null
                return <CategoryCard key={cat} cat={cat} tools={tools} />
              })}
            </div>
          ))}
        </div>

        <div className="landscape landscape-mobile">
          {MOBILE_ORDER.map((cat) => {
            const tools = grouped[cat] || []
            if (!tools.length) return null
            return <CategoryCard key={cat} cat={cat} tools={tools} />
          })}
        </div>

        <div className="disclaimer">
          This market map is for informational purposes only and reflects publicly available data + editorial curation • Not exhaustive • No ranking, recommendation, or endorsement is implied • All trademarks/logos are the property of their respective owners
        </div>

        <footer className="poster-footer">
          <span>Discover tools &amp; workflows used by the top 1% VCs</span>
          <span className="footer-sep">→</span>
          <a
            href="https://hub.indianvcs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            hub.indianvcs.com
          </a>
        </footer>
      </div>

      <style jsx>{`
        /* ── Poster frame ──────────────────────────── */
        .poster {
          background: #f8f4ea;
          border: 1px solid #2a0a05;
          box-shadow: 8px 8px 0 rgba(26, 20, 16, 0.08);
          overflow: hidden;
          margin-top: 20px;
        }

        /* ── Header band ── */
        .header {
          background: #2a0a05;
          padding: 26px 24px 24px;
          text-align: center;
          border-bottom: 1px solid #0e0402;
        }
        .header h1 {
          font-family: var(--serif);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(1.6rem, 3.2vw, 2.4rem);
          color: #f8f8ee;
          letter-spacing: 0.01em;
          line-height: 1.2;
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .logo-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          line-height: 0;
        }
        .logo-link svg {
          height: clamp(28px, 3vw, 40px);
          width: auto;
          display: block;
        }

        /* ── Columns ── */
        .landscape {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 18px;
        }
        .landscape-desktop { display: flex; }
        .landscape-mobile  { display: none; flex-direction: column; gap: 12px; }

        .col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }

        /* ── Category card (dark head + cream body) ── */
        :global(.poster .card) {
          background: #fdfaf2;
          border: 1px solid #2a0a05;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        :global(.poster .card-head) {
          background: #2a0a05;
          padding: 5px 10px;
        }
        :global(.poster .card-head .name) {
          font-family: var(--mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f8f8ee;
        }
        :global(.poster .tools) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px 6px;
          padding: 8px 8px 10px;
        }

        /* ── Disclaimer line ── */
        .disclaimer {
          font-family: var(--body);
          font-size: 0.7rem;
          color: var(--ink-muted);
          text-align: center;
          padding: 10px 24px 16px;
          line-height: 1.5;
        }

        /* ── Red CTA footer ── */
        .poster-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          background: var(--red);
          color: #fff;
          font-family: var(--serif);
          font-weight: 600;
          font-size: 1.05rem;
          padding: 16px 20px;
        }
        .footer-sep { opacity: 0.9; }
        .footer-link {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .footer-link:hover { opacity: 0.88; }
      `}</style>

      {/* Tool pill styling — :global so child components match */}
      <style jsx global>{`
        .poster .t {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e6dfcd;
          border-radius: 6px;
          padding: 4px 6px;
          background: #fdfaf2;
          white-space: nowrap;
          min-width: 0;
          overflow: hidden;
          transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
        }
        .poster .t:hover {
          border-color: #2a0a05;
          background: #f7efde;
          transform: translateY(-1px);
        }
        .poster .t img {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          object-fit: contain;
          flex-shrink: 0;
          background: #fff;
        }
        .poster .t-fb {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
        }
        .poster .t span {
          font-family: var(--body);
          font-size: 0.8rem;
          font-weight: 500;
          color: #1a0603;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 900px) {
          .poster .landscape-desktop { display: none !important; }
          .poster .landscape-mobile  { display: flex !important; }
          .poster .tools {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 4px 8px;
          }
        }
        @media (max-width: 480px) {
          .poster .tools { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

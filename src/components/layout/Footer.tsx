import Link from 'next/link'

const FOOTER_LINKS = {
  Explore: [
    { label: 'Blog',            href: '/blog' },
    { label: 'Submit Product',  href: '/submit-product' },
    { label: 'Share your stack', href: '/share-stack' },
    { label: 'Newsletter',      href: '/newsletter' },
  ],
  'Our other ventures': [
    { label: 'Startup&VC', href: 'https://startupandvc.com', external: true },
    { label: 'GoingVC',    href: 'https://goingvc.com',      external: true },
  ],
  'About Us': [
    { label: 'Contact',        href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Imprint',        href: '/imprint' },
  ],
}

/* Social icons as inline SVGs (no lucide dependency on removed icons) */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:py-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="h-8 w-8 shrink-0">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  <rect x="1" y="1" width="13" height="13" rx="2.5" fill="#3B5BDB"/>
                  <rect x="18" y="1" width="13" height="13" rx="2.5" fill="#3B5BDB"/>
                  <rect x="1" y="18" width="13" height="13" rx="2.5" fill="#3B5BDB"/>
                  <rect x="18" y="18" width="13" height="13" rx="2.5" fill="#74C0FC"/>
                </svg>
              </div>
              <span className="font-bold text-sm text-foreground">VC Stack</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The place to go for your venture capital tool stack
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: LinkedInIcon,  href: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: TwitterIcon,   href: 'https://twitter.com',  label: 'Twitter'  },
                { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-foreground mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VCStack.io · All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

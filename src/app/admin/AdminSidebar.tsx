'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  ClipboardList,
  Star,
  Layers,
  ExternalLink,
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard',   href: '/admin/dashboard',    icon: LayoutDashboard },
  { label: 'Tools',       href: '/admin/tools',        icon: Wrench },
  { label: 'Categories',  href: '/admin/categories',   icon: FolderOpen },
  { label: 'Submissions', href: '/admin/submissions',  icon: ClipboardList },
  { label: 'Reviews',     href: '/admin/reviews',      icon: Star },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-border">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/20 ring-1 ring-primary/40">
          <Layers className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-none">VCStack</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Back to site
        </Link>
        <div className="flex items-center gap-2.5 rounded-md px-3 py-2">
          <UserButton
            afterSignOutUrl="/admin/login"
            appearance={{
              elements: {
                avatarBox: 'h-6 w-6',
              },
            }}
          />
          <span className="text-sm text-muted-foreground">Account</span>
        </div>
      </div>
    </aside>
  )
}

import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export const metadata = { title: { template: '%s | Admin – VCStack.io', default: 'Admin' } }

// In production, replace with real session check via NextAuth getServerSession
async function requireAdmin() {
  // TODO: wire up getServerSession(authOptions) here
  return true
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="fixed inset-0 flex bg-[oklch(0.08_0.025_265)] text-foreground overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        {children}
      </div>
    </div>
  )
}

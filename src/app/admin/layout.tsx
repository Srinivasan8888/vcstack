import { isAuthenticated } from '@/lib/auth'
import AdminSidebar from './AdminSidebar'

export const metadata = { title: { template: '%s | Admin – IndianVCs', default: 'Admin' } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Middleware protects /admin/* except /admin/login.
  // If unauthenticated here, we must be on /admin/login → render standalone.
  const authed = await isAuthenticated()
  if (!authed) return <>{children}</>

  return (
    <div className="fixed inset-0 flex overflow-hidden" style={{ background: 'var(--paper)' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-auto">{children}</div>
    </div>
  )
}

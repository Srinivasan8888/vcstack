import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export const metadata = { title: { template: '%s | Admin – VCStack', default: 'Admin' } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/admin/login')

  return (
    <div className="fixed inset-0 flex bg-[oklch(0.08_0.025_265)] text-foreground overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        {children}
      </div>
    </div>
  )
}

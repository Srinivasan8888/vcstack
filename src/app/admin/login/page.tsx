import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Login' }

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[oklch(0.08_0.025_265)] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">VCStack Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to access the admin panel</p>
        </div>
        <SignIn
          forceRedirectUrl="/admin/dashboard"
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-[oklch(0.13_0.025_265)] border border-white/10 shadow-xl rounded-xl',
              headerTitle: 'text-white',
              headerSubtitle: 'text-gray-400',
              socialButtonsBlockButton: 'border-white/10 text-white hover:bg-white/5',
              dividerLine: 'bg-white/10',
              dividerText: 'text-gray-500',
              formFieldLabel: 'text-gray-300',
              formFieldInput: 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/60',
              formButtonPrimary: 'bg-primary hover:bg-primary/90',
              footerActionLink: 'text-primary hover:text-primary/80',
              identityPreviewText: 'text-gray-300',
              identityPreviewEditButton: 'text-primary',
            },
          }}
        />
      </div>
    </div>
  )
}

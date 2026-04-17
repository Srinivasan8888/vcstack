import Navbar from './Navbar'
import Footer from './Footer'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--paper)' }}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

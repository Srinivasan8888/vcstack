import type { Metadata } from 'next'
import { CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Submissions' }

async function getSubmissions() {
  try {
    const { prisma } = await import('@/lib/db/prisma')
    return await prisma.submission.findMany({
      include: { submitter: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

const STATUS_STYLES: Record<string, string> = {
  PENDING:  'bg-amber-500/15 text-amber-400 border-amber-500/25',
  APPROVED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  REJECTED: 'bg-red-500/15 text-red-400 border-red-500/25',
}

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions()

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Submissions</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {submissions.filter((s: any) => s.status === 'PENDING').length} pending review
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-muted-foreground text-sm">No submissions yet</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>
                {['Tool', 'URL', 'Submitted By', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {submissions.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground max-w-xs truncate">{sub.toolName}</td>
                  <td className="px-4 py-3">
                    <a href={sub.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-xs transition-colors truncate block max-w-[160px]">
                      {sub.websiteUrl.replace(/^https?:\/\//, '')}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{sub.submitter?.email ?? '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[sub.status]}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {sub.status === 'PENDING' && (
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                          <CheckCircle className="h-3.5 w-3.5" /> Approve
                        </button>
                        <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
                          <XCircle className="h-3.5 w-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

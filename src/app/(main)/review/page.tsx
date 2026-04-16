import type { Metadata } from 'next'
import ReviewForm from './ReviewForm'

export const metadata: Metadata = {
  title: 'Write a Review',
  description: 'Share your experience with a VC tool.',
}

interface Props {
  searchParams: Promise<{ tool?: string }>
}

export default async function ReviewPage({ searchParams }: Props) {
  const { tool } = await searchParams
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 ring-1 ring-primary/30 mb-4 text-xl">
          ⭐
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Write a Review</h1>
        <p className="text-muted-foreground text-sm">
          Help other VC professionals make informed tool decisions.
        </p>
      </div>
      <ReviewForm defaultToolSlug={tool} />
    </div>
  )
}

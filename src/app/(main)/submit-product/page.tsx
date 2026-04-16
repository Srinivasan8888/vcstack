import type { Metadata } from 'next'
import SubmitProductForm from './SubmitProductForm'
import { getCategories } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Submit a Tool',
  description: 'Add your VC tool to the VCStack.io directory.',
}

export default async function SubmitProductPage() {
  const categories = await getCategories()
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 ring-1 ring-primary/30 mb-4 text-xl">
          🚀
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Submit a Tool</h1>
        <p className="text-muted-foreground text-sm">
          Know a tool that belongs in the VCStack directory? Submit it and we'll review
          it within 48 hours.
        </p>
      </div>
      <SubmitProductForm categories={categories} />
    </div>
  )
}

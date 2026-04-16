'use client'

import { useActionState, useState } from 'react'
import { Star } from 'lucide-react'
import { submitReview, type SubmitReviewState } from '@/server/actions/submissions'

const initial: SubmitReviewState = { success: false, message: '' }

export default function ReviewForm({ defaultToolSlug }: { defaultToolSlug?: string }) {
  const [state, action, pending] = useActionState(submitReview, initial)
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)

  if (state.success) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <p className="text-3xl mb-3">🙏</p>
        <h2 className="text-lg font-semibold text-foreground mb-2">Review submitted!</h2>
        <p className="text-sm text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      {state.message && !state.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </div>
      )}

      {/* Tool slug (hidden or text) */}
      {defaultToolSlug ? (
        <input type="hidden" name="toolSlug" value={defaultToolSlug} />
      ) : (
        <Field label="Tool Slug" name="toolSlug" required error={state.errors?.toolSlug?.[0]}>
          <input type="text" name="toolSlug" placeholder="e.g. affinity" required className={inputCls} />
        </Field>
      )}

      {/* Star rating */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Rating <span className="text-destructive">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  n <= (hovered || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <Field label="Your Review" name="content" required error={state.errors?.content?.[0]}>
        <textarea
          name="content"
          rows={5}
          required
          placeholder="Share your experience — what you liked, what could be improved…"
          className={`${inputCls} resize-none`}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Your Name" name="reviewerName" required error={state.errors?.reviewerName?.[0]}>
          <input type="text" name="reviewerName" placeholder="Jane Smith" required className={inputCls} />
        </Field>
        <Field label="Your Email" name="reviewerEmail" required error={state.errors?.reviewerEmail?.[0]}>
          <input type="email" name="reviewerEmail" placeholder="you@example.com" required className={inputCls} />
        </Field>
      </div>

      <p className="text-xs text-muted-foreground">
        Your email won&apos;t be displayed publicly. Reviews are moderated before publication.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}

function Field({
  label, name, required, error, children,
}: {
  label: string; name: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full rounded-lg border border-border bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'

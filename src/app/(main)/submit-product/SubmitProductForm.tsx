'use client'

import { useActionState } from 'react'
import { submitTool, type SubmitToolState } from '@/server/actions/submissions'
import type { Category } from '@/lib/types'

const initial: SubmitToolState = { success: false, message: '' }

export default function SubmitProductForm({ categories }: { categories: Category[] }) {
  const [state, action, pending] = useActionState(submitTool, initial)

  if (state.success) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <p className="text-3xl mb-3">🎉</p>
        <h2 className="text-lg font-semibold text-foreground mb-2">Submission received!</h2>
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

      <Field label="Tool Name" name="toolName" required error={state.errors?.toolName?.[0]}>
        <input
          type="text"
          name="toolName"
          placeholder="e.g. Affinity"
          required
          className={inputCls}
        />
      </Field>

      <Field label="Website URL" name="websiteUrl" required error={state.errors?.websiteUrl?.[0]}>
        <input
          type="url"
          name="websiteUrl"
          placeholder="https://example.com"
          required
          className={inputCls}
        />
      </Field>

      <Field label="Category" name="categoryId" required error={state.errors?.categoryId?.[0]}>
        <select name="categoryId" required className={inputCls}>
          <option value="">Select a category…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </Field>

      <Field label="Description" name="description" required error={state.errors?.description?.[0]}>
        <textarea
          name="description"
          rows={4}
          required
          placeholder="Describe what the tool does and why VCs use it…"
          className={`${inputCls} resize-none`}
        />
      </Field>

      <Field label="Your Email" name="submitterEmail" required error={state.errors?.submitterEmail?.[0]}>
        <input
          type="email"
          name="submitterEmail"
          placeholder="you@example.com"
          required
          className={inputCls}
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? 'Submitting…' : 'Submit Tool for Review'}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string
  name: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full rounded-lg border border-border bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'

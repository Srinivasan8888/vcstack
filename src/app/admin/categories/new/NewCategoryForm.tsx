'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createCategory, type CreateState } from './actions'

const initialState: CreateState = { ok: false, message: '' }

export default function NewCategoryForm({ dbAvailable }: { dbAvailable: boolean }) {
  const [state, formAction, isPending] = useActionState(createCategory, initialState)

  return (
    <form
      action={formAction}
      style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}
    >
      {!dbAvailable && (
        <div
          style={{
            padding: '12px 16px',
            background: 'var(--paper-alt)',
            border: '1px solid var(--red)',
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--red)',
          }}
        >
          ⚠ Database not available — new sections cannot be persisted in this environment.
        </div>
      )}

      {state.message && (
        <div
          style={{
            padding: '12px 16px',
            background: state.ok ? 'var(--paper-alt)' : 'rgba(192, 57, 43, 0.08)',
            border: `1px solid ${state.ok ? 'var(--rule)' : 'var(--red)'}`,
            fontFamily: 'var(--body)',
            fontSize: 'var(--fs-body)',
            color: state.ok ? 'var(--ink)' : 'var(--red)',
          }}
        >
          {state.message}
        </div>
      )}

      <Field label="Name" name="name" required error={state.fieldErrors?.name?.[0]} />

      <Field
        label="Slug"
        name="slug"
        required
        hint="Lowercase letters, numbers, hyphens. Used in URLs: /category/<slug>"
        error={state.fieldErrors?.slug?.[0]}
      />

      <Field
        label="Icon (emoji)"
        name="icon"
        hint="Single emoji, e.g. 🤝"
        error={state.fieldErrors?.icon?.[0]}
      />

      <TextareaField
        label="Description"
        name="description"
        rows={4}
        error={state.fieldErrors?.description?.[0]}
      />

      <div
        style={{
          display: 'flex',
          gap: 8,
          paddingTop: 12,
          borderTop: '1px solid var(--rule)',
          marginTop: 8,
        }}
      >
        <button
          type="submit"
          className="btn btn--primary"
          disabled={isPending || !dbAvailable}
        >
          {isPending ? 'Creating…' : 'Create section'}
        </button>
        <Link href="/admin/categories" className="btn btn--ghost">
          Cancel
        </Link>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  required,
  hint,
  error,
}: {
  label: string
  name: string
  required?: boolean
  hint?: string
  error?: string
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="label">
        {label}
        {required && <span style={{ color: 'var(--red)' }}> *</span>}
      </span>
      <input
        name={name}
        required={required}
        className="input"
        style={{
          padding: '8px 12px',
          fontSize: 'var(--fs-body)',
          borderColor: error ? 'var(--red)' : undefined,
        }}
      />
      {hint && !error && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-tag)', color: 'var(--ink-muted)' }}>
          {hint}
        </span>
      )}
      {error && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-tag)', color: 'var(--red)' }}>
          {error}
        </span>
      )}
    </label>
  )
}

function TextareaField({
  label,
  name,
  rows,
  error,
}: {
  label: string
  name: string
  rows?: number
  error?: string
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="label">{label}</span>
      <textarea
        name={name}
        rows={rows ?? 3}
        className="textarea"
        style={{
          padding: '8px 12px',
          fontSize: 'var(--fs-body)',
          fontFamily: 'var(--body)',
          resize: 'vertical',
          borderColor: error ? 'var(--red)' : undefined,
        }}
      />
      {error && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-tag)', color: 'var(--red)' }}>
          {error}
        </span>
      )}
    </label>
  )
}

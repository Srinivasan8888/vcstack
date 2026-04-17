'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { updateCategory, deleteCategory, type UpdateState } from './actions'
import type { Category } from '@/lib/types'

const initialState: UpdateState = { ok: false, message: '' }

export default function EditCategoryForm({
  category,
  dbAvailable,
}: {
  category: Category
  dbAvailable: boolean
}) {
  const action = updateCategory.bind(null, category.id)
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <form
      action={formAction}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 720,
      }}
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
          ⚠ Database not available — edits cannot be persisted in this environment.
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

      <Field
        label="Name"
        name="name"
        defaultValue={category.name}
        required
        error={state.fieldErrors?.name?.[0]}
      />

      <Field
        label="Slug"
        name="slug"
        defaultValue={category.slug}
        required
        hint="Lowercase letters, numbers, hyphens. Used in URLs: /category/<slug>"
        error={state.fieldErrors?.slug?.[0]}
      />

      <Field
        label="Icon (emoji)"
        name="icon"
        defaultValue={category.icon ?? ''}
        hint="Single emoji, e.g. 🤝"
        error={state.fieldErrors?.icon?.[0]}
      />

      <TextareaField
        label="Description"
        name="description"
        defaultValue={category.description ?? ''}
        rows={4}
        error={state.fieldErrors?.description?.[0]}
      />

      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          borderTop: '1px solid var(--rule)',
          marginTop: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={isPending || !dbAvailable}
          >
            {isPending ? 'Saving…' : 'Save changes'}
          </button>
          <Link href="/admin/categories" className="btn btn--ghost">
            Cancel
          </Link>
        </div>

        {dbAvailable && (
          <DeleteButton
            id={category.id}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
          />
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  defaultValue,
  required,
  hint,
  error,
}: {
  label: string
  name: string
  defaultValue?: string
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
        defaultValue={defaultValue}
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
  defaultValue,
  rows,
  error,
}: {
  label: string
  name: string
  defaultValue?: string
  rows?: number
  error?: string
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="label">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
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

function DeleteButton({
  id,
  confirmDelete,
  setConfirmDelete,
}: {
  id: string
  confirmDelete: boolean
  setConfirmDelete: (v: boolean) => void
}) {
  return (
    <form action={deleteCategory.bind(null, id)}>
      {confirmDelete ? (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'var(--fs-tag)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--red)',
            }}
          >
            Confirm?
          </span>
          <button
            type="submit"
            className="btn"
            style={{ borderColor: 'var(--red)', color: 'var(--red)' }}
          >
            Yes, delete
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setConfirmDelete(false)}
          >
            No
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn--ghost"
          style={{ color: 'var(--red)', borderColor: 'var(--red)' }}
          onClick={() => setConfirmDelete(true)}
        >
          Delete
        </button>
      )}
    </form>
  )
}

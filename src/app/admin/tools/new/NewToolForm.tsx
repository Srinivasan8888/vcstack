'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createTool } from './actions'
import { ToolFormFields } from '../_form/ToolFormFields'
import type { ToolActionState } from '../_form/toolSchema'
import type { Category } from '@/lib/types'

const initialState: ToolActionState = { ok: false, message: '' }

export default function NewToolForm({
  categories,
  dbAvailable,
}: {
  categories: Category[]
  dbAvailable: boolean
}) {
  const [state, formAction, isPending] = useActionState(createTool, initialState)

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
          ⚠ Database not available — new entries cannot be persisted in this environment.
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

      <ToolFormFields categories={categories} errors={state.fieldErrors} />

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
          {isPending ? 'Creating…' : 'Create entry'}
        </button>
        <Link href="/admin/tools" className="btn btn--ghost">
          Cancel
        </Link>
      </div>
    </form>
  )
}

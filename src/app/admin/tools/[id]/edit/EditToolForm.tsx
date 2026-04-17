'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { updateTool, deleteTool } from './actions'
import { ToolFormFields } from '../../_form/ToolFormFields'
import type { ToolActionState } from '../../_form/toolSchema'
import type { Category, Tool } from '@/lib/types'

const initialState: ToolActionState = { ok: false, message: '' }

export default function EditToolForm({
  tool,
  categories,
  dbAvailable,
}: {
  tool: Tool
  categories: Category[]
  dbAvailable: boolean
}) {
  const action = updateTool.bind(null, tool.id)
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [confirmDelete, setConfirmDelete] = useState(false)

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

      <ToolFormFields tool={tool} categories={categories} errors={state.fieldErrors} />

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
          <Link href="/admin/tools" className="btn btn--ghost">
            Cancel
          </Link>
        </div>

        {dbAvailable && (
          <DeleteButton
            id={tool.id}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
          />
        )}
      </div>
    </form>
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
    <form action={deleteTool.bind(null, id)}>
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

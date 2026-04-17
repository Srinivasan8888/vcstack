'use client'

import { useActionState, useState } from 'react'
import { submitReview, type SubmitReviewState } from '@/server/actions/submissions'

const initial: SubmitReviewState = { success: false, message: '' }

export default function ReviewForm({ defaultToolSlug }: { defaultToolSlug?: string }) {
  const [state, action, pending] = useActionState(submitReview, initial)
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)

  if (state.success) {
    return (
      <div
        style={{
          border: '2px solid var(--ink)',
          padding: 40,
          textAlign: 'center',
          background: 'var(--paper-alt)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--success)',
            marginBottom: 14,
          }}
        >
          Received · Queued for Moderation
        </div>
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            fontSize: '1.8rem',
            color: 'var(--ink)',
            marginBottom: 12,
            lineHeight: 1.1,
          }}
        >
          Thank you for the letter.
        </h2>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: 'var(--ink-light)',
          }}
        >
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {state.message && !state.success && (
        <div
          style={{
            border: '1px solid var(--red)',
            background: 'rgba(192, 57, 43, 0.06)',
            padding: '12px 16px',
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--red)',
          }}
        >
          {state.message}
        </div>
      )}

      {defaultToolSlug ? (
        <input type="hidden" name="toolSlug" value={defaultToolSlug} />
      ) : (
        <Field label="Tool Slug" name="toolSlug" required error={state.errors?.toolSlug?.[0]}>
          <input type="text" name="toolSlug" placeholder="e.g. affinity" required style={inputStyle} />
        </Field>
      )}

      <div>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--ink)',
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          Rating <span style={{ color: 'var(--red)', marginLeft: 4 }}>*</span>
        </label>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n <= (hovered || rating)
            return (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '1.8rem',
                  color: active ? 'var(--red)' : 'var(--rule-heavy)',
                  lineHeight: 1,
                }}
                aria-label={`${n} stars`}
              >
                ★
              </button>
            )
          })}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <Field label="Your Review" name="content" required error={state.errors?.content?.[0]}>
        <textarea
          name="content"
          rows={6}
          required
          placeholder="Share your experience — what you liked, what could be improved…"
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--body)' }}
        />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Your Name" name="reviewerName" required error={state.errors?.reviewerName?.[0]}>
          <input type="text" name="reviewerName" placeholder="Jane Smith" required style={inputStyle} />
        </Field>
        <Field label="Your Email" name="reviewerEmail" required error={state.errors?.reviewerEmail?.[0]}>
          <input type="email" name="reviewerEmail" placeholder="you@example.com" required style={inputStyle} />
        </Field>
      </div>

      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 'var(--fs-tag)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--ink-muted)',
        }}
      >
        Email held in confidence · Letters moderated before publication
      </p>

      <button
        type="submit"
        disabled={pending}
        className="btn btn--primary"
        style={{ marginTop: 4 }}
      >
        {pending ? 'Sending…' : 'Send Letter →'}
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
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontFamily: 'var(--mono)',
          fontSize: 'var(--fs-tag)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--ink)',
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--red)', marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {error && (
        <p
          style={{
            marginTop: 6,
            fontFamily: 'var(--mono)',
            fontSize: 'var(--fs-tag)',
            color: 'var(--red)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--paper)',
  border: '1px solid var(--ink)',
  padding: '10px 12px',
  fontFamily: 'var(--body)',
  fontSize: '1rem',
  color: 'var(--ink)',
  borderRadius: 0,
  outline: 'none',
}

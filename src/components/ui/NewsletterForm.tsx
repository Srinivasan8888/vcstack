'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <p
        style={{
          fontFamily: 'var(--body)',
          fontSize: 'var(--fs-body)',
          color: 'var(--success)',
          marginTop: 12,
        }}
      >
        <strong>Subscribed.</strong> Your confirmation is on its way.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: 8, marginTop: 12, maxWidth: 420 }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@fund.com"
        required
        className="input"
        style={{ flex: 1 }}
      />
      <button type="submit" className="btn btn--primary">Subscribe</button>
    </form>
  )
}

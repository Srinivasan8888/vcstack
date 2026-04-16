'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-sm font-medium text-emerald-600 mt-4">
        Thanks for subscribing! You&apos;ll hear from us soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2 max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 h-10 rounded-lg border border-border bg-secondary px-3 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-white hover:opacity-85 transition-opacity"
      >
        <Send className="h-3.5 w-3.5" />
        Subscribe
      </button>
    </form>
  )
}

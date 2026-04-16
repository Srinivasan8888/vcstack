'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

interface SearchBoxProps {
  defaultValue?: string
  placeholder?: string
  className?: string
}

export default function SearchBox({
  defaultValue = '',
  placeholder = 'Search tools, categories, use cases…',
  className = '',
}: SearchBoxProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative mx-auto w-full max-w-2xl ${className}`}
    >
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-border bg-white pl-11 pr-28 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 h-8 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}

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
      className={`relative mx-auto w-full max-w-xl ${className}`}
    >
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-13 w-full rounded-full border border-white/80 bg-white/90 backdrop-blur-sm pl-11 pr-5 text-sm text-foreground placeholder:text-gray-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200/50 transition-all shadow-md"
        />
      </div>
    </form>
  )
}

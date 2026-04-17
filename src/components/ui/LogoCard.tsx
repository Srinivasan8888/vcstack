'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'

interface LogoCardProps {
  name: string
  logoUrl?: string | null
  size?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
  delay?: string   // e.g. "0.5s"
  duration?: string // e.g. "3.2s"
}

export default function LogoCard({
  name,
  logoUrl,
  size = 'md',
  style,
  delay = '0s',
  duration = '3.5s',
}: LogoCardProps) {
  const [imgFailed, setImgFailed] = useState(false)

  const outer =
    size === 'lg' ? 'h-[60px] w-[60px]' :
    size === 'sm' ? 'h-[38px] w-[38px]' :
                    'h-[48px] w-[48px]'

  const inner =
    size === 'lg' ? 'h-8 w-8 text-sm' :
    size === 'sm' ? 'h-5 w-5 text-[9px]' :
                    'h-6 w-6 text-[10px]'

  const imgSize =
    size === 'lg' ? 'h-8 w-8' :
    size === 'sm' ? 'h-5 w-5' :
                    'h-6 w-6'

  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const hue = (name.charCodeAt(0) * 53 + (name.charCodeAt(1) ?? 0) * 37) % 360

  const showImage = !!logoUrl && !imgFailed

  return (
    <div
      className={`absolute ${outer} rounded-2xl bg-white flex items-center justify-center overflow-hidden`}
      style={{
        boxShadow: '0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        animation: `float ${duration} ease-in-out infinite`,
        animationDelay: delay,
        ...style,
      }}
    >
      {showImage ? (
        <img
          src={logoUrl!}
          alt={name}
          className={`${imgSize} object-contain`}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className={`${inner} rounded-xl flex items-center justify-center font-bold text-white`}
          style={{ background: `oklch(0.52 0.18 ${hue})` }}
        >
          {initials}
        </div>
      )}
    </div>
  )
}

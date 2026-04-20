'use client'

import type { MouseEvent, ReactNode } from 'react'

// Dispatches a window event the FreeWeekForm listens for. Bypasses Next.js
// <Link> routing entirely so clicks always open the modal reliably, even on
// the same page where the hash target doesn't exist in the DOM.
export function FreeWeekTrigger({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        onClick?.(e)
        window.dispatchEvent(new Event('freeweek:open'))
      }}
    >
      {children}
    </button>
  )
}

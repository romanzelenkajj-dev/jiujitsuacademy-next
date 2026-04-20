'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { type Locale, routeMap } from '@/lib/i18n'
import { getDict } from '@/content'
import { FreeWeekTrigger } from './FreeWeekTrigger'

export function MobileMenu({ locale }: { locale: Locale }) {
  const dict = getDict(locale)
  const [open, setOpen] = useState(false)

  const prefix = `/${locale}`
  const r = (key: keyof typeof routeMap) =>
    prefix + (routeMap[key][locale] === '/' ? '' : routeMap[key][locale])

  const nav = [
    { href: r('home'), label: dict.nav.home },
    { href: r('rozvrh'), label: dict.nav.rozvrh },
    { href: r('clenstvo'), label: dict.nav.clenstvo },
    { href: r('twoPercent'), label: dict.nav.twoPercent },
    { href: r('kontakt'), label: dict.nav.kontakt },
  ]

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        type="button"
        aria-label={open ? dict.nav.close ?? 'Close' : dict.nav.menu ?? 'Menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] md:hidden"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Full-screen drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-ink-900 md:hidden"
          role="dialog"
          aria-modal="true"
          style={{ height: '100dvh' }}
        >
          <div className="flex h-full flex-col">
            {/* Top row mirrors the header so it feels continuous */}
            <div className="flex h-[140px] shrink-0 items-center justify-between px-6">
              <Link
                href={r('home')}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-white"
                aria-label="Jiu-Jitsu Academy Bratislava"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-white.svg"
                  alt="Jiu-Jitsu Academy Bratislava"
                  className="h-[120px] w-auto"
                />
              </Link>
              <button
                type="button"
                aria-label={dict.nav.close ?? 'Close'}
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-8">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 text-2xl font-semibold tracking-tight text-white/90 transition hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <FreeWeekTrigger
                className="btn-primary mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                {dict.nav.cta} →
              </FreeWeekTrigger>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

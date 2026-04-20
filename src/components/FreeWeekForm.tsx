'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { getDict } from '@/content'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Opens when any FreeWeekTrigger button is clicked (dispatches 'freeweek:open').
// Also honors deep links like /sk#free-week so shared URLs work.
export function FreeWeekForm({ locale }: { locale: Locale }) {
  const dict = getDict(locale).freeWeek
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    // Primary: any FreeWeekTrigger click dispatches this event.
    const openHandler = () => setOpen(true)
    window.addEventListener('freeweek:open', openHandler)

    // Legacy fallback: still honor deep links like /sk#free-week so shared
    // URLs work and any remaining hash-based triggers keep functioning.
    const sync = () => {
      if (window.location.hash === '#free-week') setOpen(true)
    }
    sync()
    window.addEventListener('hashchange', sync)

    return () => {
      window.removeEventListener('freeweek:open', openHandler)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  function close() {
    // Clear the hash if it's set (deep-link case) so the form can be re-opened
    // later without needing a hashchange.
    if (window.location.hash === '#free-week') {
      history.pushState('', '', window.location.pathname + window.location.search)
    }
    setOpen(false)
    setStatus('idle')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch('/api/free-week', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="free-week-heading"
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-ink-800 shadow-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label={dict.close}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/10"
        >
          ✕
        </button>

        <div className="p-8 md:p-10">
          {status !== 'success' ? (
            <>
              <h2 id="free-week-heading" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {dict.heading}
              </h2>
              <p className="mt-2 text-sm text-white/60">{dict.subheading}</p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                {/* Honeypot — the API route drops any submission where
                    website is non-empty. Hidden from real users. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />
                <Field label={dict.name} id="name" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={dict.email} id="email" type="email" required />
                  <Field label={dict.phone} id="phone" type="tel" required />
                </div>
                <Field label={dict.startDate} id="startDate" type="date" required />

                <fieldset>
                  <legend className="mb-2 block text-sm font-semibold text-white/80">{dict.type}</legend>
                  <div className="flex gap-2">
                    {(['adult', 'kid'] as const).map((v) => (
                      <label
                        key={v}
                        className="flex-1 cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold transition has-[:checked]:border-blood has-[:checked]:bg-blood/15"
                      >
                        <input type="radio" name="type" value={v} defaultChecked={v === 'adult'} className="sr-only" />
                        {v === 'adult' ? dict.typeAdult : dict.typeKid}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-white/80">
                    {dict.notes}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder={dict.notesPlaceholder}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-blood/50 focus:ring-1 focus:ring-blood/40"
                  />
                </div>

                {status === 'error' && (
                  <div className="rounded-2xl border border-blood/40 bg-blood/10 p-4 text-sm">
                    <strong className="block text-white">{dict.errorTitle}</strong>
                    <span className="text-white/70">{dict.errorBody}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary mt-2 w-full disabled:opacity-60"
                >
                  {status === 'submitting' ? dict.submitting : dict.submit} →
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blood/20 text-blood-400">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                {dict.successTitle}
              </h2>
              <p className="mt-3 text-sm text-white/70">{dict.successBody}</p>
              <button onClick={close} className="btn-ghost mt-6">{dict.close}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  id,
  type = 'text',
  required,
}: {
  label: string
  id: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white/80">
        {label}{required && <span className="ml-1 text-blood-400">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-blood/50 focus:ring-1 focus:ring-blood/40"
      />
    </div>
  )
}

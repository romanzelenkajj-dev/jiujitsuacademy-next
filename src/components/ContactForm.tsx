'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { getDict } from '@/content'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDict(locale).contact
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch('/api/kontakt', {
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

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blood/20 text-blood-400">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{dict.successTitle}</h2>
        <p className="mt-3 text-sm text-white/70">{dict.successBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-8">
      {/* Honeypot — the API route drops any submission where website is
          non-empty. Hidden from real users, bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white/80">
          {dict.formName}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-blood/50 focus:ring-1 focus:ring-blood/40"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white/80">
          {dict.formEmail}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-blood/50 focus:ring-1 focus:ring-blood/40"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white/80">
          {dict.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
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
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === 'submitting' ? dict.formSubmitting : dict.formSubmit} →
      </button>
    </form>
  )
}

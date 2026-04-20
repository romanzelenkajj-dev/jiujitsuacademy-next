'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/i18n'

// Roman hasn't mapped photos to coaches yet — these point at deterministic
// filenames so we can swap `public/images/instructors/{slug}.webp` in place
// without touching the component once he says "#4 = Roman, #7 = Michal, etc."
type Coach = {
  slug: 'roman-zelenka' | 'michal-kukumberg' | 'vladimir-urmanic'
  name: string
  title: { sk: string; en: string }
  bio?: { sk: string; en: string }
}

const COACHES: Coach[] = [
  {
    slug: 'roman-zelenka',
    name: 'Roman Zelenka',
    title: { sk: 'Hlavný tréner · 2. Dan čierny pás', en: 'Head coach · 2nd Degree Black Belt' },
  },
  {
    slug: 'michal-kukumberg',
    name: 'Michal Kukumberg',
    title: { sk: 'Tréner · 1. Dan čierny pás', en: 'Coach · 1st Degree Black Belt' },
  },
  {
    slug: 'vladimir-urmanic',
    name: 'Vladimír Urmanič',
    title: { sk: 'Tréner · Čierny pás', en: 'Coach · Black Belt' },
  },
]

const AUTO_ADVANCE_MS = 6000

export function InstructorRotator({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % COACHES.length), AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800">
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        {/* Image stack — all 3 photos are mounted, only active has opacity 1 */}
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px]">
          {COACHES.map((c, i) => (
            <div
              key={c.slug}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={i !== active}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/instructors/${c.slug}.webp`}
                alt={c.name}
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-800/80 via-ink-800/0 to-transparent" />
            </div>
          ))}
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-between gap-6 p-8 md:p-12">
          <div className="relative min-h-[180px]">
            {COACHES.map((c, i) => (
              <div
                key={c.slug}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === active
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0'
                }`}
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blood-400">
                  {String(i + 1).padStart(2, '0')} / {String(COACHES.length).padStart(2, '0')}
                </div>
                <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  {c.name}
                </h3>
                <p className="mt-3 text-base text-white/70 md:text-lg">{c.title[locale]}</p>
              </div>
            ))}
          </div>

          {/* Dot navigation */}
          <div className="flex items-center gap-3">
            {COACHES.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => setActive(i)}
                aria-label={`Show ${c.name}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-10 bg-blood' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

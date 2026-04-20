'use client'

import { useState } from 'react'
import { schedule } from '@/content'
import type { Locale } from '@/lib/i18n'
import { getDict } from '@/content'

type Track = 'all' | 'kids' | 'adults' | 'gi' | 'nogi'

export function ScheduleTable({ locale }: { locale: Locale }) {
  const dict = getDict(locale)
  const [filter, setFilter] = useState<Track>('all')

  const filters: { id: Track; label: string }[] = [
    { id: 'all', label: dict.schedule.filterAll },
    { id: 'kids', label: dict.schedule.filterKids },
    { id: 'adults', label: dict.schedule.filterAdults },
    { id: 'gi', label: dict.schedule.filterGi },
    { id: 'nogi', label: dict.schedule.filterNoGi },
  ]

  const matches = (c: { track: string; gi?: string }) => {
    if (filter === 'all') return true
    if (filter === 'kids' || filter === 'adults') return c.track === filter
    if (filter === 'gi') return c.gi === 'gi'
    if (filter === 'nogi') return c.gi === 'nogi'
    return true
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              filter === f.id
                ? 'border-blood bg-blood text-white'
                : 'border-white/15 bg-white/[0.03] text-white/80 hover:bg-white/[0.07]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {schedule.map((day) => {
          const shown = day.classes.filter(matches)
          if (shown.length === 0) return null
          return (
            <div key={day.day} className="card p-6">
              <h3 className="mb-5 font-display text-2xl font-semibold tracking-tight text-white">
                {dict.schedule.days[day.day as keyof typeof dict.schedule.days]}
              </h3>
              <ul className="space-y-2">
                {shown.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-sm"
                  >
                    <span className="rounded-lg bg-blood/15 px-2 py-1 font-mono text-xs font-semibold text-blood-400">
                      {c.start}–{c.end}
                    </span>
                    <span className="text-white/85">
                      {c.label === 'Private' ? dict.schedule.individual : c.label === 'Open Mat' ? dict.schedule.openMat : c.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

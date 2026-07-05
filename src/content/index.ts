import { sk } from './sk'
import { en } from './en'
import type { Locale } from '@/lib/i18n'

const dictionaries = { sk, en } as const

export function getDict(locale: Locale) {
  return dictionaries[locale]
}

export const schedule = [
  {
    day: 'mon',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX Gi', track: 'adults', gi: 'gi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '17:00', end: '17:45', label: 'Kids Mini (4–7)', track: 'kids' },
      { start: '17:00', end: '18:00', label: 'Kids Juniors (8–14) Gi', track: 'kids', gi: 'gi' },
      { start: '18:00', end: '19:00', label: 'Adults beginners Gi', track: 'adults', gi: 'gi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced Gi', track: 'adults', gi: 'gi' },
    ],
  },
  {
    day: 'tue',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX NoGi', track: 'adults', gi: 'nogi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '17:00', end: '18:00', label: 'Kids Juniors (8–14) Gi', track: 'kids', gi: 'gi' },
      { start: '18:00', end: '19:00', label: 'Adults beginners NoGi', track: 'adults', gi: 'nogi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced NoGi', track: 'adults', gi: 'nogi' },
    ],
  },
  {
    day: 'wed',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX Gi', track: 'adults', gi: 'gi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '17:00', end: '17:45', label: 'Kids Mini (4–7)', track: 'kids' },
      { start: '17:00', end: '18:00', label: 'Kids Juniors (8–14) Gi', track: 'kids', gi: 'gi' },
      { start: '18:00', end: '19:00', label: 'Adults beginners Gi', track: 'adults', gi: 'gi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced Gi', track: 'adults', gi: 'gi' },
    ],
  },
  {
    day: 'thu',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX NoGi', track: 'adults', gi: 'nogi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '17:00', end: '18:00', label: 'Kids Juniors (8–14) Gi', track: 'kids', gi: 'gi' },
      { start: '18:00', end: '19:00', label: 'Adults beginners NoGi', track: 'adults', gi: 'nogi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced NoGi', track: 'adults', gi: 'nogi' },
    ],
  },
  {
    day: 'fri',
    classes: [{ start: '07:00', end: '18:00', label: 'Private', track: 'private' }],
  },
  {
    day: 'sat',
    classes: [{ start: '10:00', end: '11:30', label: 'Open Mat', track: 'all' }],
  },
] as const

// Summer schedule — active 1 Jul 2026 to 31 Aug 2026 (see getScheduleVariant below).
// Kids Mini + Kids Juniors are replaced by a single Kids Mix (6–14) Gi class
// on Monday and Wednesday 17:00–18:00. No kids classes on Tuesday/Thursday.
export const summerSchedule = [
  {
    day: 'mon',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX Gi', track: 'adults', gi: 'gi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '17:00', end: '18:00', label: 'Kids Mix (6–14) Gi', track: 'kids', gi: 'gi' },
      { start: '18:00', end: '19:00', label: 'Adults beginners Gi', track: 'adults', gi: 'gi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced Gi', track: 'adults', gi: 'gi' },
    ],
  },
  {
    day: 'tue',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX NoGi', track: 'adults', gi: 'nogi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '18:00', end: '19:00', label: 'Adults beginners NoGi', track: 'adults', gi: 'nogi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced NoGi', track: 'adults', gi: 'nogi' },
    ],
  },
  {
    day: 'wed',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX Gi', track: 'adults', gi: 'gi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '17:00', end: '18:00', label: 'Kids Mix (6–14) Gi', track: 'kids', gi: 'gi' },
      { start: '18:00', end: '19:00', label: 'Adults beginners Gi', track: 'adults', gi: 'gi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced Gi', track: 'adults', gi: 'gi' },
    ],
  },
  {
    day: 'thu',
    classes: [
      { start: '07:00', end: '08:30', label: 'Adults MIX NoGi', track: 'adults', gi: 'nogi' },
      { start: '08:30', end: '17:00', label: 'Private', track: 'private' },
      { start: '18:00', end: '19:00', label: 'Adults beginners NoGi', track: 'adults', gi: 'nogi' },
      { start: '18:15', end: '19:45', label: 'Adults advanced NoGi', track: 'adults', gi: 'nogi' },
    ],
  },
  {
    day: 'fri',
    classes: [{ start: '07:00', end: '18:00', label: 'Private', track: 'private' }],
  },
  {
    day: 'sat',
    classes: [{ start: '10:00', end: '11:30', label: 'Open Mat', track: 'all' }],
  },
] as const

export type ScheduleDay = (typeof schedule)[number]

export type ScheduleVariant = 'regular' | 'summer'

const SUMMER_2026_START = '2026-07-01'
const SUMMER_2026_END = '2026-08-31'

/** Returns which schedule is active on a given date (Europe/Bratislava time). */
export function getScheduleVariant(now: Date = new Date()): ScheduleVariant {
  // 'sv-SE' locale formats as YYYY-MM-DD, safe for string comparison.
  const d = now.toLocaleDateString('sv-SE', { timeZone: 'Europe/Bratislava' })
  return d >= SUMMER_2026_START && d <= SUMMER_2026_END ? 'summer' : 'regular'
}

export function getSchedule(variant: ScheduleVariant) {
  return variant === 'summer' ? summerSchedule : schedule
}

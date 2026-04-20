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

export type ScheduleDay = (typeof schedule)[number]

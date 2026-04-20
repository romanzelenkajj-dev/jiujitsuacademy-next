export const locales = ['sk', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'sk'

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x)
}

// Shared slugs across both locales. We keep the Slovak-friendly slugs
// because they're the ones Google has indexed; the EN pages live at /en/*
// so we don't fragment SEO signal across two URL families.
export const routeMap = {
  home: { sk: '/', en: '/' },
  rozvrh: { sk: '/rozvrh', en: '/rozvrh' },
  clenstvo: { sk: '/clenstvo', en: '/clenstvo' },
  twoPercent: { sk: '/2-percenta', en: '/2-percenta' },
  kontakt: { sk: '/kontakt', en: '/kontakt' },
} as const satisfies Record<string, { sk: string; en: string }>

export type RouteKey = keyof typeof routeMap

export const SITE_URL = 'https://jiujitsuacademy.sk'

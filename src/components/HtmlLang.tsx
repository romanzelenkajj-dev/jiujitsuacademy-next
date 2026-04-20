'use client'
import { useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

// Small effect that keeps <html lang> in sync with the active locale.
// Runs once per navigation; cheap, avoids restructuring the root layout.
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])
  return null
}

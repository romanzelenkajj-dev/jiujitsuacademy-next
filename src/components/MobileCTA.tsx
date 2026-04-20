import { type Locale } from '@/lib/i18n'
import { getDict } from '@/content'
import { FreeWeekTrigger } from './FreeWeekTrigger'

export function MobileCTA({ locale }: { locale: Locale }) {
  const dict = getDict(locale)
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center p-4 sm:hidden">
      <FreeWeekTrigger className="btn-primary w-full max-w-sm shadow-glow">
        {dict.nav.cta} →
      </FreeWeekTrigger>
    </div>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale, routeMap, SITE_URL } from '@/lib/i18n'
import { getDict, getScheduleVariant } from '@/content'
import { ScheduleTable } from '@/components/ScheduleTable'

// Re-render at most hourly so the schedule switches automatically
// between the summer (1.7.–31.8.2026) and regular variants.
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDict(locale)
  return {
    title: dict.meta.rozvrh.title,
    description: dict.meta.rozvrh.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${routeMap.rozvrh[locale]}`,
      languages: {
        sk: `${SITE_URL}/sk${routeMap.rozvrh.sk}`,
        en: `${SITE_URL}/en${routeMap.rozvrh.en}`,
      },
    },
  }
}

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDict(locale)
  const variant = getScheduleVariant()
  const isSummer = variant === 'summer'

  return (
    <section className="container-x py-20 md:py-28">
      <span className="eyebrow mb-5">
        {isSummer ? dict.schedule.summerEyebrow : dict.schedule.eyebrow}
      </span>
      <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
        {dict.schedule.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-white/70">
        {isSummer ? dict.schedule.summerSubtitle : dict.schedule.subtitle}
      </p>

      <div className="mt-14">
        <ScheduleTable locale={locale} variant={variant} />
      </div>
    </section>
  )
}

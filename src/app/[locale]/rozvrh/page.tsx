import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale, routeMap, SITE_URL } from '@/lib/i18n'
import { getDict } from '@/content'
import { ScheduleTable } from '@/components/ScheduleTable'

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

  return (
    <section className="container-x py-20 md:py-28">
      <span className="eyebrow mb-5">{dict.schedule.eyebrow}</span>
      <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
        {dict.schedule.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-white/70">{dict.schedule.subtitle}</p>

      <div className="mt-14">
        <ScheduleTable locale={locale} />
      </div>
    </section>
  )
}

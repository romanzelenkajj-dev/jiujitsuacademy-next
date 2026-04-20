import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale, routeMap, SITE_URL } from '@/lib/i18n'
import { getDict } from '@/content'
import { FreeWeekTrigger } from '@/components/FreeWeekTrigger'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDict(locale)
  return {
    title: dict.meta.clenstvo.title,
    description: dict.meta.clenstvo.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${routeMap.clenstvo[locale]}`,
    },
  }
}

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDict(locale)

  const adultPlans = [
    { label: dict.membership.oneDay, price: 15 },
    { label: dict.membership.month, price: 90 },
    { label: dict.membership.threeMonths, price: 240, highlight: true },
    { label: dict.membership.sixMonths, price: 450, best: true },
  ]

  const kidPlans = [
    { label: dict.membership.month, price: 80 },
    { label: `${dict.membership.quarter} (1.4 — 30.6.2025)`, price: 225 },
    { label: `${dict.membership.quarter} (6.1 — 31.3.2025)`, price: 225 },
    { label: `${dict.membership.quarter} (2.9 — 31.12.2024)`, price: 290 },
  ]

  return (
    <section className="container-x py-20 md:py-28">
      <span className="eyebrow mb-5">{dict.membership.eyebrow}</span>
      <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
        {dict.membership.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-white/70">{dict.membership.subtitle}</p>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {/* Adults */}
        <div className="card p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">{dict.membership.adults}</h2>
          <div className="mt-8 space-y-3">
            {adultPlans.map((p) => (
              <div
                key={p.label}
                className={`flex items-center justify-between rounded-2xl border p-5 transition ${
                  p.best
                    ? 'border-blood/60 bg-blood/10'
                    : p.highlight
                    ? 'border-white/20 bg-white/[0.04]'
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <div>
                  <div className="font-semibold">{p.label}</div>
                  {p.best && (
                    <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-blood-400">
                      {locale === 'sk' ? 'Najlepšia hodnota' : 'Best value'}
                    </div>
                  )}
                </div>
                <div className="font-display text-3xl font-semibold tracking-tight">
                  {p.price}
                  <span className="ml-1 text-base font-medium text-white/60">{dict.membership.currency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kids */}
        <div className="card p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">{dict.membership.kids}</h2>
          <div className="mt-8 space-y-3">
            {kidPlans.map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="font-semibold">{p.label}</div>
                <div className="font-display text-3xl font-semibold tracking-tight">
                  {p.price}
                  <span className="ml-1 text-base font-medium text-white/60">{dict.membership.currency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <FreeWeekTrigger className="btn-primary">
          {dict.membership.ctaBook} →
        </FreeWeekTrigger>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, routeMap, SITE_URL } from '@/lib/i18n'
import { getDict } from '@/content'
import { VideoHero } from '@/components/VideoHero'
import { InstructorGrid } from '@/components/InstructorGrid'
import { FreeWeekTrigger } from '@/components/FreeWeekTrigger'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDict(locale)

  const rozvrhHref = `/${locale}${routeMap.rozvrh[locale]}`
  const clenstvoHref = `/${locale}${routeMap.clenstvo[locale]}`

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'JIU-JITSU Academy Bratislava',
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/logo.svg`,
    telephone: '+421 904 267 507',
    email: 'info@jiujitsuacademy.sk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ivanská cesta 30/D',
      addressLocality: 'Bratislava',
      postalCode: '821 04',
      addressCountry: 'SK',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.171, longitude: 17.201 },
    sameAs: [
      'https://www.facebook.com/FabioSantosSlovakiaBJJ/',
      'https://www.instagram.com/jiujitsuacademybratislava/',
    ],
    sport: 'Brazilian Jiu-Jitsu',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <VideoHero />
        <div className="container-x relative flex min-h-[82vh] flex-col items-start justify-center pb-20 pt-28">
          <span className="eyebrow mb-6">{dict.home.eyebrow}</span>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tightest md:text-7xl lg:text-8xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            {dict.home.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <FreeWeekTrigger className="btn-primary">
              {dict.home.heroCta} →
            </FreeWeekTrigger>
            <Link href={rozvrhHref} className="btn-ghost">
              {dict.home.heroSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* BJJ intro */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-[1fr_1.3fr] md:gap-24">
          <div>
            <span className="eyebrow mb-5">BJJ</span>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {dict.home.bjjTitle}
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/75">
            {dict.home.bjjBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic band — wide group training shot */}
      <section className="container-x pb-8 md:pb-16">
        <div className="relative overflow-hidden rounded-4xl border border-white/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/jjab-01-1600x806.webp"
            alt={locale === 'sk' ? 'Tréning JIU-JITSU Academy Bratislava' : 'JIU-JITSU Academy Bratislava training'}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/9] md:aspect-[16/8]"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/40 to-transparent"
            aria-hidden
          />
        </div>
      </section>

      {/* Kids block — copy on the left, kids video on the right */}
      <section className="relative overflow-hidden">
        <div className="container-x py-24 md:py-32">
          <div className="card relative overflow-hidden p-10 md:p-16">
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-blood/15 blur-3xl"
              aria-hidden
            />
            <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
              <div>
                <span className="eyebrow mb-6">{locale === 'sk' ? 'Pre deti' : 'For kids'}</span>
                <h2 className="max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  {dict.home.kidsTitle}
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                  {dict.home.kidsBody}
                </p>
                <div className="mt-10">
                  <FreeWeekTrigger className="btn-primary">
                    {dict.home.kidsCta} →
                  </FreeWeekTrigger>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-sm">
                {/* Vertical phone-shaped card holds the kids IG reel */}
                <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-700">
                  <video
                    className="aspect-[9/16] w-full object-cover"
                    src="/video/kids.mp4"
                    poster="/video/kids-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo mosaic — training gallery */}
      <section className="container-x pb-4 md:pb-8">
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {[
            '/images/shoot/img_3714.webp',
            '/images/shoot/img_4353.webp',
            '/images/shoot/img_4413.webp',
          ].map((src, i) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={locale === 'sk' ? `JIU-JITSU Academy Bratislava — tréning ${i + 1}` : `JIU-JITSU Academy Bratislava training ${i + 1}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-24 md:py-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {dict.home.valuesTitle}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {dict.home.values.map((v) => (
            <div
              key={v}
              className="card flex items-center gap-3 px-5 py-5 transition hover:border-blood/40 hover:bg-blood/5"
            >
              <span className="h-2 w-2 rounded-full bg-blood" aria-hidden />
              <span className="font-semibold tracking-tight text-white md:text-lg">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coaches — auto-rotating 3-instructor showcase */}
      <section className="container-x py-24 md:py-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow mb-4">{locale === 'sk' ? 'Tréneri' : 'Instructors'}</span>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {locale === 'sk' ? 'Naši tréneri' : 'Our instructors'}
            </h2>
          </div>
        </div>
        <InstructorGrid locale={locale} />
      </section>

      {/* Welcome block */}
      <section className="container-x py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mb-6">{locale === 'sk' ? 'Vitajte' : 'Welcome'}</span>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {dict.home.welcomeTitle}
          </h2>
          <div className="mt-8 space-y-5 text-left text-lg leading-relaxed text-white/75 md:text-center">
            {dict.home.welcomeBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <FreeWeekTrigger className="btn-primary">
              {dict.home.heroCta} →
            </FreeWeekTrigger>
            <Link href={clenstvoHref} className="btn-ghost">
              {dict.nav.clenstvo}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

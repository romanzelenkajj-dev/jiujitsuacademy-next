import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale, routeMap, SITE_URL } from '@/lib/i18n'
import { getDict } from '@/content'
import { ContactForm } from '@/components/ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDict(locale)
  return {
    title: dict.meta.kontakt.title,
    description: dict.meta.kontakt.description,
    alternates: { canonical: `${SITE_URL}/${locale}${routeMap.kontakt[locale]}` },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDict(locale)

  return (
    <section className="container-x py-20 md:py-28">
      <span className="eyebrow mb-5">{dict.contact.eyebrow}</span>
      <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
        {dict.contact.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-white/70">{dict.contact.subtitle}</p>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {/* Contact form — POSTs to /api/kontakt which relays via Resend. */}
        <ContactForm locale={locale} />

        {/* Contact details + map */}
        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/50">
              {dict.contact.addressLabel}
            </h2>
            <address className="not-italic text-lg leading-relaxed text-white/90">
              JIU-JITSU ACADEMY BRATISLAVA<br />
              Aircraft Sporthouse<br />
              Ivanská cesta 30/D<br />
              821 04 Bratislava
            </address>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  {dict.contact.emailLabel}
                </div>
                <a href="mailto:info@jiujitsuacademy.sk" className="mt-1 block text-lg font-semibold hover:text-blood-400">
                  info@jiujitsuacademy.sk
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  {dict.contact.phoneLabel}
                </div>
                <a href="tel:+421904267507" className="mt-1 block text-lg font-semibold hover:text-blood-400">
                  +421 904 267 507
                </a>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden">
            <iframe
              title="Aircraft Sporthouse, Ivanská cesta 30/D"
              src="https://www.google.com/maps?q=Aircraft+Sporthouse+Ivansk%C3%A1+cesta+30%2FD+Bratislava&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

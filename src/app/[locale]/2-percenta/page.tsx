import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale, routeMap, SITE_URL } from '@/lib/i18n'
import { getDict } from '@/content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDict(locale)
  return {
    title: dict.meta.twoPercent.title,
    description: dict.meta.twoPercent.description,
    alternates: { canonical: `${SITE_URL}/${locale}${routeMap.twoPercent[locale]}` },
  }
}

export default async function TwoPercentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDict(locale)
  const d = dict.twoPercent.details

  const rows: [string, string][] = [
    [locale === 'sk' ? 'Názov' : 'Name', d.name],
    [locale === 'sk' ? 'Právna forma' : 'Legal form', d.form],
    [locale === 'sk' ? 'Rok registrácie' : 'Registered', d.registered],
    [locale === 'sk' ? 'Evidenčné číslo' : 'Registration №', d.evId],
    ['IČO', d.ico],
    [locale === 'sk' ? 'Ulica' : 'Street', d.street],
    [locale === 'sk' ? 'Mesto' : 'City', d.city],
    ['PSČ', d.zip],
    [locale === 'sk' ? 'Okres' : 'District', d.district],
    [locale === 'sk' ? 'Štát' : 'Country', d.country],
    ['IBAN', d.iban],
    [locale === 'sk' ? 'Banka' : 'Bank', d.bank],
  ]

  return (
    <section className="container-x py-20 md:py-28">
      <span className="eyebrow mb-5">{dict.twoPercent.eyebrow}</span>
      <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
        {dict.twoPercent.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-white/70">{dict.twoPercent.intro}</p>

      <div className="mt-10">
        <a
          href={dict.twoPercent.formsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          {dict.twoPercent.formsLabel} ↗
        </a>
      </div>

      <div className="mt-14 card overflow-hidden">
        <table className="w-full text-left">
          <tbody>
            {rows.map(([k, v], i) => (
              <tr key={k} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                <th className="w-48 px-6 py-4 align-top text-xs font-semibold uppercase tracking-widest text-white/50">
                  {k}
                </th>
                <td className="px-6 py-4 font-medium text-white/90">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-12 max-w-2xl text-lg text-white/70">{dict.twoPercent.thankYou}</p>
    </section>
  )
}

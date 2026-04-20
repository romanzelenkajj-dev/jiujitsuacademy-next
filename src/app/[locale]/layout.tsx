import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCTA } from '@/components/MobileCTA'
import { HtmlLang } from '@/components/HtmlLang'
import { FreeWeekForm } from '@/components/FreeWeekForm'
import { isLocale, locales, SITE_URL } from '@/lib/i18n'
import { getDict } from '@/content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDict(locale)
  return {
    title: { default: dict.meta.home.title, template: `%s — ${dict.meta.siteName}` },
    description: dict.meta.home.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        sk: `${SITE_URL}/sk`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/sk`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'sk' ? 'sk_SK' : 'en_US',
      url: `${SITE_URL}/${locale}`,
      siteName: dict.meta.siteName,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
  }
}

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <HtmlLang locale={locale} />
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <MobileCTA locale={locale} />
      <FreeWeekForm locale={locale} />
    </>
  )
}

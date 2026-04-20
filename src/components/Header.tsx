import Link from 'next/link'
import { type Locale, routeMap } from '@/lib/i18n'
import { getDict } from '@/content'
import { LangSwitcher } from './LangSwitcher'
import { MobileMenu } from './MobileMenu'
import { FreeWeekTrigger } from './FreeWeekTrigger'

export function Header({ locale }: { locale: Locale }) {
  const dict = getDict(locale)
  const prefix = `/${locale}`
  const r = (key: keyof typeof routeMap) => prefix + (routeMap[key][locale] === '/' ? '' : routeMap[key][locale])

  const nav = [
    { href: r('home'), label: dict.nav.home },
    { href: r('rozvrh'), label: dict.nav.rozvrh },
    { href: r('clenstvo'), label: dict.nav.clenstvo },
    { href: r('twoPercent'), label: dict.nav.twoPercent },
    { href: r('kontakt'), label: dict.nav.kontakt },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl">
      <div className="container-x flex h-[140px] items-center justify-between md:h-[192px]">
        <Link href={r('home')} className="flex items-center gap-3 text-white" aria-label="Jiu-Jitsu Academy Bratislava">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.svg" alt="Jiu-Jitsu Academy Bratislava" className="h-[120px] w-auto md:h-[168px]" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher current={locale} />
          <FreeWeekTrigger className="btn-primary hidden sm:inline-flex">
            {dict.nav.cta}
          </FreeWeekTrigger>
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  )
}

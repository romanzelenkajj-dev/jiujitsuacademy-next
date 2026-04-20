'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale, locales, routeMap } from '@/lib/i18n'

// Given the current pathname under /[locale]/..., produce the equivalent
// pathname for the other locale so the switcher never just dumps the user
// onto the EN homepage.
function swapLocale(pathname: string, target: Locale) {
  const parts = pathname.split('/').filter(Boolean)
  const [, ...rest] = parts
  const joined = '/' + rest.join('/')

  const pair = Object.values(routeMap).find((r) => r.sk === joined || r.en === joined)
  const targetPath = pair ? pair[target] : joined || '/'
  return `/${target}${targetPath === '/' ? '' : targetPath}`
}

export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`

  return (
    <div className="flex items-center rounded-full border border-white/15 bg-white/[0.03] p-1 text-xs font-semibold">
      {locales.map((l) => (
        <Link
          key={l}
          href={swapLocale(pathname, l)}
          aria-current={l === current ? 'true' : undefined}
          className={`rounded-full px-3 py-1 uppercase tracking-wider transition ${
            l === current
              ? 'bg-white text-ink'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  )
}

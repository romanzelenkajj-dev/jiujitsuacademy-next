import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

// Matches everything except static files, _next internals, and api routes.
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  // Best-effort content negotiation via Accept-Language. Default to Slovak.
  const accept = req.headers.get('accept-language') ?? ''
  const preferred =
    locales.find((l) => accept.toLowerCase().startsWith(l)) ?? defaultLocale

  const url = req.nextUrl.clone()
  url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

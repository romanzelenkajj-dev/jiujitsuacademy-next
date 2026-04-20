import type { MetadataRoute } from 'next'
import { locales, routeMap, SITE_URL } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(routeMap).map((r) => r.sk) // slugs are shared
  const pages: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of routes) {
      const url = `${SITE_URL}/${locale}${path === '/' ? '' : path}`
      pages.push({
        url,
        changeFrequency: path === '/' ? 'weekly' : 'monthly',
        priority: path === '/' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${path === '/' ? '' : path}`]),
          ),
        },
      })
    }
  }

  return pages
}

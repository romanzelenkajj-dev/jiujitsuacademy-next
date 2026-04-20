# jiujitsuacademy-next

Modern rebuild of [jiujitsuacademy.sk](https://jiujitsuacademy.sk) on Next.js 15 + TypeScript + Tailwind + Vercel. Replaces the websupport.sk BaseKit builder while preserving SEO.

## Stack

- **Next.js 15** App Router + React Server Components
- **TypeScript** strict
- **Tailwind CSS** — rounded, Revolut/Wise-inspired design system
- **i18n** — Slovak (default) + English, `/sk/*` and `/en/*`, hreflang'd
- **Host** — Vercel (free tier is enough for this traffic)

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project layout

```
src/
  app/
    layout.tsx              root <html>, fonts, base metadata
    [locale]/
      layout.tsx            header + footer + mobile sticky CTA
      page.tsx              Home (hero + BJJ + kids + values + welcome)
      rozvrh/page.tsx       Schedule (interactive, filters)
      clenstvo/page.tsx     Membership (pricing cards)
      2-percenta/page.tsx   2% tax donation
      kontakt/page.tsx      Contact (form + map)
    sitemap.ts              /sitemap.xml
    robots.ts               /robots.txt
    globals.css             Tailwind + brand tokens
  components/
    Header.tsx, Footer.tsx, LangSwitcher.tsx, MobileCTA.tsx
    TatamiHero.tsx          SVG tatami background (no raster assets)
    ScheduleTable.tsx       Filterable schedule widget
    HtmlLang.tsx            Syncs <html lang> to the active locale
  content/
    sk.ts, en.ts            All user-facing copy
    index.ts                Schedule data
  lib/
    i18n.ts                 Locales, default, route map, site URL
  middleware.ts             Redirects `/` → `/sk` (or `/en` from Accept-Language)
public/
  logo.svg                  Placeholder wordmark — replace with official SVG
```

## Design tokens (Tailwind)

- `ink` (base black), `blood` (signature red), `mat` (warm off-white)
- `rounded-3xl` / `rounded-4xl` used for cards and CTAs
- `btn-primary` (pill-red), `btn-ghost`, `eyebrow`, `card` — in `globals.css`

## SEO

- `<title>` per page (SK + EN), Open Graph, hreflang alternates
- JSON-LD `SportsActivityLocation` on the homepage (address, phone, sameAs)
- `sitemap.xml` generated from `routeMap` for both locales
- `robots.txt` allows all
- Legacy URL redirects (`/členstvo` → `/clenstvo`, `/2` → `/2-percenta`)

## Go-live checklist

See `MIGRATION.md` for the full runbook — short version:

1. Push this repo to GitHub under `romanzelenkajj-dev/jiujitsuacademy-next`
2. Import to Vercel, let it auto-build
3. Add domain `jiujitsuacademy.sk` in Vercel → Domains
4. Update DNS at websupport: A → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`
5. **Before cancelling websupport builder**: confirm mail hosting (info@jiujitsuacademy.sk) is on a separate websupport product and will survive. Don't cancel the mailbox!
6. Export existing photos from `files.vlastnawebstranka.websupport.sk` and drop them into `/public/images/`
7. Replace `/public/logo.svg` with the official high-res wordmark
8. Re-verify domain in Google Search Console, submit new sitemap
9. Watch Search Console for 404s for a week, cancel websupport builder
```

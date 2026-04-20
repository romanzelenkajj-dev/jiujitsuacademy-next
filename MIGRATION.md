# Migration runbook — websupport BaseKit → Vercel

## 0) Prep (before touching anything live)

- [ ] Create GitHub repo: `romanzelenkajj-dev/jiujitsuacademy-next`, push this scaffold
- [ ] Create Vercel project pointing at the repo — let it build on `main`
- [ ] Review the staging URL (`jiujitsuacademy-next.vercel.app`) end-to-end in SK and EN
- [ ] Replace `/public/logo.svg` with the official high-res wordmark (black version for dark header)
- [ ] Export legacy photos from `files.vlastnawebstranka.websupport.sk` (inspect current site, save each `*.jpeg`). Drop into `/public/images/` and wire into pages.

## 1) Email — CRITICAL, do not skip

The `info@jiujitsuacademy.sk` mailbox is almost certainly a **separate websupport product** from the BaseKit builder, but verify:

- [ ] Log into [websupport admin](https://admin.websupport.sk/sk/dashboard) → Services. You should see at least two products:
  - **Webstránka / BaseKit** (the one we want to cancel)
  - **Mailhosting / Domény** (the one we MUST keep)
- [ ] Confirm you can still receive mail to `info@jiujitsuacademy.sk` (send a test from Gmail)
- [ ] Note the current MX records — we'll need to leave those intact when repointing DNS

If the mailbox is bundled with the builder plan (unusual), migrate first:
1. Export existing mailbox to an mbox file from webmail
2. Set up free forwarding via [ImprovMX](https://improvmx.com/) to your personal Gmail
3. Add ImprovMX MX records at websupport (or wherever DNS lives)
4. Only then cancel the builder

## 2) DNS cutover

At websupport's DNS panel for `jiujitsuacademy.sk`:

- [ ] `A` record `@` → `76.76.21.21` (Vercel)
- [ ] `CNAME` `www` → `cname.vercel-dns.com`
- [ ] Leave `MX`, `TXT` (SPF/DKIM/DMARC), `CNAME` for mail autoconfig untouched
- [ ] TTL 300s during cutover, raise after stable

In Vercel:

- [ ] Add `jiujitsuacademy.sk` and `www.jiujitsuacademy.sk` in project → Domains
- [ ] Let Vercel provision Let's Encrypt cert (automatic)

## 3) SEO preservation

The Google index currently only holds `/` and `/rozvrh`. Both are preserved as-is (`/sk/` and `/sk/rozvrh`). To avoid losing signal:

- [ ] Add a 301 redirect at the edge from `/` → `/sk` (handled by `middleware.ts`)
- [ ] Keep the `/rozvrh`, `/kontakt`, `/členstvo` slugs — the middleware redirects them into `/sk/…`
- [ ] Re-verify the domain in Google Search Console after DNS propagates
- [ ] Submit the new sitemap: `https://jiujitsuacademy.sk/sitemap.xml`
- [ ] In Search Console → URL Inspection, request indexing for the Slovak home and schedule pages
- [ ] Watch **Coverage** for 7–14 days; any 404s/redirect chains fix immediately

Extra SEO wins the new site ships with that the old one didn't:

- Proper `<title>` (was literally "Home Page")
- `SportsActivityLocation` structured data (local business panel on Google)
- Fast mobile Lighthouse (static pages, no builder JS bloat)
- hreflang for SK/EN

## 4) Free-week form + Resend

The "Týždeň zdarma" modal is already wired to `POST /api/free-week`. It needs three Vercel env vars before it delivers mail:

1. Sign up at [resend.com](https://resend.com) (free tier = 3,000 emails/mo, more than enough)
2. Create an API key in the Resend dashboard
3. Verify the `jiujitsuacademy.sk` domain in Resend (adds 3 DNS records at websupport — SPF, DKIM, Return-Path)
4. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = the key from step 2
   - `MAIL_TO` = `info@jiujitsuacademy.sk`
   - `MAIL_FROM` = `JJAB Website <no-reply@jiujitsuacademy.sk>` (domain must be verified)
5. Redeploy

Before domain verification completes, you can temporarily set
`MAIL_FROM="JJAB <onboarding@resend.dev>"` — Resend provides this sender for testing. Deliverability is worse, but it works end-to-end to validate the form.

Spam protection is handled by a hidden "website" honeypot field and the Resend side already de-duplicates common patterns. If you need stronger protection later, add Vercel's built-in captcha or Cloudflare Turnstile to the form.

## 5) Analytics

Current site has Google Analytics (per `published-site-analytics.js`). Two options:

- [ ] Keep GA4 — add your existing measurement ID via `next/script` in root layout
- [ ] Or switch to Vercel Analytics (zero-config, no cookies, GDPR-friendly)

## 6) Cancel websupport builder

**Only after** you've verified for at least a week that:

- [ ] New site serves on `jiujitsuacademy.sk`
- [ ] `info@jiujitsuacademy.sk` still receives mail
- [ ] No organic traffic 404s in Search Console
- [ ] Any saved photos are now hosted on `/public/images/`, not `files.vlastnawebstranka.websupport.sk`

Then in the [websupport services panel](https://admin.websupport.sk/sk/dashboard/service/1388827), cancel **only** the BaseKit/Webstránka product. Keep the domain registration and mail hosting.

## 7) Monthly check

- [ ] Search Console → Performance: compare impressions/clicks vs. baseline
- [ ] Any new `<title>` or meta description changes should be A/B-tested against the SEO snapshot

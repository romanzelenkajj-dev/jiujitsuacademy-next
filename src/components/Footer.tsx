import type { Locale } from '@/lib/i18n'
import { getDict } from '@/content'

// Two simple social icons — inlined SVG so no extra network roundtrip.
function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.25-1.5 1.5-1.5H16.5V4.4c-.3-.05-1.3-.15-2.5-.15-2.45 0-4.15 1.5-4.15 4.25V10.5H7v3h2.85V21h3.65z" />
    </svg>
  )
}

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDict(locale)

  return (
    <footer className="border-t border-white/[0.06] bg-ink-800">
      <div className="container-x py-12">
        {/* Main row: logo+address on the left, contact+social on the right */}
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:gap-12 md:text-left">
          {/* Logo + address */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.svg"
              alt="Jiu-Jitsu Academy Bratislava"
              className="h-[120px] w-auto md:h-[140px]"
            />
            <address className="not-italic text-sm leading-relaxed text-white/70">
              Aircraft Sporthouse, Ivanská cesta 30/D, 821 04 Bratislava
            </address>
          </div>

          {/* Contact + social — single row on desktop so email/phone aren't above FB/IG */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
            <div className="flex flex-col items-center gap-x-5 gap-y-2 text-sm md:flex-row">
              <a href="mailto:info@jiujitsuacademy.sk" className="text-white/80 hover:text-white">
                info@jiujitsuacademy.sk
              </a>
              <a href="tel:+421904267507" className="text-white/80 hover:text-white">
                +421 904 267 507
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/jiujitsuacademybratislava/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-blood/50 hover:bg-blood/10 hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/FabioSantosSlovakiaBJJ/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-blood/50 hover:bg-blood/10 hover:text-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar: rights */}
        <div className="mt-8 flex justify-center border-t border-white/[0.04] pt-6 md:justify-end">
          <span className="text-xs text-white/40">{dict.footer.rights}</span>
        </div>
      </div>
    </footer>
  )
}

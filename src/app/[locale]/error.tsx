'use client'

import { useParams } from 'next/navigation'

// Locale-level error boundary. Renders inside the root layout, so Tailwind
// and the site chrome styles are available here.
export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ locale: string }>()
  const en = params?.locale === 'en'

  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center md:py-28">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
        JIU-JITSU Academy Bratislava
      </p>
      <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
        {en ? 'Something went wrong.' : 'Niečo sa pokazilo.'}
      </h1>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-white/70">
        {en ? (
          <>
            Please reload the page. If the problem persists, email us at{' '}
            <a href="mailto:info@jiujitsuacademy.sk" className="text-white underline">
              info@jiujitsuacademy.sk
            </a>
            .
          </>
        ) : (
          <>
            Skúste stránku načítať znova. Ak problém pretrváva, napíšte nám na{' '}
            <a href="mailto:info@jiujitsuacademy.sk" className="text-white underline">
              info@jiujitsuacademy.sk
            </a>
            .
          </>
        )}
      </p>
      <button onClick={() => reset()} className="btn-primary">
        {en ? 'Reload' : 'Načítať znova'}
      </button>
    </section>
  )
}

'use client'

// Root-level error boundary. It replaces the entire root layout, so it must
// render its own <html>/<body> and cannot rely on globals.css or Tailwind —
// inline styles only. Keeps branded <title>/description so a crashed page
// never gets indexed as "Application error" with no title.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="sk">
      <head>
        <title>JIU-JITSU Academy Bratislava — Brazílske Jiu-Jitsu (BJJ)</title>
        <meta
          name="description"
          content="TOP Akadémia Brazílskeho JIU-JITSU (BJJ) v Bratislave. Vyskúšaj si JIU-JITSU u nás na jeden týždeň zdarma!"
        />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0B',
          color: '#FFFFFF',
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '480px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.5)',
              margin: '0 0 16px',
            }}
          >
            JIU-JITSU Academy Bratislava
          </p>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              margin: '0 0 16px',
            }}
          >
            Niečo sa pokazilo.
          </h1>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              margin: '0 0 8px',
            }}
          >
            Skúste stránku načítať znova. Ak problém pretrváva, napíšte nám na{' '}
            <a
              href="mailto:info@jiujitsuacademy.sk"
              style={{ color: '#FFFFFF', textDecoration: 'underline' }}
            >
              info@jiujitsuacademy.sk
            </a>
            .
          </p>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 28px',
            }}
          >
            Something went wrong. Please reload the page or email us.
          </p>
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E11D2E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '14px 28px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Načítať znova / Reload
          </button>
        </div>
      </body>
    </html>
  )
}

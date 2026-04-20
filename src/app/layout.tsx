import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://jiujitsuacademy.sk'),
  title: {
    default: 'JIU-JITSU Academy Bratislava — Brazílske Jiu-Jitsu (BJJ)',
    template: '%s — JIU-JITSU Academy Bratislava',
  },
  description:
    'TOP Akadémia Brazílskeho JIU-JITSU (BJJ) v Bratislave. Vyskúšaj si JIU-JITSU u nás na jeden týždeň zdarma!',
  robots: { index: true, follow: true },
  // icons are auto-wired from src/app/favicon.ico, icon.png, apple-icon.png
  alternates: { canonical: '/' },
}

// The `<html lang>` is refined per-locale inside [locale]/layout via a small
// client helper. SK is the default because that's the primary audience.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={inter.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}

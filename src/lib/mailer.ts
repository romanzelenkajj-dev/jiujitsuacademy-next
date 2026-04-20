import nodemailer, { type Transporter } from 'nodemailer'

// Lazy singleton so we don't re-auth on every request in warm containers.
let cached: Transporter | null = null

export function getTransporter(): Transporter {
  if (cached) return cached

  const host = process.env.SMTP_HOST ?? 'smtp.m1.websupport.sk'
  const port = Number(process.env.SMTP_PORT ?? 465)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    throw new Error('SMTP_USER and SMTP_PASS must be set')
  }

  cached = nodemailer.createTransport({
    host,
    port,
    // Websupport: 465 = implicit TLS, 587 = STARTTLS
    secure: port === 465,
    auth: { user, pass },
  })

  return cached
}

export function mailFromEnv() {
  const to = process.env.MAIL_TO ?? 'info@jiujitsuacademy.sk'
  // "From" must be the authenticated mailbox; most SMTP servers reject
  // sending from an arbitrary address. Default to the same as MAIL_TO /
  // SMTP_USER so it works out of the box.
  const from =
    process.env.MAIL_FROM ??
    process.env.SMTP_USER ??
    'info@jiujitsuacademy.sk'
  return { to, from }
}

export function escapeHtml(s: string) {
  return s.replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]!),
  )
}

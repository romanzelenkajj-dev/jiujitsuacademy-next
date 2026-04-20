import { NextResponse } from 'next/server'
import { getTransporter, mailFromEnv, escapeHtml } from '@/lib/mailer'

// POST /api/kontakt — delivers the contact form to info@jiujitsuacademy.sk
// via Websupport SMTP. See /api/free-week for required env vars.

export const runtime = 'nodejs'

type Body = {
  name?: string
  email?: string
  message?: string
  locale?: 'sk' | 'en'
  // honeypot
  website?: string
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 })
  }

  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, message, locale } = body
  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'missing fields' },
      { status: 400 },
    )
  }

  const subject =
    (locale === 'en' ? 'Contact form — ' : 'Kontaktný formulár — ') + name

  const plain = [
    `Name:  ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
    '',
    `Locale: ${locale ?? 'sk'}`,
  ].join('\n')

  const html = `
    <table style="font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.6;">
      <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="vertical-align: top"><b>Message</b></td><td>${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
    </table>
    <p style="font-family: system-ui; font-size: 12px; color: #666; margin-top: 24px;">
      Sent from jiujitsuacademy.sk · locale: ${escapeHtml(locale ?? 'sk')}
    </p>
  `

  try {
    const { to, from } = mailFromEnv()
    const transporter = getTransporter()
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text: plain,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('SMTP send failed:', err)
    return NextResponse.json(
      { ok: false, error: 'send failed' },
      { status: 502 },
    )
  }
}

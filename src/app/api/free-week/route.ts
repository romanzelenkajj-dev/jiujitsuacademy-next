import { NextResponse } from 'next/server'
import { getTransporter, mailFromEnv, escapeHtml } from '@/lib/mailer'
import { buildFreeWeekReply } from '@/lib/freeWeekReply'

// POST /api/free-week — delivers the sign-up form to info@jiujitsuacademy.sk
// via the existing Websupport SMTP mailbox. Required env vars on Vercel:
//   SMTP_USER  (= info@jiujitsuacademy.sk)
//   SMTP_PASS  (= mailbox password)
// Optional overrides:
//   SMTP_HOST (default smtp.m1.websupport.sk)
//   SMTP_PORT (default 465)
//   MAIL_TO   (default info@jiujitsuacademy.sk)
//   MAIL_FROM (default SMTP_USER)

export const runtime = 'nodejs' // nodemailer needs Node APIs, not edge

type Body = {
  name?: string
  email?: string
  phone?: string
  startDate?: string
  type?: 'adult' | 'kid'
  notes?: string
  locale?: 'sk' | 'en'
  // honeypot — any non-empty value means it's a bot and we silently 200
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

  const { name, email, phone, startDate, type, notes, locale } = body
  if (!name || !email || !phone || !startDate) {
    return NextResponse.json(
      { ok: false, error: 'missing fields' },
      { status: 400 },
    )
  }

  // Whether the auto-reply will go out. Drives the status banner + subject
  // prefix in the academy notification so the inbox shows at a glance which
  // submissions are handled and which need a manual reply.
  const noNotes = !notes || notes.trim() === ''

  const subjectPrefix = noNotes ? '✓ ' : '✏ '
  const subjectSuffix = noNotes
    ? ''
    : locale === 'en'
      ? ' — needs reply'
      : ' — vyžaduje odpoveď'
  const subject =
    subjectPrefix +
    (locale === 'en'
      ? 'Free-week request — '
      : 'Prihláška na týždeň zdarma — ') +
    name +
    subjectSuffix

  // Status line shown at the top of the body. One sentence.
  const statusLine = noNotes
    ? locale === 'en'
      ? `Auto-reply sent to ${email}. No further action needed unless they reply.`
      : `Automatická odpoveď bola odoslaná na ${email}. Ak používateľ neodpíše späť, nie je potrebná žiadna ďalšia akcia.`
    : locale === 'en'
      ? 'User wrote a note/question — please reply manually.'
      : 'Používateľ napísal poznámku alebo otázku — prosím, odpovedzte manuálne.'

  const bannerColor = noNotes
    ? { bg: '#ECFDF5', border: '#10B981', text: '#065F46', icon: '✓' }
    : { bg: '#FFFBEB', border: '#F59E0B', text: '#78350F', icon: '✏' }

  const plain = [
    `[${noNotes ? 'AUTO-REPLY SENT' : 'NEEDS REPLY'}] ${statusLine}`,
    '',
    `Name:       ${name}`,
    `Email:      ${email}`,
    `Phone:      ${phone}`,
    `Start date: ${startDate}`,
    `Type:       ${type ?? 'adult'}`,
    notes ? `\nNotes:\n${notes}` : '',
    `\nLocale: ${locale ?? 'sk'}`,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px;">
      <div style="background: ${bannerColor.bg}; border-left: 4px solid ${bannerColor.border}; color: ${bannerColor.text}; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; line-height: 1.5;">
        <strong style="display: block; margin-bottom: 4px; font-size: 15px;">${bannerColor.icon} ${noNotes ? (locale === 'en' ? 'Auto-reply sent' : 'Automatická odpoveď odoslaná') : (locale === 'en' ? 'Manual reply needed' : 'Vyžaduje manuálnu odpoveď')}</strong>
        ${escapeHtml(statusLine)}
      </div>
      <table style="font-size: 14px; line-height: 1.6;">
        <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td><b>Phone</b></td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
        <tr><td><b>Start date</b></td><td>${escapeHtml(startDate)}</td></tr>
        <tr><td><b>Type</b></td><td>${escapeHtml(type ?? 'adult')}</td></tr>
        ${notes ? `<tr><td style="vertical-align: top"><b>Notes</b></td><td>${escapeHtml(notes).replace(/\n/g, '<br>')}</td></tr>` : ''}
      </table>
      <p style="font-size: 12px; color: #666; margin-top: 24px;">
        Sent from jiujitsuacademy.sk · locale: ${escapeHtml(locale ?? 'sk')}
      </p>
    </div>
  `

  try {
    const { to, from } = mailFromEnv()
    const transporter = getTransporter()

    // 1. Notify the academy of the new lead.
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text: plain,
      html,
    })

    // 2. Auto-reply to the person who signed up — only when they didn't
    //    leave any extra notes/questions. If they did, the academy will
    //    answer personally so we don't pre-empt that with a canned message.
    if (noNotes) {
      const reply = buildFreeWeekReply(
        locale === 'en' ? 'en' : 'sk',
        type === 'kid' ? 'kid' : 'adult',
        name,
      )
      try {
        await transporter.sendMail({
          from,
          to: email,
          replyTo: from, // replies from the user come back to info@
          subject: reply.subject,
          text: reply.text,
          html: reply.html,
        })
      } catch (replyErr) {
        // The lead was already captured — don't fail the request just
        // because the auto-reply hiccupped. Log it for manual follow-up.
        console.error('Free-week auto-reply failed:', replyErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('SMTP send failed:', err)
    return NextResponse.json(
      { ok: false, error: 'send failed' },
      { status: 502 },
    )
  }
}

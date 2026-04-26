// Auto-reply templates for the free-week form. Picks the right one
// based on locale (sk|en) and type (adult|kid). All four use the same
// JJAB brand layout — wordmark at top, red section labels, clean sans-serif.

import { escapeHtml } from './mailer'

export type Locale = 'sk' | 'en'
export type FreeWeekType = 'adult' | 'kid'

const LOGO = 'https://jiujitsuacademy.sk/logo.png'
const ACCENT = '#E4002B'
const PHONE = '+421 904 267 507'
const PHONE_TEL = '+421904267507'
const ADDRESS_LINES = [
  'JIU-JITSU Academy Bratislava',
  'Aircraft Sporthouse',
  'Ivanská cesta 30/D, 821 04 Bratislava',
]

interface Copy {
  subject: string
  greeting: string
  intro: string
  whereLabel: string
  bringLabel: string
  bring: string[]
  firstTime: string
  schedule: string // markdown-ish: "Label: URL"
  scheduleUrl: string
  questions: string
  closing: string
  signOff: string
}

function copyFor(locale: Locale, type: FreeWeekType, name: string): Copy {
  const isKid = type === 'kid'
  if (locale === 'sk') {
    return {
      subject: 'Týždeň zdarma — potvrdenie · JIU-JITSU Academy Bratislava',
      greeting: 'Dobrý deň,',
      intro: isKid
        ? 'ďakujeme za prihlášku Vášho dieťaťa na týždeň zdarma. Potvrdzujem, že môžete prísť na detské tréningy podľa rozvrhu — prvý týždeň je u nás <strong>kompletne zdarma</strong>.'
        : 'ďakujeme za prihlášku na týždeň zdarma. Potvrdzujem, že môžete prísť na ktorýkoľvek tréning pre začiatočníkov/Mix podľa rozvrhu — prvý týždeň je u nás <strong>kompletne zdarma</strong>.',
      whereLabel: 'Kde sme',
      bringLabel: 'Čo si priniesť',
      bring: isKid
        ? [
            'Kimono (gi), ak ho dieťa už má.',
            'Ak nie — stačí obyčajné športové oblečenie: tričko a šortky alebo teplaky (bez zipsov a kovových častí).',
            'Fľašu s vodou.',
          ]
        : [
            'Kimono (gi), ak ho máte.',
            'Ak nie — stačia obyčajné športové veci: tričko a šortky alebo teplaky (bez zipsov a kovových častí).',
            'Fľašu s vodou.',
          ],
      firstTime: isKid
        ? 'Detské tréningy sú otvorené pre začiatočníkov aj pokročilých. Ak prichádzate prvýkrát, prosím, príďte <strong>5–10 minút pred začiatkom tréningu</strong>.'
        : 'Tréningy sú otvorené pre začiatočníkov aj pokročilých. Ak prichádzate prvýkrát, prosím, príďte <strong>5–10 minút pred začiatkom tréningu</strong>.',
      schedule: 'Aktuálny rozvrh',
      scheduleUrl: 'https://jiujitsuacademy.sk/sk/rozvrh',
      questions: `V prípade akýchkoľvek otázok ma neváhajte kontaktovať na tomto e-maile alebo na <a href="tel:${PHONE_TEL}" style="color:${ACCENT};text-decoration:underline;">${PHONE}</a>.`,
      closing: isKid
        ? 'Tešíme sa na Vás aj Vaše dieťa.'
        : 'Tešíme sa na Vás na tatami.',
      signOff: 'S pozdravom,<br><strong>Roman Zelenka</strong><br>JIU-JITSU Academy Bratislava',
    }
  }
  // English
  return {
    subject: 'Free trial week — confirmation · JIU-JITSU Academy Bratislava',
    greeting: isKid ? 'Hello,' : `Hi ${escapeHtml(name) || 'there'},`,
    intro: isKid
      ? "thank you for signing up your child for the free trial week. You're confirmed — your child can come to any kids' training session according to the schedule, and their first full week with us is <strong>completely free</strong>."
      : "thanks for signing up for the free trial week. You're confirmed — you can come to any training session according to the schedule, and your first full week with us is <strong>completely free</strong>.",
    whereLabel: 'Where we are',
    bringLabel: 'What to bring',
    bring: isKid
      ? [
          'A gi (kimono) if your child already has one.',
          'If not — regular sports clothes work fine: a T-shirt and shorts or sweatpants (no zippers or metal).',
          'A water bottle.',
        ]
      : [
          'A gi (kimono) if you already have one.',
          'If not — regular sports clothes work fine: a T-shirt and shorts or sweatpants (no zippers or metal).',
          'A water bottle.',
        ],
    firstTime: isKid
      ? "Kids' training sessions are open to beginners and advanced students. If it's your child's first time, please arrive <strong>5–10 minutes early</strong>."
      : "All training sessions are open to beginners and advanced students. If it's your first time, please come <strong>5–10 minutes early</strong>.",
    schedule: 'Current schedule',
    scheduleUrl: 'https://jiujitsuacademy.sk/en/rozvrh',
    questions: `If you have any questions, feel free to reply to this email or call <a href="tel:${PHONE_TEL}" style="color:${ACCENT};text-decoration:underline;">${PHONE}</a>.`,
    closing: isKid
      ? 'Looking forward to seeing you and your child on the mats.'
      : 'See you on the mats!',
    signOff: 'Best regards,<br><strong>Roman Zelenka</strong><br>JIU-JITSU Academy Bratislava',
  }
}

function buildHtml(c: Copy): string {
  const bringList = c.bring.map((b) => `<li>${b}</li>`).join('')
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,Arial,sans-serif;color:#111;line-height:1.55;font-size:15px;">
  <tr><td style="padding:0 0 24px 0;border-bottom:2px solid ${ACCENT};">
    <img src="${LOGO}" alt="JIU-JITSU Academy Bratislava" width="240" height="70" style="display:block;width:240px;height:auto;max-width:240px;">
  </td></tr>
  <tr><td style="padding:24px 0 0 0;">
    <p style="margin:0 0 16px 0;">${c.greeting}</p>
    <p style="margin:0 0 16px 0;">${c.intro}</p>

    <p style="margin:24px 0 6px 0;font-weight:700;color:${ACCENT};text-transform:uppercase;letter-spacing:.05em;font-size:13px;">${c.whereLabel}</p>
    <p style="margin:0 0 16px 0;">${ADDRESS_LINES.join('<br>')}</p>

    <p style="margin:24px 0 6px 0;font-weight:700;color:${ACCENT};text-transform:uppercase;letter-spacing:.05em;font-size:13px;">${c.bringLabel}</p>
    <ul style="margin:0 0 16px 0;padding-left:22px;">${bringList}</ul>

    <p style="margin:0 0 16px 0;">${c.firstTime}</p>

    <p style="margin:0 0 16px 0;">${c.schedule}: <a href="${c.scheduleUrl}" style="color:${ACCENT};text-decoration:underline;">${c.scheduleUrl.replace(/^https?:\/\//, '')}</a></p>

    <p style="margin:0 0 16px 0;">${c.questions}</p>

    <p style="margin:0 0 4px 0;">${c.closing}</p>
    <p style="margin:24px 0 0 0;color:#444;font-size:14px;">
      ${c.signOff}<br>
      <a href="https://jiujitsuacademy.sk" style="color:${ACCENT};text-decoration:none;">jiujitsuacademy.sk</a>
    </p>
  </td></tr>
</table>`
}

function stripHtml(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?strong>/gi, '')
    .replace(/<a [^>]*?>([^<]*)<\/a>/gi, '$1')
}

function buildText(c: Copy): string {
  const upper = (s: string) => s.toUpperCase()
  return [
    c.greeting,
    '',
    stripHtml(c.intro),
    '',
    upper(c.whereLabel),
    ...ADDRESS_LINES,
    '',
    upper(c.bringLabel),
    ...c.bring.map((b) => `- ${b}`),
    '',
    stripHtml(c.firstTime),
    '',
    `${c.schedule}: ${c.scheduleUrl}`,
    '',
    stripHtml(c.questions),
    '',
    c.closing,
    '',
    stripHtml(c.signOff),
    'jiujitsuacademy.sk',
  ].join('\n')
}

export function buildFreeWeekReply(
  locale: Locale,
  type: FreeWeekType,
  name: string,
) {
  const c = copyFor(locale, type, name)
  return {
    subject: c.subject,
    html: buildHtml(c),
    text: buildText(c),
  }
}

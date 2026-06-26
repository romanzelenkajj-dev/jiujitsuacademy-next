# Free trial week ("Týždeň zdarma") - how it works and where to change it

A reference so we never have to reverse-engineer this again. Last updated 2026-06-26.

## TL;DR

There are TWO separate codebases. Do not confuse them.

| | Marketing website | Member app |
|---|---|---|
| Repo | `~/Downloads/jiujitsuacademy-next` (this repo) | `~/Desktop/academy-app` |
| GitHub | `romanzelenkajj-dev/jiujitsuacademy-next` | `romanzelenkajj-dev/jiujitsu-academy` |
| Vercel project | `jiujitsuacademy-next` | `jiujitsu-academy` |
| Domain | **jiujitsuacademy.sk** (SK + EN) | **app.jiujitsuacademy.sk** |
| Owns | The public free-week sign-up FORM and its confirmation emails | The actual trial MEMBERSHIP, login, check-in, admin |

The **free-week form and its emails live here, in the website repo.** When someone says "the free trial week on the website", they mean this. The app's `/member/join` is a separate sign-up that creates a real trial member; the website's confirmation email just points people to it.

## What happens when someone submits the free-week form

1. The form (`src/components/FreeWeekForm.tsx`, opened by `FreeWeekTrigger` / the CTA buttons in the header, mobile menu, and membership page) collects: name, email, phone, start date, type (adult/kid), optional notes. It POSTs to `/api/free-week`.
2. `src/app/api/free-week/route.ts` then does two things:
   - **Always:** emails the academy (`info@jiujitsuacademy.sk`) a lead notification.
   - **Auto-reply, conditionally:** if the person left **no notes**, it automatically sends them the confirmation email. If they **did** leave a note/question, it does NOT auto-reply; instead the lead email is flagged for a manual answer.

### The notes rule (important, by design)

- **No note** -> auto-reply sent. Lead email subject starts with `✓` and shows a green "Auto-reply sent" banner. Nothing more to do unless they reply.
- **Has a note** -> no auto-reply. Lead email subject starts with `✏` and shows an amber "Needs reply / Vyžaduje odpoveď" banner. You reply by hand (see manual templates below), so a canned message does not pre-empt their question.

## Which confirmation gets sent

The auto-reply is selected automatically by:
- **Language**: `sk` or `en`, from which language version of the site they used.
- **Audience**: `adult` or `kid`, from the form's type field.

So there are four auto-reply variants: SK adult, SK kid, EN adult, EN kid.

## Where everything lives (this repo)

| What | File |
|---|---|
| Form UI | `src/components/FreeWeekForm.tsx` (+ `FreeWeekTrigger.tsx`, CTAs in `Header.tsx`, `MobileMenu.tsx`, `MobileCTA.tsx`) |
| Form labels / copy | `src/content/sk.ts`, `src/content/en.ts` |
| Form handler + notes rule + lead email | `src/app/api/free-week/route.ts` |
| The 4 auto-reply templates | `src/lib/freeWeekReply.ts` (`buildFreeWeekReply` -> `copyFor` for wording, `buildHtml` / `buildText` for layout) |
| Email transport (SMTP) | `src/lib/mailer.ts` |

## How email is sent

Via the academy's **websupport** mailbox over SMTP using nodemailer (NOT Brevo - that is the app). Env vars on Vercel:
- `SMTP_USER` = `info@jiujitsuacademy.sk`, `SMTP_PASS` = mailbox password
- `SMTP_HOST` (default `smtp.m1.websupport.sk`), `SMTP_PORT` (default `465`)
- `MAIL_TO` (default `info@jiujitsuacademy.sk`), `MAIL_FROM` (default = `SMTP_USER`; the "From" must be the authenticated mailbox or websupport rejects it).

Caveat: websupport has a per-mailbox "GEO ochrana" (GEO protection) setting that can silently block SMTP AUTH from cloud IPs with a `535` error even when the password is correct. If confirmation emails suddenly stop sending, check that first (turn GEO protection off for the mailbox).

## The manual reply templates (for the notes case)

When someone leaves a note and you reply by hand, use the copy/paste tool at `~/Downloads/jjab-email-templates.html` (open in a browser, pick the language + audience tab, "Copy email (HTML)", paste into a Roundcube reply, replace `[Name]`, send). It has the same four variants.

**Keep the two in sync:** if you change wording, update BOTH `src/lib/freeWeekReply.ts` (automatic) and `jjab-email-templates.html` (manual), or the two paths will say different things.

## How to make common changes

- **Change confirmation wording** -> edit `copyFor()` in `src/lib/freeWeekReply.ts` (SK block and EN block; `isKid` switches adult vs kid). Then mirror it in `jjab-email-templates.html`.
- **Change the layout/sections of the email** -> `buildHtml()` and `buildText()` in the same file.
- **Change the "manual reply when there is a note" rule** (for example always auto-reply, or never) -> the `noNotes` logic in `src/app/api/free-week/route.ts`.
- **Change the sender / SMTP** -> `src/lib/mailer.ts` and the Vercel env vars above.
- **Change the form fields** -> `src/components/FreeWeekForm.tsx` and the `Body` type in `route.ts`.

## Deploy

Both repos auto-deploy from `main` via Vercel. **Always work on a branch and open a PR; never push to `main` directly** (merging `main` deploys straight to production). Verify with `CI=true npm run build` (exit 0) before merging.

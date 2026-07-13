# Ari Maler GmbH

Marketing website for Ari Maler GmbH, a painting/renovation company in the Basel, Switzerland region. Built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run start    # run the production build
```

## Environment variables

`src/lib/resend.ts` and `src/actions/sendEmail.ts` (contact form) read:

- `RESEND_API_KEY` – Resend API key
- `FROM_EMAIL` – falls back to `onboarding@resend.dev`
- `TO_EMAIL` – falls back to `info@ari-maler.ch`

Set these in `.env.local` when working on the contact form.

See `CLAUDE.md` for architecture notes.

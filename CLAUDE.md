# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing/brochure website for Ari Maler GmbH, a painting/renovation company in the Basel, Switzerland region. Built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4. All user-facing copy is in German (Swiss German business register).

## Commands

- `npm run dev` – start dev server (http://localhost:3000)
- `npm run build` – production build
- `npm run start` – run the production build
- No test suite and no lint script are configured.

## Environment variables

`src/lib/resend.ts` and `src/actions/sendEmail.ts` read:
- `RESEND_API_KEY` – Resend API key
- `FROM_EMAIL` – falls back to `onboarding@resend.dev`
- `TO_EMAIL` – falls back to `info@ari-maler.ch`

There's no `.env.example` in the repo; set these in `.env.local` when working on the contact form.

## Architecture

- **App Router, fully static-ish site**: every route under `src/app/**/page.tsx` is a plain server component; there is no `loading.tsx`/`route.ts` API layer. The only server-side logic is the `sendEmail` Server Action.
- **Service pages are data-driven**: `src/data/services.ts` exports a single `services: Service[]` array (slug, hero copy, description, image paths, exactly two `offerings`). Each route under `src/app/dienstleistungen/<slug>/page.tsx` just looks up its entry by slug and renders it through the shared `ServicePageLayout` (`src/components/services/ServicePageLayout.tsx`). To add or edit a service, edit `services.ts` — the page files are boilerplate lookups, not layout code. Note the `offerings` tuple is typed as exactly `[ServiceOffering, ServiceOffering]`, so a service always has precisely two offering blocks.
- **Before/after gallery data** lives separately in `src/data/beforeAfter.ts`, driving `BeforeAfterSlider`/`GalleryGrid`. Image paths point into `public/uploads/Sortiert/<NN_Name>/{Vorher,Nachher}/*.JPEG` — the numeric prefixes reflect an external sorted-photo export, not a naming convention to imitate for new entries.
- **Contact form flow**: `ContactForm` (client component) submits a `FormData` to the `sendEmail` Server Action (`src/actions/sendEmail.ts`), which validates with a `zod` schema and sends mail via Resend (`src/lib/resend.ts`). Validation errors and send failures both return `{ success: false, error }` with German user-facing messages rather than throwing.
- **Design tokens** are defined once as Tailwind v4 `@theme` CSS variables in `src/app/globals.css` (`--color-navy`, `--color-cta`, `--color-off-white`, etc.) and referenced via Tailwind utility classes like `bg-off-white` / `text-cta` throughout components — there is no separate `tailwind.config.*`.
- **Shared page chrome** (`Header`, `Footer`, mobile nav) is wired once in `src/app/layout.tsx`; individual pages only supply their content plus a `metadata` export (title/description), with the site-wide title template and OpenGraph defaults set in the root layout.
- **UI primitives** (`Button`, `PageHero`, `SectionHeader`) in `src/components/ui/` and the `CallToAction` block in `src/components/home/` are reused across the home page and every service page — prefer composing with these over introducing new one-off section markup.

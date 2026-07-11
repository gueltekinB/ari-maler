# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for Ari Maler GmbH (Malerarbeiten & Sanierungen, Basel). React 19 + Vite 8 + TypeScript SPA using `react-router-dom` v7. All copy and content is in German.

## Commands

```bash
npm run dev        # start dev server at http://localhost:5173
npm run build      # typecheck (tsc -b) then production build (outputs to dist/)
npm run typecheck  # tsc -b --noEmit only
npm run preview    # preview the production build
npm run lint        # oxlint
```

There is no test suite configured.

## Architecture

- `src/main.tsx` — entry point; wraps `App` in `BrowserRouter`.
- `src/App.tsx` — all routes defined here (`react-router-dom` `Routes`/`Route`), plus the persistent `Nav`, `Footer`, and `ScrollToTop`.
- `src/pages/` — one component per route: `HomePage`, `DienstleistungenPage` (services overview), `ServicePage` (per-service detail, routed via `/dienstleistungen/:id`), `ReferenzenPage`, `UeberUnsPage`, `KontaktPage`, `ImpressumPage`, `DatenschutzPage`.
- `src/components/` — shared UI: `Nav`, `Footer`, `PageHeader`, `ServiceCard`, `BeforeAfterSlider`, `ContactCTA`, `ImgPh` (placeholder image block), `ScrollToTop`.
- `src/data/services.ts` — all service copy lives here as data (`SERVICES`, `SERVICE_CARDS`, `SERVICE_DATA` keyed by service id), typed via `Service`/`ServiceCard`/`ServiceDetail`. `ServicePage` looks up its content from `SERVICE_DATA[id]`; adding a new service means adding entries to all three exports here — no new route is needed (handled by the dynamic `:id` route).
- `src/data/beforeAfter.ts` — before/after reference photo pairs (`BEFORE_AFTER`, typed as `BeforeAfterItem[]`), each pointing at paths under `public/uploads/Sortiert/...`.
- `src/styles/global.css` — single global stylesheet with CSS custom properties (design tokens: `--navy`, `--blue`, `--bg`, `--fh`/`--fb` fonts, spacing, shadows, `--btn-radius`, `--card-radius`) plus shared utility classes (`.container`, `.section`, `.card`, `.btn-*`, `.nav-link-*`, `.form-*`). Most page components apply layout via inline `style` props on top of these shared classes/tokens rather than per-component CSS files — follow that pattern for new UI.
- `public/uploads/` — logos and before/after project photos referenced by absolute `/uploads/...` paths from `src/data/`.

## TypeScript setup

- `tsconfig.json` is a solution file referencing `tsconfig.app.json` (src, `strict: true`, `noEmit`, bundler resolution) and `tsconfig.node.json` (for `vite.config.ts`). `npm run build` runs `tsc -b` before `vite build`; Vite itself does not type-check on dev (esbuild strips types only), so run `npm run typecheck` (or rely on your editor) to catch type errors while developing.
- Components with props declare a local `type Foo = {...}` (or inline object type) next to the component rather than a shared props-types module.

## Notes

- Fonts are Space Grotesk (headings, `--fh`) and DM Sans (body, `--fb`), loaded via Google Fonts `<link>` tags in `index.html`.
- Stray `.next/` and `next-env.d.ts` in the repo root are leftovers from an earlier Next.js scaffold (see git history), are excluded from oxlint via `.oxlintrc.json`'s `ignorePatterns`, and are not part of the current Vite/TypeScript build.

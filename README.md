# Ari Maler GmbH

Marketing website for Ari Maler GmbH (Malerarbeiten & Sanierungen, Basel), built with React + Vite + TypeScript and `react-router-dom`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/pages/` — one component per route (Home, Dienstleistungen overview + per-service detail, Referenzen, Über uns, Kontakt, Impressum, Datenschutz)
- `src/components/` — shared UI (Nav, Footer, PageHeader, ServiceCard, BeforeAfterSlider, ContactCTA)
- `src/data/` — service copy (`services.ts`) and before/after reference photo pairs (`beforeAfter.ts`)
- `src/styles/global.css` — design tokens and shared styles
- `public/uploads/` — logos and before/after project photos

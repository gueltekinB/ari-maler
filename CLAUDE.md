# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/brochure website for Ari Maler GmbH, a painting/renovation company in the Basel, Switzerland region. Plain PHP (no framework) with a precompiled Tailwind CSS v4 stylesheet and a small vanilla-JS file — built to run on shared PHP/Apache hosting **without Node.js on the server**. All user-facing copy is in German (Swiss German business register).

## Commands

- `php -S localhost:3000 scripts/dev-router.php` – local dev server; the router script emulates the `.htaccess` rewrites so pretty URLs work without Apache
- `npm run build:css` – recompile `assets/css/input.css` → `assets/css/styles.css` (only needed after changing Tailwind classes in markup; the compiled file is committed)
- No test suite and no lint script are configured.

## Architecture

- **Routing**: each page is a top-level PHP file (`index.php`, `kontakt.php`, `referenzen.php`, …). `.htaccess` rewrites pretty URLs onto them (`/kontakt` → `kontakt.php`, `/dienstleistungen/<slug>` → `dienstleistung.php?slug=<slug>`, `/sitemap.xml` → `sitemap.php`) and carries the 301 redirects and security headers that used to live in `next.config.ts`.
- **Shared chrome**: every page `require`s `includes/bootstrap.php`, sets a `$page` array (title, description, canonical, breadcrumbs, …), then includes `includes/page-header.php` (head, meta/OG tags, JSON-LD, header nav) and `includes/page-footer.php`. Direct web access to `includes/` is denied via its own `.htaccess`.
- **Service pages are data-driven**: `includes/data.php` holds the `$services` array (slug, hero copy, images, exactly two `offerings` blocks) and the `$beforeAfter` gallery data. `dienstleistung.php` renders any service by slug — to add or edit a service, edit `data.php`, no new page file needed (but add nothing to `.htaccess` either; the slug rule is generic).
- **UI building blocks** live in `includes/components.php` as `render_*()` functions (`render_page_hero`, `render_section_header`, `render_button`, `render_call_to_action`, `render_before_after_slider`, `render_service_card`). Prefer composing with these over new one-off markup.
- **Contact form**: `kontakt.php` handles its own POST (PRG pattern; success redirects to `/kontakt?gesendet=1`). Validation + sending live in `includes/contact-mailer.php`, which uses PHP `mail()` — i.e. the hosting provider's own mail server; no external email service. Honeypot field `website` silently fakes success for bots. Recipient/sender are constants in `includes/config.php`; the from-address must be a domain address authorized on the host (SPF).
- **Styling**: Tailwind v4 utility classes in the PHP markup; `assets/css/input.css` defines the `@theme` tokens (`--color-navy`, `--color-cta`, …), `@source` globs over the PHP files, and the JS-toggled header state classes (`.site-header`, `.is-home-top`, `.is-scrolled`). The compiled `assets/css/styles.css` is committed — after markup changes run `npm run build:css` and commit the result. Classes added only via JS must be safelisted with `@source inline(...)`.
- **Interactivity** is all in `assets/js/main.js` (vanilla JS, `data-*` attribute hooks): header scroll state, mobile menu, before/after sliders. The desktop services dropdown is pure CSS (`group-hover`).
- **Before/after gallery data**: image paths point into `uploads/Sortiert/<NN_Name>/{Vorher,Nachher}/*.JPEG` — the numeric prefixes reflect an external sorted-photo export, not a naming convention to imitate for new entries.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repo is the **Angular marketing site** for a Hungarian physiotherapist (Kirilla Réka),
living at the repo **root** (`src/`, `public/`, `angular.json`) — latest stable Angular
(v22), standalone + zoneless + signals, **clean-path routing**, SSG prerender, per-component
SCSS. It is live at **https://kirillareka.hu**.

The site was rebuilt from scratch to replace an earlier React (Create React App) marketing
site. That React app has been **removed from the tree** but is preserved for reference:

- tag **`react-final`** and branch **`react-legacy`** (both at commit `244d348`) hold the last
  React-only state. It remains the content/copy source of truth (verbatim Hungarian copy).

An even earlier, separate Angular *migration* (hash routing, UA-sniffing, a straight port of the
React design) once lived in `./angular/` and has also been removed. Ignore any lingering
reference to `./angular/` or to the old `./angular-design-system/` subdirectory — the app was
flattened to the repo root.

## Commands

- `npm start` — dev server on http://localhost:4200 (`ng serve`, hot reload).
- `npm run build` — SSG prerender → `dist/kirilla-physio/browser/`; a `postbuild`
  (`scripts/copy-404.mjs`) writes `404.html` from the CSR shell.
- `npm test` — Vitest via `ng test`.
- `npm run deploy` — builds, then publishes `dist/kirilla-physio/browser/` to the external
  `kirillaphysio/kirillaphysio.github.io` repo via `gh-pages` (see Deployment below).
- No separate lint command.

## Deployment

- **The live site is served by the external `kirillaphysio/kirillaphysio.github.io` user-page
  repo**, not this repo. Confirmed via DNS (apex → GitHub Pages IPs; `www` → `kirillaphysio.github.io`).
  Both this repo's `gh-pages` branch and its old CI workflow were legacy and did NOT serve the domain.
- **Custom domain:** the build output must contain a `CNAME` (`kirillareka.hu`) or the deploy
  wipes the domain and takes the site offline. It lives at `public/CNAME` (Angular copies
  `public/**` to the build root). Deep links are handled by `404.html` (the CSR shell).
- **Deploys are manual** via `npm run deploy`. Note (Windows dev machine): pushing/deploying may
  need a GitHub PAT for the `kirillaphysio` org, and `git config --global core.longpaths true`
  (gh-pages' nested `.cache` clone can overflow the 260-char path limit). Never commit the PAT.

## Architecture

- **Standalone + signals + zoneless throughout**, no NgModules, `@if`/`@for` control flow,
  `inject()` DI, `input()`/`output()`/`model()`/`computed()` signal APIs.
- **Clean-path routing** (`provideRouter(routes, withInMemoryScrolling(...))`, no hash) with **SSG
  prerender** (`outputMode: "static"` in `angular.json`; `/terapia/:id` prerenders one page per
  therapy id via `getPrerenderParams`).
- **Design system in `src/app/ui/`** — 25 `kp-`prefixed standalone components; tokens are global
  CSS custom properties under `src/styles/tokens/` (never redeclared in components). Native
  `kp-icon` (inline SVG sprite, 37 glyphs in `shared/icon/icon-data.ts`) — **no third-party libs**
  (no FontAwesome runtime, Cloudinary SDK, Swiper, or cookie-manager; all built natively).
- **Mobile handling is CSS-breakpoint-based** (900/600px), not UA-sniffing. The one real JS/DOM
  exception is `core/viewport.service.ts` for cases a component must not render at all on mobile
  (Contacts' Maps iframe).
- **Static content lives in `src/app/data/`** as typed constants (`therapy.ts`, `faq.ts`,
  `qualification.ts`, `testimonial.ts`, `region.ts`, `case.ts`, `course.ts`, `weekly.ts`), read
  through `core/content.service.ts`. Verbatim Hungarian copy; no backend/CMS.
- **View-encapsulation rule** (bit twice on the earlier migration): a component-scoped stylesheet
  only matches elements in *that component's own template*. Content projected via `<ng-content>` or
  injected via `[innerHTML]` needs `:host {}` or the *global* `styles.scss` (e.g. `.kp-rich strong`
  for injected therapy/case markup) — never a plain class selector on dynamic content. Cross-component
  styling goes through CSS custom properties on the child host (`--kp-card-height`, `--kp-iconbtn-*`);
  `::ng-deep` is not used anywhere.
- **SEO** goes through `core/seo.service.ts` — each routed page calls
  `SeoService.apply({ title, description, canonical, og* })` once.
- **Consent + GA**: native banner (`ui/consent-banner/`) + `core/consent.service.ts`; GA
  `G-0GWJX0SNMX` loads only after the analytics category is granted (`core/analytics.service.ts`).
- **QA scripts** `qa/*.mjs` (Playwright, self-contained devDep): `shoot` (screenshots), `overflow`,
  `interact` (consent/carousel/reduced-motion), `errors`. Run from the repo root with
  `MSYS_NO_PATHCONV=1` in Git Bash so a `/` route arg isn't rewritten to a path.

## Reference material (kept, not shipped)

- `design_handoff_angular_landing/` — the original design bundle (components spec, landing design).
- `design-source/` — design notes and the `PASS-TWO-PLAN.md` next-steps plan.

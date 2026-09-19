# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repo contains a React (Create React App) marketing site for a Hungarian physiotherapist
(Kirilla Réka) at the repo root (`src/`, `public/`), and a from-scratch Angular rebuild in
**`./angular-design-system/`** (latest stable Angular, standalone + zoneless + signals, **clean-path
routing**, SSG prerender, per-component SCSS) on the `refactor/angular_reimplement` branch. The React
app stays as the content/copy reference; the Angular app is the going-forward site.

An earlier, separate Angular *migration* once lived in `./angular/` (hash routing, UA-sniffing,
a straight port of the React design). **It has been removed** — the design-system rebuild in
`./angular-design-system/` supersedes it. Ignore any lingering reference to `./angular/`.

The commands and architecture below describe the **existing React app** at repo root. For the
Angular app, see "Angular app" further down.

## Commands

- `npm start` — dev server on http://localhost:3000 (react-scripts, CRA defaults, hot reload).
- `npm run build` — production build to `build/`.
- `npm test` — Jest in interactive watch mode (react-scripts test / Testing Library). To run a
  single test file non-interactively: `npm test -- --watchAll=false src/path/to/File.test.tsx`.
- `npm run deploy` — builds and publishes `build/` to the `kirillaphysio.github.io` repo via
  `gh-pages` (the deploy URL in `package.json` embeds a GitHub PAT — treat `package.json` as
  sensitive, don't paste its `deploy` script contents anywhere external).
- There is no separate lint command — linting (`eslint-config-react-app`) runs as part of
  `npm start`/`npm run build`.

## Architecture

- **Routing is hash-based** (`react-router`'s `HashRouter`, see `src/App.tsx`), so URLs are
  `/#/route` — required by the current GitHub Pages static-hosting deploy (no server-side
  rewrites available). All routes render inside one shell composed in `App.tsx`:
  `HashRouter > AnalyticsTracker > CookieManagerWrapper > ScrollToTopWrapper > (Header, Routes, BackToTopButton, Footer)`.
  The nesting order matters: cookie consent wraps everything (it can gate rendering), scroll-to-top
  runs on every route change inside that.
- **No state management library.** All state is local `useState`/`useRef`. Content that looks
  like "data" is plain TS modules imported directly into components/pages: `components/therapies/therapies.ts`,
  `components/faq/faqs.ts`, `components/opinions/opinions.ts` + `components/opinions/aboutMe.ts`
  (two independent testimonial datasets used on different pages), `pages/qualifications.ts`.
  The `/therapy/:therapyId` route looks up its content by `id` from `therapies.ts` — there is no
  backend or CMS anywhere in this app.
- **Styling is per-component SCSS** colocated with each `.tsx` file, sharing two key partials via
  `@use`: `src/styles/colors.scss` (the entire color palette) and `src/styles/heroSection.scss`
  (layout rules reused by most page-level sections). Global resets are in `src/styles/index.scss`
  (imported once in `index.tsx`) and `src/App.scss`/`src/privacy.scss` (imported in `App.tsx`).
- **Mobile-specific behavior is driven by `react-device-detect`'s `isMobile` (UA sniffing, not a
  CSS breakpoint)**, checked throughout components/pages to swap classes or branch JSX (e.g. the
  Contacts page omits the Google Maps iframe entirely on mobile; `BackToTopButton` only renders
  visibly on mobile; `TherapyCard` reveals its description on click only on mobile). This is one
  of the things the planned Angular migration deliberately changes (see the migration plan doc).
- **All content images are remote**, served from Cloudinary (cloud name `dcwv2corw`) and referenced
  only by image-id string (`components/CloudinaryImage/CloudinaryImage.tsx` +
  `useCloudinary.ts`). There's a hard-coded `onError` fallback to a `placehold.co` placeholder.
  `src/assets/under_construction.jpg` is the only locally bundled content image.
- **SEO tags are set per-page via React 19's native `<title>`/`<meta>` hoisting**, written directly
  in each page component's JSX (no Helmet-style library) — every page in `src/pages/` sets its own
  title/description/OG tags this way.
- Google Analytics is wired via `gtag.js` in `public/index.html`, with page-view tracking on every
  route change via `components/wrappers/AnalyticsWrapper.tsx`. Cookie consent
  (`components/wrappers/CookieManagerWrapper.tsx`, using `react-cookie-manager`) does **not** gate
  analytics — gtag fires regardless of the user's choice — but it does block at least the Contacts
  page's Google Maps iframe behind a "content blocked" placeholder until consent is given
  (confirmed by browser-based QA during the Angular migration, not obvious from reading the code).
- `src/pages/Treatments.tsx` no longer has a MailerLite signup embed as of this migration's step 6
  — an earlier pass of this file (and this doc) referenced one, but it was removed from the React
  source at some point outside this migration. Don't assume it's there; check the live file.

## Angular app (`./angular-design-system/`)

Angular CLI project (Angular 22) — `npm start` (dev server, port 4200), `npm run build`
(SSG prerender → `dist/kirilla-physio/browser/`, runs a `postbuild` that writes `404.html`),
`npm run deploy` (gh-pages to `kirillaphysio/kirillaphysio.github.io` — credentials not committed),
`npm test` (Vitest via `ng test`). No separate lint command. Built from the design bundle in
`design_handoff_angular_landing/`; pass one (landing + shell + consent + legal + all 25 design-system
components) is done. Next-steps plan: `angular-design-system/design-source/PASS-TWO-PLAN.md`.

- **Standalone + signals + zoneless throughout**, no NgModules, `@if`/`@for` control flow,
  `inject()` DI, `input()`/`output()`/`model()`/`computed()` signal APIs.
- **Clean-path routing** (`provideRouter(routes, withInMemoryScrolling(...))`, no hash) with **SSG
  prerender** (`outputMode: "static"` in `angular.json`; `/terapia/:id` prerenders one page per
  therapy id via `getPrerenderParams`). GitHub Pages user-page deploy at root.
- **Design system in `src/app/ui/`** — 25 `kp-`prefixed standalone components ported from
  `design_handoff_angular_landing/COMPONENTS.md`; tokens are global CSS custom properties under
  `src/styles/tokens/` (never redeclared in components). Native `kp-icon` (inline SVG sprite, 37
  glyphs in `shared/icon/icon-data.ts`) — **no third-party libs** (no FontAwesome runtime,
  Cloudinary SDK, Swiper, or cookie-manager; all built natively).
- **Mobile handling is CSS-breakpoint-based** (900/600px), not UA-sniffing. The one real JS/DOM
  exception planned is a `core/viewport.service.ts` for cases a component must not render at all on
  mobile (Contacts' Maps iframe).
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
  `SeoService.apply({ title, description, canonical, og* })` once, instead of React's inline JSX.
- **Consent + GA**: native banner (`ui/consent-banner/`) + `core/consent.service.ts`; GA
  `G-0GWJX0SNMX` loads only after the analytics category is granted (`core/analytics.service.ts`).
- **QA scripts** `angular-design-system/qa/*.mjs` (Playwright, self-contained devDep): `shoot`
  (screenshots), `overflow`, `interact` (consent/carousel/reduced-motion), `errors`. Run from the
  project dir with `MSYS_NO_PATHCONV=1` in Git Bash so a `/` route arg isn't rewritten to a path.

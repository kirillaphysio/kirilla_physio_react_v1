# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repo contains a React (Create React App) marketing site for a Hungarian physiotherapist
(Kirilla Réka) at the repo root (`src/`, `public/`), and an Angular rewrite in **`./angular/`**
(latest stable Angular, standalone + zoneless + signals, hash routing, Vitest, mobile-first CSS)
on the `refactor/angular_reimplement` branch. **Steps 1–10 of the migration are done** (scaffold
through QA — see `docs/angular-migration-plan.md`'s Progress checklist); only step 11
(deployment/cutover) remains, so the two apps still coexist deliberately (see "Directory layout"
in that doc for why — the React app needs to stay live as the QA reference until cutover). Read
the migration plan doc before making structural changes on this branch, especially its
"Confirmed decisions" and per-step Progress notes — several non-obvious Angular gotchas are
documented there (view-encapsulation traps that silently drop CSS rules, in particular) that are
worth knowing before touching any component stylesheet.

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

## Angular app (`./angular/`)

Standard Angular CLI project — `npm start` (dev server, port 4200), `npm run build`
(→ `dist/kirilla-physio/`), `npm test` (Vitest via `ng test`, add `-- --watch=false` for a single
non-interactive run). No separate lint command configured.

- **Standalone + signals throughout**, no NgModules, new `@if`/`@for` control flow, `inject()` over
  constructor DI, `input()`/`viewChild()` signal APIs over decorators. Zoneless (no `zone.js`
  dependency).
- **Hash routing** (`provideRouter(routes, withHashLocation())` in `app.config.ts`), matching the
  React app's URL scheme (`/#/route`) and the GitHub Pages static-hosting deploy target.
- **Mobile handling is CSS-breakpoint-based** (`styles/breakpoints.scss`'s `mobile-only`/
  `desktop-up` mixins, 767/768px cutover), not UA-sniffing — deliberately different from the React
  app. The one real exception needing a JS/DOM decision (not just CSS) is
  `core/viewport.service.ts`, used only where a component must not render something at all on
  mobile (e.g. the Contacts page's Maps iframe) or needs a real numeric breakpoint value (Swiper's
  `slides-per-view`).
- **Static content lives in `src/app/data/`** as typed constants (`therapy.ts`, `faq.ts`,
  `qualification.ts`, `testimonial.ts` + two testimonial datasets) — ported verbatim from the React
  app's equivalent files, no backend/CMS here either.
- **Angular's view encapsulation has sharp edges that have silently dropped CSS rules twice in this
  project already** (see `docs/angular-migration-plan.md` step 10 for the full story) — a
  component-scoped stylesheet's selectors only match elements declared in *that component's own
  template*; content inserted by `<router-outlet>` or built via `host: { class: '...' }` needs
  `:host { }` (to target the component's own host element) or the *global* `styles.scss` (to reach
  arbitrary/dynamic content), never a plain class selector repeating the host's own class name.
  Cross-component styling (one component's stylesheet needing to affect another's internals, e.g.
  a page retinting a shared card component) goes through CSS custom properties set on the child's
  host element — see `shared/cloudinary-image/cloudinary-image.scss` and
  `shared/therapy-card/therapy-card.scss` for the pattern; `::ng-deep` is not used anywhere here.
- **SEO** goes through `core/seo.service.ts` (`Title`/`Meta` wrapper) — each routed page calls
  `SeoService.apply({ title, description, canonical, og* })` once, instead of React's inline
  `<title>`/`<meta>` JSX. Shared keyword-stuffed description text lives in `core/seo-keywords.ts`.
- **`angular/qa/compare-with-react.mjs`** is a reusable Playwright script that screenshots every
  route at mobile+desktop widths on both apps side by side, and checks GA firing/outbound links/
  the Cloudinary fallback — see the script's header comment for usage. It's what caught the
  encapsulation bugs mentioned above; worth re-running after any non-trivial styling change.

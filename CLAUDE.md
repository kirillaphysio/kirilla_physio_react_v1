# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repo currently contains a React (Create React App) marketing site for a Hungarian
physiotherapist (Kirilla Réka) at the repo root (`src/`, `public/`), and an in-progress Angular
rewrite in **`./angular/`** (latest stable Angular, standalone + zoneless + signals, hash routing,
Vitest, mobile-first CSS) on the `refactor/angular_reimplement` branch. The two apps coexist
deliberately during the migration — see "Directory layout" in `docs/angular-migration-plan.md` for
why. That file also has the full migration plan and current progress — read it before making
structural changes on this branch. The commands and architecture below describe the **existing
React app** at repo root; once inside `angular/`, standard Angular CLI conventions apply
(`npm start`, `npm run build`, `npm test` — see `angular/README.md`).

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
- **The MailerLite waitlist signup embed in `src/pages/Treatments.tsx`** is raw pasted third-party
  HTML/CSS/`<script>` (jsonp fetch + a global success-callback), not a real component — treat it as
  an opaque third-party block rather than something to refactor.
- Google Analytics is wired via `gtag.js` in `public/index.html`, with page-view tracking on every
  route change via `components/wrappers/AnalyticsWrapper.tsx`. Cookie consent
  (`components/wrappers/CookieManagerWrapper.tsx`, using `react-cookie-manager`) is independent of
  analytics gating logic — check both if working on consent/tracking behavior.

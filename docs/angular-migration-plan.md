# Angular migration plan

Migrating the existing React (Create React App) site to Angular, preserving visual appearance and
functionality. This document is the working plan. See `CLAUDE.md` for a description of the current
React app.

## Directory layout

The Angular workspace lives in `./angular/` alongside the existing React app (`src/`, `public/` at
repo root), not in place of it. This is deliberate, not temporary sloppiness: the React app needs to
stay live and buildable throughout the migration so it can serve as the visual/functional reference
for the Playwright screenshot comparisons in the QA phase (step 10). At cutover (step 11) the
Angular app's build output replaces the React deploy; whether the `angular/` sources also get
promoted to repo root at that point is a decision for when we get there.

## Progress

- [x] Step 1 — Angular workspace scaffolded (`./angular/`, Angular 22, standalone, zoneless,
      hash routing, SCSS, Vitest via `@angular/build:unit-test`), global styles/tokens
      (`colors.scss`, `heroSection.scss`, `orderedList.scss`, global reset) and `public/` assets
      ported. `ng build` and `ng test` both verified working.
- [x] Step 2 — static data modules ported to `angular/src/app/data/`: `therapy.ts`, `faq.ts`,
      `qualification.ts`, `testimonial.ts` (shared type) + `testimonials-landing.ts` /
      `testimonials-treatments.ts` (the two separate testimonial sets). Array bodies verified
      byte-for-byte identical to the React originals via diff; only type annotations/export names
      changed (`Qualifications`→`Qualification`, `opinions`→`landingTestimonials`/
      `treatmentsTestimonials`, `faqs` now explicitly typed).
- [x] Step 3 — core services built in `angular/src/app/core/`, each with Vitest specs:
      `SeoService` (Title/Meta wrapper — `apply({ title, description, canonical, og* })`, reuses
      one canonical `<link>` tag, defaults OG tags from the page title/description/the shared
      Cloudinary og:image every React page falls back to); `AnalyticsService` (gtag wrapper,
      auto-tracks a page_view on every `NavigationEnd` once instantiated, plus an unused-for-now
      `trackEvent()` for the future custom-events plan); `ViewportService` + `breakpoints.ts`
      (matchMedia-based `isMobile` signal, for the one case — Contacts page's Maps iframe — that
      needs a real DOM decision instead of pure CSS) with its SCSS counterpart
      `styles/_breakpoints.scss` (`mobile-only`/`desktop-up` mixins, same 767/768px cutover).
      gtag.js script tags ported verbatim into `angular/src/index.html`. **Not yet wired into the
      app shell** (no component injects these yet) — that's step 4, alongside Header/Footer/
      Menu, since it's shell-assembly work, not service-building work. `ng build` and `ng test`
      (14 tests, 4 files) both clean.
- [x] Step 4 — shell/shared components built in `angular/src/app/shared/`, each with Vitest
      specs: `Header`/`Menu` (mobile-first hamburger — always in the DOM, hidden via CSS on
      desktop instead of conditionally rendered; closes on route navigation), `Footer`/`Social`/
      `Policy`, `BackToTopButton` (scroll-position signal, mobile-only via CSS), `CloudinaryImage`
      (wraps `NgOptimizedImage` + the new `provideCloudinaryLoader`, replacing
      `@cloudinary/react`/`@cloudinary/url-gen` entirely — one fewer dependency; deliberately no
      `object-fit` since the original didn't resize server-side either, just stretched into a CSS
      box). Installed `@fortawesome/angular-fontawesome` (+ same icon packs as React) and `swiper`
      (registered as a web component in `main.ts`, not yet used by any page). Wired
      `provideCloudinaryLoader` into `app.config.ts`, and assembled the app shell in `app.ts`/
      `app.html`/`app.scss` (Header/RouterOutlet/BackToTopButton/Footer, `AnalyticsService`
      force-instantiated via `inject()`) — ported from `App.scss` (not `privacy.scss`, which only
      styled the old cookie-consent library's button class, moot once step 8 replaces it).
      Bumped the initial bundle budget in `angular.json` (500kB→700kB warning, 1MB→1.5MB error;
      gzipped transfer is ~135kB, budgets are on raw size). `ng build`/`ng test` clean (38 tests,
      11 files). **Known gap, intentional:** `.app > [class$="-page"]` in `app.scss` won't match
      anything until step 6 gives each routed page component a `host: { class: '...-page' }` —
      documented inline, not a bug.
- [x] Step 5 — routing wired in `app.routes.ts`: all 8 routes, each lazy-loaded
      (`loadComponent`) to its own stub page component in `angular/src/app/pages/`, plus a
      wildcard `redirectTo: ''` (fixes the React app's dead catch-all, which never matched —
      confirmed as the intended fix). Scroll-to-top on navigation via the Router's own
      `withInMemoryScrolling({ scrollPositionRestoration: 'top' })`, no custom wrapper code
      needed — replaces React's `ScrollToTopWrapper`. Every page's `Title`/`Meta` wired for real
      via `SeoService.apply()` (title, canonical, description, OG tags), even though page *body*
      content is still a `TODO(step 6)` placeholder — SEO data was extracted from each React page
      now since it doesn't depend on body content. Centralized the shared keyword-stuffed
      description tail in `core/seo-keywords.ts` (7 of 8 pages use it verbatim in
      `name="description"` but deliberately NOT in `og:description`, matching the original's
      intentional split). `TherapyPage` resolves its therapy reactively from the route param via
      `toSignal`+`computed`+`effect` (recomputes without remounting when navigating between two
      `/therapy/:id` routes, same as the original's `useParams`+`useMemo`).

      Each page component now also carries the `host: { class: '...-page' }` promised in step 4
      — but only the 5 pages whose React version actually had a page-level class
      (`landing-page`, `contacts-page`, `programs-page`, `treatment-page` — **singular**, matching
      the original `Treatments.scss` exactly — and `therapy-page`); Terms/Privacy/Cookie had no
      such class in React and still don't, preserving that (mildly inconsistent, but real)
      original behavior.

      Fixed two content bugs found while porting SEO tags, both flagged inline in code comments
      rather than silently changed: Contacts' `og:description` had a duplicated-word typo
      ("honlapjának honlapjának"); Privacy's `og:title` was a copy-paste leftover from the
      Programs page, not matching Privacy's own title. Also gave `TherapyPage` a graceful
      title/canonical fallback for an unknown `:therapyId` instead of the original's literal
      `"undefined - Kirilla Réka..."` (a template-literal-over-`undefined` artifact, not
      intentional). `ng build`/`ng test` clean (74 tests, 20 files, including a routing
      integration spec that exercises every real route + the redirect via
      `RouterTestingHarness`). Lazy chunks confirmed per-route in the production build.
- [ ] Step 6 — page migrations
- [ ] Step 7 — FAQ accordion / TherapyList/TherapyCard
- [ ] Step 8 — cookie-consent banner
- [ ] Step 9 — mobile-first CSS pass
- [ ] Step 10 — QA (Playwright comparison)
- [ ] Step 11 — deployment

## Confirmed decisions

- **Latest stable Angular**, standalone components (no NgModules) throughout.
- Signals for component state; `input()`/`output()`/`model()` over decorators; new `@if`/`@for`/
  `@switch` control flow; `inject()` over constructor DI.
- **Testing: Vitest**, not Jasmine/Karma. Use Angular CLI's first-party Vitest builder if the
  installed CLI version supports it solidly at scaffold time; otherwise fall back to
  `@analogjs/vitest-angular`. Add **Playwright** for e2e / visual-regression screenshots (each
  route, mobile + desktop widths) against the live React site, to verify pixel parity objectively
  rather than by eyeballing.
- **Mobile handling: CSS breakpoints, mobile-first** — `react-device-detect`'s `isMobile` (UA
  sniffing) is dropped entirely.
  - Pure layout differences → `min-width` media queries, base styles are mobile.
  - The Contacts page's Google Maps iframe (currently omitted from the DOM on mobile, not just
    hidden) needs real DOM-level conditional rendering, so it uses a viewport-width signal
    (`matchMedia` / CDK `BreakpointObserver`) — never UA sniffing.
  - TherapyCard's "click to reveal description" is a hover-capability question, not a screen-size
    one → `@media (hover: hover)` / `(hover: none)`, not a breakpoint.
- **No auth/login** — the only form-like element is the MailerLite newsletter embed. No
  `CanActivate` guards. The only routing safeguard is a wildcard redirect to home:
  `{ path: '**', redirectTo: '' }` (this also fixes the current React app's dead catch-all route,
  which never actually matches because it's missing `path="*"`).
- **Images**: Angular's built-in `NgOptimizedImage` (`ngSrc`) with the first-party
  `provideCloudinaryLoader` (cloud name `dcwv2corw`), replacing the manual
  `@cloudinary/react`/`@cloudinary/url-gen` wrapper. Keep the existing `(error)` → placehold.co
  fallback behavior.
- **Routing strategy**: stay on `HashLocationStrategy` for this migration — matches the current
  GitHub Pages static-hosting setup (no server rewrites available) and is the lowest-risk choice
  for preserving functionality. Keep routing config isolated and every page's `Title`/`Meta` calls
  self-contained, so a later switch to SSR/prerendering + `PathLocationStrategy` (see Future plans)
  is a contained change, not a rewrite.

## Future plans (not built now, but the architecture shouldn't block them)

- **Design and SEO optimization** — the real lever is eventually adopting `@angular/ssr`
  prerendering (SSG) and dropping hash routing, so crawlers get real per-route static HTML/meta
  tags instead of a client-rendered hash-routed SPA. Deferred; routing/SEO code is kept isolated
  now so this is possible later without a rewrite.
- **Google Analytics** — re-verify/extend the current gtag page-view-only integration.
  `AnalyticsService` should be structured so adding custom events later (newsletter signup,
  therapy-detail views) is a small addition, not a refactor.
- **New feature: blog posts** — no spec yet. The existing therapies list/detail pattern (static
  data → id lookup → list component + detail route) is a good template to reuse for a future blog
  list/detail feature, so it's kept generic rather than one-off during migration.

## Phase plan

1. Scaffold Angular app (standalone, hash routing, SCSS, Vitest wired in); port global styles/
   tokens (`styles/colors.scss`, `styles/heroSection.scss`, `styles/orderedList.scss`) and
   `public/` assets (favicon, manifest, CNAME, robots.txt, physio.png, under_construction.jpg).
2. Port static data modules verbatim as typed constants: `therapies.ts`, `faqs.ts`, `opinions.ts`
   (×2 datasets), `qualifications.ts`.
3. Build core services: `AnalyticsService` (gtag + router events), a viewport/breakpoint signal
   service (for the one DOM-omission case), the `Title`/`Meta` usage pattern for per-page SEO tags.
4. Build shell/shared components: Header/Menu (CSS-only hamburger breakpoint, no JS mobile
   detection), Footer/Social/Policy, BackToTopButton, FontAwesome
   (`@fortawesome/angular-fontawesome`), Swiper web component registration
   (`swiper/element/bundle`), `NgOptimizedImage` + Cloudinary loader setup.
5. Wire routing: all 8 routes (`/`, `/contacts`, `/online-programs`, `/individual-treatments`,
   `/therapy/:therapyId`, `/terms`, `/privacy`, `/cookie`) + wildcard redirect-to-home, per-route
   `Title`/`Meta`, scroll-to-top on navigation.
6. Migrate pages, easiest → hardest:
   - Cookie, Privacy, Terms (static legal text)
   - Contacts (maps iframe + mailto)
   - Programs (placeholder)
   - LandingPage (hero sections, testimonial swiper, qualifications list)
   - Therapy detail (dynamic route param, DOMPurify-sanitized HTML body, TherapyList)
   - Treatments (in-page anchor nav/scroll, 2 testimonial swipers, FAQ accordion, TherapyList,
     pricing/policy sections, and the MailerLite embed last as its own isolated sub-step — it needs
     manual `<script>` injection via `Renderer2` since Angular strips `<script>` from bound HTML)
7. Build the FAQ accordion (CSS-grid `0fr`→`1fr` collapse, no animation library dependency needed)
   and TherapyList/TherapyCard (hover-media-query description reveal).
8. Build a custom cookie-consent banner matching the current copy/behavior (no Angular port of
   `react-cookie-manager` exists).
9. Mobile-first CSS pass across every component, verified at real breakpoints.
10. QA: Playwright screenshot comparison per route/breakpoint against the live React site, verify
    GA firing, all outbound/mailto links, Cloudinary fallback, MailerLite form actually submits.
11. Deployment: adapt the `gh-pages` publish step for Angular's `dist/` output, verify CNAME +
    hash routing still resolve correctly on GitHub Pages.

## Source-of-truth inventory

A full routes/components/dependencies/styling inventory of the pre-migration React app was done
during planning — see the conversation history and the assistant's persistent memory
(`angular-migration-plan` / `react-app-inventory`) for the detailed breakdown if it's needed again;
it isn't duplicated here to avoid drift with the actual source.

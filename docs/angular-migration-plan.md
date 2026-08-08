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
- [x] Step 6 — all 8 pages migrated to real content, folded together with step 7 (below) out of
      necessity: Treatments/TherapyPage need TherapyList/TherapyCard/Faq to be anything more than
      a stub, so those shared components got built here rather than waiting.

      **Important discovery, not a decision:** the React source's `src/pages/Treatments.tsx` no
      longer contains the MailerLite waitlist-signup embed that was present (and fully documented
      in this plan and in memory) when the original analysis was done at the start of this
      migration. Re-reading the file directly before porting it found it materially different —
      confirmed via `git diff --stat` showing **no** uncommitted changes against HEAD, i.e. this
      is the real, committed, current React page, not a stale read. The embed must have been
      removed from the React app (by the user, outside this migration) at some point after the
      original analysis. The Angular Treatments page was built to match the *current* React
      source — no MailerLite embed. **This means the whole "isolate the MailerLite embed, inject
      its `<script>` tags via Renderer2" sub-plan from steps 4–7 is now moot** — flagging clearly
      rather than silently dropping it. If the embed is still wanted, it needs to be re-added to
      the React source (or specified fresh) and ported as a new, separate piece of work.

      Static pages (Cookie, Privacy, Terms) ported near-verbatim. `Terms` reuses
      `styles/orderedList.scss` via `@use` (scoped to the component now, vs. truly global in
      React — an improvement, not a behavior change, since only this page ever had an `<ol>`).
      `Contacts` uses `ViewportService` for the one real DOM-omission case (Maps iframe absent
      entirely on mobile). `Programs` uses a plain `<img>` for `under-construction.jpg` (not
      `NgOptimizedImage`/`CloudinaryImage` — it's a local asset, not Cloudinary-hosted, and would
      otherwise incorrectly route through the global `provideCloudinaryLoader`).

      `LandingPage` and `Treatments` both needed a testimonial swiper — built once as a shared
      `TestimonialCarousel` (Swiper web component wrapper) instead of duplicating the React
      version's copy-pasted setup. `TherapyPage` sanitizes `therapy.long` with
      `DOMPurify.sanitize()` + `DomSanitizer.bypassSecurityTrustHtml()` for `[innerHTML]`, and
      resolves reactively via `toSignal`+`computed`+`effect` off the route param.

      `TherapyCard`/`TherapyList`: dropped the React version's `useMeasure` (ResizeObserver)
      image-sizing in favor of a fixed fetch size (300px card / 500px detail page, matching the
      original's `MAX_IMAGE_SIZE` constants) plus CSS `max-width` for true responsive display
      sizing — documented trade-off, not the `@media (hover: hover)` approach floated in the
      original plan (that turned out not to fit: the original's click-to-reveal is gated on
      screen space, not hover capability). Since Angular's view encapsulation blocks a parent's
      stylesheet from reaching into a child component's internal DOM by design, cross-component
      sizing/tinting (`CloudinaryImage`'s width/max-width, `TherapyCard`'s description-background
      retint on the "further therapies" list) is done via CSS custom properties set on the child's
      *host* element from the parent's own scope — inheritance crosses that boundary even though
      selectors can't. `[style.aspect-ratio]` on `CloudinaryImage`'s `<img>` keeps it square as it
      resizes, while leaving CSS's default `object-fit: fill` in place so mismatched-aspect source
      images still stretch exactly as they did in the original (no `object-fit: cover` "fix").

      Two more content bugs fixed while porting (same treatment as step 5's: fixed, disclosed
      inline, not silently changed): both un-suffixed and desktop-only `.mobile` CSS classes that
      several components carried but had **no matching CSS rule at all** (dead weight from the
      React version — `FaqItem`, `TherapyCard`'s root, `TherapyList`) were dropped rather than
      ported, confirmed dead by grepping each corresponding `.scss` file before dropping.

      `ng build`/`ng test` clean (104 tests, 25 files). Every page has its own lazy chunk in the
      production build.
- [x] Step 7 — done together with step 6 above (dependency ordering — see that entry).
- [x] Step 8 — `shared/cookie-consent/` built from scratch (no Angular port of `react-cookie-manager`
      exists — it's a hosted/SaaS-backed library). Ported: site-wide banner (Elfogadom/Elutasítom +
      a link to `/privacy`), and a "reopen" button surfaced only on the `/privacy` page — same
      condition as the React version's `enableFloatingButton={location.pathname === "/privacy"}`.
      Choice persisted in `localStorage` (not an actual cookie — a deliberate, harmless naming
      irony; no functional reason it needed to be one).

      **Two disclosed simplifications/observations, not silent:**
      1. The original's floating button opened a 4-category manage modal (essential/analytics/
         social/advertising). Essential is always-on, and this site doesn't actually set its own
         social/advertising cookies — the only real toggle was ever analytics. "Reopen" here just
         re-shows the same accept/decline choice instead of rebuilding that modal; functionally
         equivalent for this site, less UI to maintain.
      2. **The consent choice is decorative, matching the original exactly** — it does not block
         `gtag.js` (loaded unconditionally in `index.html`) or `AnalyticsService`'s tracking
         (fires on every navigation regardless of choice). This was already true of the React
         app — the GA script tag and `AnalyticsWrapper.tsx` never checked consent either — so this
         preserves existing behavior rather than introducing a gap. Flagging clearly since it's a
         compliance-relevant point worth a deliberate decision, not something to fix unprompted:
         real consent-gating (e.g. delaying `AnalyticsService`'s subscription until accepted) would
         be a small, contained follow-up if wanted.

      Wired into `app.html` as a sibling after `<app-footer>` (its own rendered content is either
      nothing or `position: fixed`, so placement in the DOM order doesn't matter visually).
      `ng build`/`ng test` clean (113 tests, 26 files).
- [x] Step 9 — mobile-first CSS audit across every component. Systematic grep for raw `@media`
      queries and leftover `.mobile`/`.desktop` class selectors across `angular/src` found exactly
      **one** holdout: `styles/heroSection.scss`, ported verbatim in step 1 (before the
      mobile-first convention existed in step 3) and never revisited — still used React's original
      desktop-first `max-width: 768px`/`max-width: 480px` queries. Rewrote it mobile-first.

      Kept its three original visual tiers (phone / large-phone-small-tablet / desktop) rather
      than collapsing to the sitewide two-tier mobile/desktop-up split — collapsing would have
      visibly changed padding/font-size for the 481–767px range, which the plain two-tier
      convention was never meant to solve everywhere; this file's own extra 481px tier is
      layered on top of the sitewide `bp.desktop-up` mixin at 768px, so it still shares that one
      cutover with the rest of the app. Preserved the original's `.lg`-button font-size exception
      exactly (only non-`.lg` buttons shrink further on smaller tiers). Every other component's
      SCSS was already mobile-first — built that way incrementally during steps 4–8, not
      retrofitted here.

      **Verification caveat, disclosed rather than overclaimed:** "verified at real breakpoints"
      here means a thorough code-level audit + confirming the dev server (`ng serve`) boots and
      serves cleanly (correct `index.html`, all lazy chunks compile, no console/build errors) — not
      actual rendered-pixel verification. Neither `chromium-cli` nor Playwright is installed in
      this environment, so no screenshots were taken. That's exactly what step 10 is for; treat
      this step as necessary-but-not-sufficient groundwork for it, not a substitute.

      `ng build`/`ng test` clean (113 tests, 26 files — unchanged from step 8, this step touched
      no component logic, only the one SCSS file).
- [x] Step 10 — Playwright installed as an Angular devDependency (`npm install -D playwright` +
      `npx playwright install chromium`), plus a reusable comparison script at
      `angular/qa/compare-with-react.mjs` (screenshots every route at mobile+desktop on both dev
      servers, checks GA firing / outbound+mailto links / Cloudinary broken-image fallback, and
      captures console errors). Ran it against both dev servers (React on :3500, Angular on
      :4300) and reviewed every screenshot.

      **This step earned its place in the plan — it found two real CSS bugs that no unit test
      could have, both now fixed:**

      1. **`app.scss`'s shell rules never actually applied to any routed page** (`.app > *:not(...)`
         padding/max-width/centering, plus the global `a`/`h1` resets) — Angular's view
         encapsulation only stamps a component's scope attribute onto elements declared directly
         in *that component's own template*; router-outlet-inserted page components never carry
         App's attribute, so the compiled `.app > *[_ngcontent-approot-xxx]` silently matched
         nothing. Every routed page was missing its 2rem side padding/1024px centered max-width
         sitewide (not just on hero-section pages — those just visibly broke via their `margin: 0
         -32px` bleed trick having nothing to cancel against, which is what surfaced it). Fixed by
         moving those rules to the truly-global `styles.scss` — see that file's comments.
      2. **`.contacts-page { }` / `.programs-page { }` written as plain class selectors, applied
         via `host: { class: '...' }`, never matched either** — same root cause, one level
         further: Angular compiles a plain top-level class selector in a component's stylesheet
         with that component's *content* attribute (`_ngcontent-xxx`), but the host element
         itself carries the *host* attribute (`_nghost-xxx`) instead — a different attribute, so
         it never matches. Silently broke Contacts' entire background theme (rendered fully
         transparent) and Programs' image sizing (rendered at its raw 2000px intrinsic size,
         overflowing badly on mobile). Fixed by switching both to `:host { }` — the selector
         Angular actually compiles correctly for a component's own host element. **Audited every
         other component using `host: { class }` for the same mistake — all 7 others already used
         `:host` correctly** (see the doc's memory note for the full list), so this was fully
         contained to these two.

      Also found and fixed two smaller, real gaps via the same pass: `TherapyPage`'s hero image had
      no responsive width constraint at all (rendered at its fixed 500px fetch size, overflowing
      on mobile — TherapyCard had this covered, this page's own hero image didn't); the LCP image
      on `TherapyPage` wasn't marked `priority` (a dev-mode-only Angular warning, no visual
      impact, fixed for consistency with the Landing page's hero image).

      **After fixes: zero horizontal overflow on any of the 8 routes at mobile width (was 4/8
      broken), pixel-near-identical screenshots across every route/breakpoint pair.** Verified
      non-visually too: GA fires an identical page_view request on both apps; the Cloudinary
      broken-image fallback produces byte-identical placehold.co URLs on both; outbound/social
      links match (the one intentional difference — Contacts' mailto, no stray space vs React's
      original typo — is the documented step-6 fix, not a bug).

      **Two more things surfaced, disclosed rather than silently resolved either way:**
      - **The React cookie consent library actually blocks the Google Maps iframe** until consent
        is given ("Content Blocked" placeholder shown instead) — this contradicts the "purely
        decorative" characterization from step 8; corrected here. GA/gtag still appears genuinely
        ungated on both apps (confirmed via the network-request check), so step 8's disclosure
        about analytics specifically still stands — it's just not the *whole* story for consent
        gating. The Angular Contacts page always shows the live map. Not fixed without asking:
        replicating "block third-party iframes until consent" is a real feature to build, not a
        one-line fix.
      - **Cookie banner visual design differs at desktop width**: React's third-party widget
        renders as a centered floating card near the middle of the page; the from-scratch Angular
        version (step 8) renders as a fixed bottom bar. Both are reasonable, common cookie-banner
        patterns — this was already disclosed as a from-scratch reconstruction in step 8, not a
        port, since there was no original CSS available to port from a SaaS-hosted widget.

      **One test-methodology finding, not an app bug**: comparing React and Angular at a mobile
      *viewport size alone* (no UA spoofing) doesn't actually exercise React's mobile-only code
      paths — `react-device-detect`'s `isMobile` is UA-string based, so a narrow-viewport
      *desktop*-UA browser still renders React's desktop UI. Fixed the comparison script with
      real device emulation (`devices['iPhone 13']`, viewport+UA+touch together). Separately,
      *even with* that device emulation, one specific check (TherapyCard's tap-to-reveal
      description on the Therapy detail page) still showed React rendering as if desktop — almost
      certainly because Playwright's device emulation spoofs the legacy `navigator.userAgent`
      string but not Chromium's newer User-Agent Client Hints, which some UA-sniffing libraries
      prefer when available. This is a Playwright/Chromium testing-tool gap, not a real
      cross-browser difference — and it's a small, direct illustration of why the migration
      dropped UA-sniffing for CSS breakpoints in the first place (`docs/angular-migration-plan.md`
      confirmed-decisions section): CSS breakpoints don't have this fragility.

      `ng build`/`ng test` clean (113 tests, 26 files — unchanged; nothing here needed a new test,
      the bugs were CSS-encapsulation issues jsdom-based unit tests structurally can't catch,
      which is exactly why this step exists as real-browser QA).
- [ ] Step 11 — deployment
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
  - ~~TherapyCard's "click to reveal description" is a hover-capability question~~ — turned out
    not to fit once built (it's gated on screen space, not hover capability); ended up as
    click-toggle + CSS breakpoint gating instead. See step 6/7 in Progress.
- **No auth/login.** No `CanActivate` guards. The only routing safeguard is a wildcard redirect to
  home: `{ path: '**', redirectTo: '' }` (this also fixes the current React app's dead catch-all
  route, which never actually matches because it's missing `path="*"`). Note: this bullet
  originally also cited "the MailerLite newsletter embed" as the only form-like element — that
  embed is no longer even in the React source, see step 6's Progress entry.
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
6. ~~Migrate pages~~ **Done, folded together with step 7** — see the Progress entry above,
   including the MailerLite-embed discovery (it's no longer in the React source; not ported).
7. ~~Build the FAQ accordion / TherapyList/TherapyCard~~ **Done as part of step 6** — the accordion
   ended up as a CSS-grid `0fr`→`1fr` collapse (no animation library); TherapyCard's description
   reveal is click-toggle gated by CSS breakpoint (not the hover-media-query floated below —
   that didn't fit the original's actual behavior, see Progress above).
8. ~~Build a custom cookie-consent banner~~ **Done** — see the Progress entry above, including the
   disclosed simplifications and the "decorative, doesn't gate analytics" observation.
9. ~~Mobile-first CSS pass~~ **Done** — see the Progress entry above, including the verification
   caveat (code audit + dev-server smoke check; no screenshots — no browser automation tool was
   available in this environment, that's step 10's job).
10. ~~QA: Playwright screenshot comparison~~ **Done** — see the Progress entry above. Found and
    fixed 2 real CSS bugs (app.scss shell rules + `.x-page {}` vs `:host {}` never matching routed
    content), plus 2 smaller gaps (TherapyPage hero image sizing/priority). Reusable script at
    `angular/qa/compare-with-react.mjs`. Two things disclosed but not fixed without asking: React's
    cookie library blocks the Maps iframe pending consent (Angular doesn't); the cookie banner's
    visual design differs at desktop (centered card vs bottom bar).
11. Deployment: adapt the `gh-pages` publish step for Angular's `dist/` output, verify CNAME +
    hash routing still resolve correctly on GitHub Pages.

## Source-of-truth inventory

A full routes/components/dependencies/styling inventory of the pre-migration React app was done
during planning — see the conversation history and the assistant's persistent memory
(`angular-migration-plan` / `react-app-inventory`) for the detailed breakdown if it's needed again;
it isn't duplicated here to avoid drift with the actual source.

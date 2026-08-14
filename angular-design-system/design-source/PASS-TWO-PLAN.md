# Pass two — the remaining routes

Pass one shipped the landing + shell + consent + legal + all 25 DS components. Pass two turns the
six `készülőben` placeholders into real pages. Sources synced from the claude.ai/design project
**KirillaPhysio Design System** (`b46dcf1d-…`, `ui_kits/website/*Screen.jsx`) on 2026-08-14.

The Angular app ships **Online fókusz only** — port the `online` branch of each screen, drop the
`Jelenlegi` branch.

## Routes & what each needs (all core components already exist)

| Route | Screen | Reuses | Net-new work |
|---|---|---|---|
| `/egyeni-kezelesek` | TreatmentsScreen | JumpMenu, StepFlow, TherapyCard, PriceItem, TestimonialCarousel (uses `treatmentsOpinions`), FaqAccordion, SectionHeading, Card | `DashList` (em-dash list, 2-col); scroll-spy for the jump menu; POLICY + COMPLAINTS + FIRST_VISIT + prices content constants |
| `/terapia/:id` | TherapyScreen | Button, Chip, Eyebrow, TherapyCard, `LeadMagnet layout="inline"`, AvailabilityNote | Therapy hero (square Cloudinary image), long clinical copy via `[innerHTML]` (`.kp-rich`, therapy.long has `<strong>`), "Otthon is dolgozhatsz" card, "További kezelések" 4-up grid. Replace the placeholder route with this real page + real SEO |
| `/rolam` | AboutScreen (in LANDING_SOURCE) | SectionHeading, Card, Eyebrow, GradientText, QualificationList | `TriadDiagram` (small inline SVG: Mozgás / Étkezés / Mentálhigiéné), sticky about column, ABOUT paragraphs, "25+" stat card |
| `/online-programok` | ProgramsScreen (in LANDING_SOURCE) | SectionHeading, Button, Card, Chip | Full course grid (`CourseCard` incl. `soon` chip), hero + availability note + video-slot + `LeadMagnet layout="wide"` |
| `/blog` | BlogScreen + `blog-data.js` | SectionHeading, Card, Chip, Eyebrow, Button, CaseStory | Sticky `SectionRail` jump nav w/ scroll-spy; PostsPanel (featured + rows); `PlaylistArt` posters (8 YouTube playlists, lazy YT iframe on click); StoriesPanel (master-list + selected CaseStory). Deep links `/blog#videok`, `/blog#tortenetek` |
| `/blog/:id` | BlogPostScreen + `blog-data.js` | SectionHeading, Button, Card, Eyebrow | Article hero + body via `[innerHTML]`, booking card, "További írások" 3-up |
| `/kapcsolat` | ContactsScreen | Button, Card, Chip, Eyebrow, IconButton | Google Maps iframe (MAP_EMBED constant), address + email + socials cards |

## New shared pieces to build first
- **`image-slot`** — neutral cover placeholder used by blog cards (ids `blog-<post-id>`). Réka's blog photos don't exist yet — render a labelled placeholder, never stock.
- **`PlaylistArt`** — brand SVG poster per body region (spine/neck/hip/knee/foot/hand/stress/vlog). Pull `ui_kits/website/PlaylistArt.jsx` when building blog.
- **`ViewportService`** (`core/`) — the one real JS/DOM breakpoint decision the handoff calls out: the Contacts page must **not render the Maps iframe at all on mobile**. Also gate the iframe behind consent (it's a third-party embed).
- **Blog data** → `data/blog.ts` (posts + stories from `blog-data.js`). **These posts + stories are unreviewed drafts — flag for Réka's sign-off; keep them in data, not templates.**

## Routing changes
- Replace the placeholder `loadComponent` for `/egyeni-kezelesek`, `/terapia/:id`, `/rolam`, `/online-programok`, `/blog`, `/kapcsolat` with the real pages.
- Add `/blog/:id` (prerender params from `blog-data.js` post ids, mirroring `/terapia/:id`).
- `/terapia/:id` prerender params already wired from THERAPIES.

## Watch-outs
- Scroll-spy (Treatments jump menu, Blog rail): the prototype measured a hash-router scroll *container*; our app scrolls `window`. Use IntersectionObserver / `window.scrollY`, browser-only.
- Keep every Cloudinary image through `kp-cloudinary-image` (srcset + fallback).
- SEO: each page calls `SeoService.apply(...)`; port titles/descriptions from the React pages where they exist (Treatments/Therapy/Contacts/Programs have them).

---

# Session-by-session sequence

Each session is a self-contained chunk with a **Definition of Done** (builds clean + prerenders +
screenshot/error-sweep passes). Work on a branch; the landing/shell/consent from pass one is the
stable base. Re-pull a screen via DesignSync (`get_file ui_kits/website/<Screen>.jsx`) at the start
of its session in case the design changed.

## Before starting (once)
- Commit pass one (this is what you're doing now).
- New branch, e.g. `feat/pass-two-pages`.
- Skim `design-source/website/README.md` (route map) and each screen's source in the design project.

## Session 0 — Shared groundwork (do first; everything else depends on it)
1. `core/viewport.service.ts` — SSR-safe (`isPlatformBrowser`), exposes an `isMobile` signal
   (≤767px) + a numeric width signal; used to *omit* the Contacts map on mobile and for any
   `slides-per-view`-style decisions. Browser-only listener via `afterNextRender`.
2. `shared/image-slot/` — neutral labelled cover placeholder (id-based, `blog-<post-id>`), same
   spirit as CoursePromo's placeholder. No stock imagery.
3. `ui/playlist-art/` — port `ui_kits/website/PlaylistArt.jsx` (inline SVG poster per body region:
   spine/neck/hip/knee/foot/hand/stress/vlog).
4. `data/blog.ts` — port `posts` + `stories` from `blog-data.js`. **Header comment flags them as
   unreviewed drafts — keep that note; data-only, not inlined in templates.**
5. Routing: add `/blog/:id` with `getPrerenderParams` from blog post ids (mirror `/terapia/:id`).
   Leave the six page routes on placeholders until each session swaps its own in.
- **Done:** `npm run build` clean, 22+ routes prerender, error sweep clean.

## Session 1 — `/terapia/:id`  (highest value: upgrades a live route from placeholder → real)
- `pages/therapy/therapy-page`: read `:id`; hero (square `kp-cloudinary-image` `c_fill` 1:1, ghost
  "Vissza a terápiákhoz"), Online-fókusz CTA row (PDF + outline booking), long copy via
  `[innerHTML]` on `.kp-rich` (therapy.long has `<strong>`), the "Otthon is dolgozhatsz" block
  (`LeadMagnet layout="inline"` + programs card + `AvailabilityNote`), "További kezelések" 4-up
  `TherapyCard` grid. Unknown id → friendly fallback. SEO per therapy.
- Needs `LeadMagnet` to gain a `layout="inline"` variant (spec in `plan-b.jsx`).
- Swap the `/terapia/:id` route off the placeholder.
- **Done:** `/terapia/fdm`, `/terapia/vagus_terapia` render real content, prerendered, screenshot vs. design.

## Session 2 — `/egyeni-kezelesek`  (Treatments)
- `pages/treatments/…`: hero + `JumpMenu` with **scroll-spy** (IntersectionObserver on section ids,
  browser-only); booking `Card`; `StepFlow` (FIRST_VISIT); `DashList` (COMPLAINTS, 2-col em-dash);
  `TherapyCard` 3-up over all 13; two `PriceItem` + italic payment note; `TestimonialCarousel`
  (`treatmentsOpinions`); `FaqAccordion` (faqs); 3 policy `Card`s.
- Port content constants (JUMP / FIRST_VISIT / COMPLAINTS / prices / POLICY) into the page or a data file.
- New tiny piece: `DashList` (or a shared `.dash-list` style).
- **Done:** page renders, jump-menu highlights the in-view section, screenshot.

## Session 3 — `/rolam` (About) + `/online-programok` (Programs)
- About: sticky bio column, `TriadDiagram` (small inline SVG — Mozgás/Étkezés/Mentálhigiéné),
  "25+" gradient stat card, `QualificationList` (2-col), ABOUT paragraphs. Source: AboutScreen.jsx
  (already in LANDING_SOURCE.md).
- Programs: hero + `AvailabilityNote` + video-slot placeholder + YouTube link, full `CourseCard`
  grid (incl. `soon` → `Chip`), `LeadMagnet layout="wide"` under the catalogue. Source: ProgramsScreen.jsx.
- Swap both routes off placeholders.
- **Done:** both render, screenshots.

## Session 4 — `/blog` + `/blog/:id`
- Blog: sticky `SectionRail` (scroll-spy over `#irasok`/`#videok`/`#tortenetek`); PostsPanel
  (featured + row list, `image-slot` covers); VideosPanel (`PlaylistArt` posters → lazy
  `youtube-nocookie` iframe on click — gate behind consent/social); StoriesPanel (master list +
  selected `CaseStory` + prev/next). Deep links `/blog#videok`, `/blog#tortenetek`.
- Blog post: hero + `image-slot` + body `[innerHTML]` `.kp-rich` + booking card + "További írások" 3-up.
- **Done:** both render, hash deep-links scroll to the section, screenshots.

## Session 5 — `/kapcsolat` (Contacts) + full a11y/responsive pass
- Contacts: Maps iframe from `MAP_EMBED` — **rendered only on desktop** (`ViewportService`) and
  **gated behind consent** (third-party embed → show a "content blocked / engedélyezd" placeholder
  until granted, matching the React app's behaviour); address + email + socials cards.
- Final pass across ALL new routes: extend `qa/*.mjs` route lists; overflow sweep 360–1280,
  reduced-motion, keyboard (jump menus, rail, carousels, blog nav), heading order / landmark a11y.
- **Done:** `qa/errors.mjs` clean on every route, `qa/overflow.mjs` clean, screenshots.

## Session 6 (optional) — deploy / cutover prep
- Wire gh-pages auth (PAT/credentials — not committed), staging subdomain, CNAME if custom domain.
- Verify every route prerenders incl. all `/terapia/:id` and `/blog/:id`; 404 fallback; then cut over.

## Cross-cutting checklist (every session)
- All imagery through `kp-cloudinary-image`; no stock for missing photos (placeholders only).
- Every page: `SeoService.apply(...)`; internal links via `routerLink`; `data-reveal` on sections.
- Hungarian copy verbatim (incl. non-breaking hyphens); drafts stay in `data/`.
- Scroll-spy / observers are browser-only (`afterNextRender` / `isPlatformBrowser`), no SSR crashes.
- Run `npm run build` + `qa/errors.mjs` before calling a session done.


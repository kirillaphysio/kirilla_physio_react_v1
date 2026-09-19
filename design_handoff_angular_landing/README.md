# Handoff: kirillareka.hu redesign — Landing page (Angular rebuild)

## Overview

Rebuild the marketing site of Kirilla Réka (gyógytornász-fizioterapeuta, Budapest) from scratch in
Angular, starting with the **landing page** in the **Online fókusz** direction, on top of a ported
25-component design system.

The current production site is React (CRA) at `kirillaphysio/kirilla_physio_react_v1`. It is **not**
being migrated — it stays untouched as a content and copy reference. The Angular app is a new repo:

```
kirilla_physio_angular_design_system
```

## About the design files

Everything in this bundle is a **design reference created in HTML/React**. It is a prototype showing
intended look and behaviour — **not production code to copy**. The task is to recreate these designs
in Angular using idiomatic Angular patterns. Read the JSX to extract exact values (hex codes, spacing,
type sizes, copy, DOM structure); do not port the JSX itself.

The Hungarian copy **is the product**. Never translate, rewrite, or "improve" it. Copy it verbatim,
including the non-breaking hyphens in words like `gyógytornász‑fizioterapeuta`.

## Fidelity

**High-fidelity.** Final colours, typography, spacing, radii, shadows and interactions. Recreate the UI
faithfully; the design tokens in `design-tokens/` are the source of truth and are already valid CSS.

## Decisions already made

| Area | Decision |
|---|---|
| Framework | Latest Angular, **standalone components + signals**, no NgModules |
| Repo | New repo `kirilla_physio_angular_design_system`, React repo untouched |
| Scope, pass one | **Landing page only.** All other routes exist and render a visible `készülőben` placeholder |
| Direction | **Online fókusz only** (see below). Do not build the "Jelenlegi" variant |
| Design system | Port **all 25 components** up front as folders inside the app (not a separate library) |
| Styling | Global tokens stylesheet + **per-component SCSS** |
| Rendering | **Prerendered static routes (SSG)** — `ng build --prerender`, no SSR server |
| Hosting | Same gh-pages flow as today (`gh-pages -d dist -b main` → `kirillaphysio.github.io`) |
| URLs | **Clean paths** (`/kapcsolat`), no hash routing, no redirects from old `#/` URLs |
| Language | Hungarian hardcoded, no i18n layer |
| Content | JSON files + an injectable service (not inline in templates) |
| Third-party | **None.** No Cloudinary SDK, FontAwesome, Swiper, or react-cookie-manager — build natively |
| Imagery | Keep the existing Cloudinary URLs, plain `<img>` with `srcset` |
| Booking | External link to `https://kirillareka.salonic.hu/` |
| Analytics | Google Analytics `G-0GWJX0SNMX`, **gated behind consent** |
| Consent | Rebuild natively: same four categories and Hungarian strings, restyled in the new design |
| Legal pages | Include as plain text pages (adatkezelés, felhasználási feltételek, cookie) |
| Package manager | npm |
| Delivery | One branch, one PR |
| Launch | Staging subdomain first, cut over when all pages are done |

## What "Online fókusz" means

Réka's calendar is booked weeks ahead, so personal treatment is no longer the primary conversion. The
free PDF (**5 gyakorlat derékfájásra**) is the top of the funnel, online courses are the middle,
personal treatment stays available but secondary. This changes the landing page as specced below.

---

# The landing page, section by section

Route `/`. Page background: `var(--mesh-page)`. Every section is a `<section>` with
`max-width: var(--container-max)` (1180px), `margin: 0 auto`,
`padding: var(--section-y-tight) var(--container-pad)` (64px / 24px).

Full-page render: `screenshots/01-landing-full.png`.
Source: `LANDING_SOURCE.md` → `LandingScreen.jsx` and `plan-b.jsx`.

### 1. Hero

Wrapper `div` with `background: var(--mesh-hero)`, full-bleed; the section inside is the normal
container. Grid `1.05fr .95fr`, `gap: var(--space-16)` (64px), `align-items: center`.

Left column, `flex-column`, `gap: var(--space-6)` (24px):

- `Eyebrow`: `Gyógytornász‑fizioterapeuta · Budapest`
- `h1`, display-1 (68px / 1.04 / -2.4px / 700): `Üdvözöllek a weboldalamon!` — the word
  `weboldalamon` is wrapped in `GradientText` (`--gradient-text`, `background-clip: text`)
- `p`, body-lg, `color: var(--text-body)`, `max-width: 540px`:
  `Kirilla Réka vagyok, elhivatott gyógytornász‑fizioterapeuta. Küldetésem, hogy segítsek neked megszabadulni a fájdalmaktól, helyreállítani a mozgásképességed, és visszanyerni életminőséged.`
- `p`, body-md, `color: var(--text-muted)`, `max-width: 540px`:
  `Módszereim között a gyógytorna, manuálterápia, valamint egyéb kiegészítő kezelések állnak, melyek egyaránt támogatják a fájdalomcsillapítást, a regenerálódást és a prevenciót.`
- CTA row (`flex`, `gap: var(--gap-inline)` 10px, wraps):
  - `Button size="lg"` icon `file-arrow-down`, label `Kérem az 5 gyakorlatot` → smooth-scrolls to the
    `#hirlevel` anchor, landing 90px above it
  - `Button size="lg" variant="outline"`, label `Online programok` → `/online-programok`
- Availability note (`AvailabilityNote`): calendar icon + body-sm `var(--text-muted)`, `max-width: 540px`:
  `A naptáram gyakran hetekre előre betelt, ezért készítettem online programokat: azokat bármikor elkezdheted, és otthonról végezheted.`

Right column: portrait, `aspect-ratio: 3/4`, `object-fit: cover`,
`border-radius: var(--radius-card-lg)` (40px), `box-shadow: var(--shadow-lg)`. Source:
`https://res.cloudinary.com/dcwv2corw/image/upload/c_fill,w_760,h_1000,q_auto,f_auto/kezd%C5%91lap__u1ybav`
Alt: `Kirilla Réka gyógytornász‑fizioterapeuta`.

Two badge cards overlap the image bottom-left (`position: absolute; bottom: -18px; left: -22px`,
flex, wrap, `gap: 10px`), each a plain `Card` `padding="sm" radius="md"` with an icon and semibold
body-sm text, `white-space: nowrap`:

- `house` icon in `var(--rose-500)` — `Otthonról végezhető programok`
- `location-dot` icon in `var(--lilac-600)` — `Egyéni kezelés Budapesten`

### 2. Miért válassz engem?

One `Card surface="mesh" padding="lg" radius="xl"`, grid `.8fr 1.2fr`, `gap: var(--space-12)` (48px).

Left: `SectionHeading` eyebrow `Rólam`, title `Miért válassz engem?`, `level={3}`; below it a
`Button size="sm" variant="ghost"` with a right arrow, `Rólam bővebben` → `/rolam`.

Right: `BenefitList` with three items (rose check marks, body-md):

1. `Szakértői tapasztalat és folyamatosan frissített tudás`
2. `Személyre szabott, hatékony kezelések holisztikus szemléletmóddal`
3. `Empatikus és figyelmes megközelítés`

### 3. Három út, ahogy segíteni tudok (the course ladder)

`SectionHeading` centred, eyebrow `Szolgáltatások`, title `Három út, ahogy segíteni tudok`,
`level={2}`, `margin-bottom: var(--space-10)` (40px).

Then `CourseLadder`: 3-column grid, `gap: var(--gap-grid)` (24px), equal-height cards. Card 2 is
`featured` — `surface="filled"` (the `--gradient-brand` fill) with on-accent text. Each card is
`flex-column`, `gap: var(--gap-stack)` (16px), eyebrow → h3 (heading-1) → semibold body-sm meta →
body-md description (`flex: 1`) → CTA.

| | Eyebrow | Title | Meta | Description | CTA |
|---|---|---|---|---|---|
| 1 | `Első lépés` | `5 gyakorlat derékfájásra` | `Ingyenes · PDF` | `Öt gyakorlat, amit ma el tudsz kezdeni otthon. Ha ez segít, onnan tovább tudunk építeni.` | `Button variant="secondary"` + `file-arrow-down`, `Kérem a PDF-et` → scrolls to `#hirlevel` |
| 2 | `Ha egyedül dolgoznál` | `Online program` | `Bármikor kezdheted · otthonról végezheted` | `Felépített, hetekre bontott programok: videós gyakorlatok, sorrend és haladás. Nem kell időpontra várnod.` | `Button variant="onAccent"` + right arrow, `Programok megtekintése` → `/online-programok` |
| 3 | `Ha kézre van szükséged` | `Személyes kezelés` | `20.000 Ft · 60 perc · Budapest, XII.` | `Állapotfelmérés és komplex kezelés a rendelőben. Akkor a legjobb választás, ha a panasz vizsgálatot igényel.` | `Button variant="outline"`, `Időpontot foglalok` → Salonic |

### 4. Amit már most el tudsz kezdeni

`SectionHeading` eyebrow `Online programok`, title `Amit már most el tudsz kezdeni`, `level={3}`,
lead `Otthon végezhető, hetekre bontott programok. Nem kell időpontra várnod.`

Then `CoursePromo`: the first **two** courses with `status: "live"`, as a
`repeat(auto-fit, minmax(300px, 1fr))` grid. Each card: cover image (190px tall, `object-fit: cover`),
then padding `var(--space-6)` with h3 (heading-2), body-sm description, and two buttons —
`Megnézem` (→ `https://oktatas.kirillareka.hu/`) and `Részletek` ghost (→ `/online-programok`).

Course data (`ProgramsScreen.jsx` in `LANDING_SOURCE.md`), live ones first:

- `Hengerezz okosan` — `Az SMR henger és trigger labda használata`
- `Stabil Gerinc Program` — `A gerincstabilizáló izmok fejlesztése az alapoktól a haladó szintig`

⚠️ **The two cover images do not exist yet.** In the prototype they are empty drop slots
(`course-henger`, `course-gerinc`). Réka needs to supply them; until then render a neutral
placeholder, not a stock photo.

### 5. Kezdjük ott, ahol a panaszod van (symptom router)

`SectionHeading` centred, eyebrow `Hol fáj?`, title `Kezdjük ott, ahol a panaszod van`, `level={2}`,
`max-width: 640px`, lead:
`Válaszd ki a testtájékot, és megmutatom, milyen panaszokkal találkozom ott, és melyik terápiával dolgozom rajta.`

Two-column grid `repeat(auto-fit, minmax(420px, 1fr))`, `gap: var(--space-10)`, centred.

**Left — `BodyMap`:** a schematic body with 8 hotspots, each a dot plus a pill label connected by a
hairline. Percent positions (from `LandingScreen.jsx`):

| id | Label | x | y | label side |
|---|---|---|---|---|
| `fej` | Fej, fejfájás | 50% | 6% | right |
| `nyak` | Nyak | 50% | 15% | left |
| `vall` | Váll, kar | 78% | 23% | right |
| `derek` | Derék, hát | 40% | 34% | left |
| `has` | Belsőszervi panasz | 58% | 42% | right |
| `csipo` | Csípő | 42% | 53% | left |
| `terd` | Térd | 60% | 68% | right |
| `boka` | Boka, láb | 40% | 93% | left |

Default selection `derek`. The active label pill fills with `--gradient-brand` and on-accent text.
Caption under the map, caption-size, muted: `A rajz sematikus, csak a tájékozódást segíti.`

**Right — a plain `Card padding="lg" radius="xl"`,** `flex-column`, `gap: var(--space-6)`:

- `Eyebrow` `Kiválasztva` + h3 (heading-1) with the region label
- Uppercase eyebrow-style label `Amivel itt találkozom`, then a `—`-bulleted list
  (`list-style-type: "\2014"`, `padding-inline-start: 18px`, items body-md `var(--text-body)`,
  8px apart)
- Uppercase label `Amivel dolgozom rajta` + a 20px round info button (`--blush-100` ground,
  `info` icon, `--text-link`) whose tooltip (hover **and** focus, 290px wide, `--surface-raised`,
  `--shadow-pop`) reads:
  `Nem csak ez a három terápia lehet hatásos ezen a testtájékon — ezek a leggyakoribb választásaim, de a kezelési tervet mindig az állapotfelmérés alapján állítom össze.`
- Three therapy links, stacked 10px apart: pill rows (`--radius-pill`, `--blush-100`,
  `--shadow-ring-hairline`, `13px 18px`) with semibold body-md title left and an 11px right arrow in
  `--text-link`, linking to `/terapia/:id`
- Footer row: `Button` `Időpontot foglalok` (Salonic) + ghost `Minden terápia` → `/egyeni-kezelesek`

Per-region content (complaints and the three therapy ids) is in `REGION_DETAIL` in
`LANDING_SOURCE.md` — copy it verbatim into the content JSON. Therapy titles come from the therapy
data (`data.js`, ported from the React repo's `src/components/therapies/therapies.ts`).

### 6. Így néz ki egy kezelési folyamat (case stories)

`SectionHeading` eyebrow `Páciens történetek`, title `Így néz ki egy kezelési folyamat`, `level={2}`,
lead `Két anonimizált eset a praxisomból — a panasztól a kezelési tervig.`

Two `CaseStory` cards side by side (`1fr 1fr`, `gap: var(--gap-grid)`, stretch). Each has a meta
eyebrow, an h3 title, three labelled blocks (`Panasz`, `Mit találtam`, `Mit tettünk` — the label is a
narrow uppercase column, the text body-md and contains `<strong>` emphasis that must be preserved),
a tinted outcome strip with a check icon, and a row of therapy `Chip`s.

Both stories, verbatim, are in `LANDING_SOURCE.md` (`CASES`). Below the grid, centred, a ghost
`Button` with right arrow: `További páciens történetek a blogon` → `/blog#tortenetek`.

### 7. Rólam mondták (testimonials)

`SectionHeading` centred, eyebrow `Visszajelzések`, title `Rólam mondták`, `level={2}`.

`TestimonialCarousel` with `perView={3}`, fed from `KP_DATA.landingOpinions` (the `aboutMeOpinions`
array in `data.js` — five entries, verbatim from production, emoji included). Cards show a
`quote-left` glyph, quote-size text, and the author in caption size. Below: previous/next round
buttons and dot indicators; the active dot is a rose bar. One page moves at a time, no autoplay.

**Replace Swiper** with a native implementation: a flex track with `transform: translateX()`,
`--dur-base` / `--ease-soft`, keyboard arrows, and `perView` dropping to 2 under 900px and 1 under
600px.

### 8. Hírlevél — the lead magnet (anchor `#hirlevel`)

`LeadMagnet layout="wide"`: a `Card surface="tintLilac" padding="lg" radius="xl"`, grid `1fr .85fr`,
`gap: var(--space-12)`, centred.

Left: `Eyebrow tone="lilac"` `Ingyenes PDF`; h2 (heading-1) `5 gyakorlat derékfájásra` inside
`GradientText`; `BenefitList` with:

1. `Öt gyakorlat, amit otthon, eszköz nélkül elvégezhetsz`
2. `Mindegyikhez leírás és annyi ismétlés, amennyi valóban elég`
3. `Utána havonta egy levél arról, mit tehetsz a saját mozgásodért`

Right: a nested plain `Card padding="md" radius="lg"` containing the form —

- `TextField` label `E-mail címed`, `type="email"`, envelope icon, placeholder `pelda@email.hu`
- `Button size="lg" fullWidth`: `Kérem a PDF-et`
- caption, `var(--text-subtle)`:
  `A feliratkozással elfogadod az adatkezelési tájékoztatót. Bármikor leiratkozhatsz.` — with
  `adatkezelési tájékoztatót` linking to `/adatkezeles`

Success state replaces the form with a `circle-check` in `--feedback-success` + body-md
`Köszönöm! A PDF-et elküldtem a megadott címre. Ha nem érkezik meg pár percen belül, nézd meg a spam mappát is.`
and a `Button size="sm" variant="secondary"` with right arrow:
`Megnézem az online programokat` → `https://oktatas.kirillareka.hu/`.

⚠️ **The submit endpoint is not in this bundle** — Réka is providing the mailing-list provider's
endpoint. Until then, POST to a single constant in one service so it is a one-line change, and keep
the client-side states real (idle / submitting / success / error).

---

## Shell: header, footer, back-to-top

- **`Header`** — sticky, glass (`--surface-glass` + `backdrop-filter: var(--blur-glass)`), the logo
  lockup from `assets/` at left, nav pills right; the active pill carries the gradient. Below 900px it
  collapses to a hamburger (`bars` / `xmark`) opening a full-width sheet.
  Nav in Online fókusz mode, in this order:
  `Kezdőlap` `/` · `Online programok` `/online-programok` · `Egyéni kezelések` `/egyeni-kezelesek` ·
  `Rólam` `/rolam` · `Blog` `/blog` · `Kapcsolat` `/kapcsolat`
- **`Footer`** — includes the `WeeklyMessage` block (a rotating weekly message keyed off the ISO week
  number) plus contact details, socials, and the three legal links.
- **`BackToTop`** — a round gradient button, fixed bottom-right, fading in after 260px of scroll,
  smooth-scrolling to top.

Section reveal animation in the prototype (`[data-reveal]`, 34px rise + fade, 950ms
`cubic-bezier(.22,.61,.36,1)`, triggered when the block passes 94% of the viewport) is optional but
nice to keep. It must no-op under `prefers-reduced-motion` and must not hide content when JS is off —
prerendered HTML has to be visible without the reveal class.

## Other routes in pass one

Every route below exists, is prerendered, and renders a `készülőben` placeholder using
`Card surface="tintCream"` + `SectionHeading` + a `Vissza a kezdőlapra` button:

`/online-programok` · `/egyeni-kezelesek` · `/terapia/:id` · `/rolam` · `/blog` · `/kapcsolat`

The three legal pages (`/adatkezeles`, `/feltetelek`, `/cookie`) ship as plain long-form text — port
the text straight from the React repo (`src/pages/Privacy.tsx`, `Cookie.tsx`, and the terms page). No
new design.

## Design system — the 25 components

`COMPONENTS.md` contains, for every component: the `.d.ts` prop contract, the design intent notes, and
the full JSX implementation.

| Group | Components |
|---|---|
| brand | `Wordmark` |
| core | `Button` `Card` `Chip` `Eyebrow` `GradientText` `IconButton` `SectionHeading` |
| content | `BenefitList` `BodyMap` `CaseStory` `FaqAccordion` `JumpMenu` `LinkTile` `PriceItem` `QualificationList` `SelfCheckQuiz` `StatStrip` `StepFlow` `TestimonialCarousel` `TherapyCard` |
| forms | `NewsletterSignup` `TextField` `Textarea` |
| navigation | `BackToTop` `Footer` `Header` `WeeklyMessage` |

Porting rules:

- One standalone component per folder, `kp-` prefixed selector (`kp-button`, `kp-card`).
- Every `.d.ts` prop becomes an `input()`; every `on*` callback becomes an `output()`. Keep the prop
  names and the string-union option values exactly (`variant="onAccentOutline"` etc.) so the specs in
  this README stay readable against the code.
- `children` becomes `<ng-content>`; named slots become named `ng-content` selectors.
- Styles: `styleUrl` per component, tokens referenced as `var(--…)`. Do not redeclare token values.
- `ViewEncapsulation.Emulated` (default) is fine; tokens are global so nothing needs to pierce.

**Icons.** The prototype uses Font Awesome 6 class strings; you are building natively, so create one
`kp-icon` component backed by an inline SVG sprite and keep the same names as keys. The complete set
used across the design system and the landing page (37 glyphs):

```
brands:  facebook instagram tiktok youtube
regular: calendar circle-play
solid:   apple-whole arrow-left arrow-right arrow-up-right-from-square bars bolt brain check
         chevron-down chevron-left chevron-right chevron-up circle-check clock envelope
         file-arrow-down graduation-cap heart hourglass-half house house-medical-flag info
         location-dot moon person-rays person-running person-walking quote-left rotate-left spa xmark
```

## Design tokens

`design-tokens/` holds the real stylesheets — copy them in as the global styles and import them from
`styles.scss` in this order: `fonts, colors, typography, spacing, radius, gradients, elevation,
motion, base, responsive`.

Highlights, so you can sanity-check a render:

- **Type**: Figtree (Google Fonts, 300–900, italic). Display-1 68px/1.04/-2.4px/700, heading-1
  30px/1.22/-0.7px/600, body-md 16.5px/1.66, eyebrow 11.5px/1.3px tracking/700 uppercase.
- **Colour**: the neutral ramp is **plum** (rose-tinted, never grey) — `--plum-800 #54232D` for strong
  text, `--plum-700 #5F3D44` for body. Primary accent `--rose-700 #723056`; companion
  `--lilac-700 #63496C`; page ground `--blush-100 #FBF2F1`.
  `--text-muted` and `--text-subtle` are both `#6C4B54` — that value is deliberate (AA on every
  surface in the system). Hierarchy below body text is carried by size and weight, never by lighter
  colour. `--plum-600` and lighter are decorative only, never text.
- **Gradients**: signature `--gradient-brand` is `135deg, #723056 → #54232D`. The mesh backgrounds
  (`--mesh-page`, `--mesh-hero`, `--mesh-band`, `--mesh-card`) are three blurred radial stops over a
  cream base — use them as-is, do not approximate.
- **Radii**: controls are always pills (`999px`); cards 28px, large cards 40px, inputs 14px.
- **Shadows**: every shadow is plum-tinted, never neutral black. Hairlines are drawn as inset
  shadows (`--shadow-ring-hairline`) so they survive gradient fills.
- **Motion**: `--dur-fast 160ms`, `--dur-base 240ms`, `--ease-soft cubic-bezier(.22,.61,.36,1)`.

Responsive is token-driven: the display/heading ladder and section rhythm scale down at **900px** and
**600px** (see `design-tokens/responsive.css`). Layout collapse belongs to each component — the
prototype's rule is that two-column splits become one column at 900px and grids drop to one column at
600px. Hungarian compound words force `overflow-wrap: anywhere` on headings at small sizes.

There is also a dark theme in the prototype (`html[data-theme="dark"]`). It is **out of scope** for
pass one; ignore `theme-dark.css`.

## State (signals)

Small and local. The landing page needs:

| State | Where | Notes |
|---|---|---|
| `activeRegion` | symptom router | default `'derek'`; drives the body map and the detail card |
| `tooltipOpen` | info tip | opens on hover **and** focus, closes on blur/leave/Escape |
| `carouselIndex` | testimonials | one page per step, clamped, no autoplay |
| `formState` | lead magnet | `idle · submitting · success · error` |
| `email` | lead magnet | validated on submit, not on keystroke |
| `mobileNavOpen` | header | closes on navigation and on Escape |
| `scrolled` | shell | `> 260px`, drives `BackToTop` |
| `consent` | consent service | persisted; four categories; GA loads only after analytics consent |

Content (therapies, regions, cases, opinions, courses, qualifications, FAQ) is static JSON read through
an injectable service — no HTTP, no state library.

## Analytics and consent

Google Analytics `G-0GWJX0SNMX`. The gtag script must **not** load until the visitor accepts the
analytics category. Rebuild the banner natively with the four categories the current site uses —
essential, analytics, social, advertising — and the same Hungarian labels
(`Hozzájárulás megadva` / `Hozzájárulás megtagadva`, `Státusz: {{status}} {{date}}`), restyled in the
new gradient language. The React implementation to read the strings out of is
`src/components/wrappers/CookieManagerWrapper.tsx` in the React repo. Consent must be revocable from
the cookie page.

## Assets

- **Photography** — Cloudinary, cloud `dcwv2corw`. The landing portrait URL is in section 1; the
  remaining ids are listed in `assets/imagery.md`. Keep the URLs, drop the SDK: build `srcset` from
  the `w_` transform parameter (`w_760`, `w_1140`, `w_1520`) and set `sizes` per slot. All Cloudinary
  URLs carry `q_auto,f_auto`.
- **Logo / wordmark** — `assets/` (`logo-lockup.png`, `logo-lockup-tagline.png`, `logo-mark.png`,
  `favicon.ico`). The `Wordmark` component takes an `assetBase`.
- **Missing** — the two course cover images (section 4) and the blog post photography. Do not
  substitute stock imagery.

## Copy status

Everything on the landing page is production copy **except** the Online fókusz additions, which were
written for this redesign and have **not been reviewed by Réka**: the availability note, the hero CTA
labels, all three course-ladder cards, the "Amit már most el tudsz kezdeni" heading and lead, the PDF
benefit bullets, and both case stories. Ship them as-is — she reviews in the repo — but keep them in
the content JSON, not inlined in templates, so she can edit without touching components.

## Files in this bundle

| File | What it is |
|---|---|
| `README.md` | This spec |
| `COMPONENTS.md` | All 25 components: prop contracts, design intent, JSX implementations |
| `LANDING_SOURCE.md` | Landing page prototype source: shell, page, Online fókusz pieces, content data |
| `design-tokens/` | The real token stylesheets + `styles.css` entry point — use directly |
| `assets/` | Logo lockups, favicon, `imagery.md` (Cloudinary id list) |
| `screenshots/01-landing-full.png` | Full-page render of the landing page in Online fókusz mode |

Reference repo for content and copy: `kirillaphysio/kirilla_physio_react_v1` (branch `main`) —
`src/pages/LandingPage.tsx`, `src/components/therapies/therapies.ts`, `src/pages/Privacy.tsx`,
`src/pages/Cookie.tsx`, `src/components/wrappers/CookieManagerWrapper.tsx`.

## Suggested order of work

1. Scaffold the Angular app, npm, SCSS, clean-path routing, prerendering, gh-pages deploy.
2. Drop in `design-tokens/` and get `base.css` + Figtree rendering.
3. Build `kp-icon` and the `core` group (`Button` `Card` `Chip` `Eyebrow` `GradientText`
   `SectionHeading` `IconButton`) — everything else depends on them.
4. Shell: `Header`, `Footer`, `WeeklyMessage`, `BackToTop`, placeholder route component.
5. The remaining content and form components.
6. Assemble the landing page section by section against `screenshots/01-landing-full.png`.
7. Consent banner + gated GA; legal pages.
8. Responsive pass at 900px and 600px, then reduced-motion and keyboard checks.

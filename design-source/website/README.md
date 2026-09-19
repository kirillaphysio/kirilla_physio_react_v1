# UI kit — kirillareka.hu (redesign)

A click-through recreation of the practice's marketing website, rebuilt in the KirillaPhysio gradient
language. Every string is Hungarian and lifted from the production source; the layout and surface
treatment are the redesign.

Open `index.html`.

## Screens

| File | Route | Source it recreates |
|---|---|---|
| `LandingScreen.jsx` | `#/` | `src/pages/LandingPage.tsx` — hero, "Miért válassz engem?", route tiles, "Rólam:", testimonials, "Végzettségeim" |
| `TreatmentsScreen.jsx` | `#/individual-treatments` | `src/pages/Treatments.tsx` — jump menu, booking, complaints, 13 therapies, prices, testimonials, FAQ, policy |
| `TherapyScreen.jsx` | `#/therapy/:id` | `src/pages/Therapy.tsx` — therapy hero, long clinical copy (with its `<strong>` emphasis), other treatments |
| `BlogScreen.jsx` | `#/blog` | No source page — all three sections stacked on one page (**Blog bejegyzések** featured post + list, **YouTube lejátszási listák** with the channel's 8 real playlists, **Páciens történetek** master list + selected `CaseStory`). The rail is an always-visible jump nav: it scrolls to a section and follows the scroll position. `#/blog/videok` and `#/blog/tortenetek` deep-link straight to a section |
| `BlogPostScreen.jsx` | `#/blog/:id` | Dedicated reading screen, built on the therapy-detail pattern: hero, photo, long copy in a narrow card, booking card, "További írások" |
| `blog-data.js` | — | The 6 blog-post drafts and the 7-case patient-story archive. **Drafts — they need Réka's sign-off** |
| `ContactsScreen.jsx` | `#/contacts` | `src/pages/Contacts.tsx` — Google Maps embed, address, email, socials |
| `ProgramsScreen.jsx` | `#/online-programs` | `src/pages/Programs.tsx` — the course catalogue |
| `AboutScreen.jsx` | `#/about` | No source page — the landing page's "Rólam:" and "Végzettségeim" blocks split onto their own route; only linked in Online fókusz mode. Exports `AboutBlock` / `QualificationsBlock`, which the landing page renders inline in Jelenlegi mode |
| `app.jsx` | — | Shell: hash-style routing, scroll container, `Header` / `Footer` / `BackToTop` |
| `data.js` | — | Therapies, FAQ, both testimonial sets and the qualification list, copied verbatim from the source's `.ts` data modules |

## Fókusz tweak — the two directions

The Tweaks panel carries **Fókusz: Jelenlegi / Online fókusz**. "Jelenlegi" is the default and renders the site
exactly as it stands — nothing is removed. "Online fókusz" is the plan B for comparison: the practice's calendar
is full, so the newsletter (a free PDF, *5 gyakorlat derékfájásra*) and the online courses become the primary
conversions and personal treatment stays available but secondary. (The Angular rebuild ships Online fókusz only.)

| Screen | Change (Online fókusz) |
|---|---|
| Landing | Hero CTA row (PDF primary, Online programok secondary) + availability note; two route tiles become a three-tier ladder; a course promo section; "Rólam"/"Végzettségeim" move to their own page; closing band becomes the PDF lead magnet |
| Rólam (`#/about`) | New page (nav item shown only in this mode): bemutatkozás long copy, the módszer triad and Végzettségeim (`AboutScreen.jsx`) |
| Therapy detail (×13) | Hero CTA becomes the PDF with booking as outline; a PDF capture + online-programs card before "További kezelések" |
| Online programok | Hero with availability note, course-preview video slot, link to video content, PDF lead magnet under the catalogue |

Everything else — prices, the 13 therapy pages, FAQ, policy, symptom router, case stories — is untouched.
Shared plan-B pieces live in `plan-b.jsx` (`LeadMagnet`, `CourseLadder`, `CoursePromo`, `AvailabilityNote`).

## Fidelity notes

- Blog-post photography is **empty `<image-slot>` placeholders** (ids `blog-<post-id>`, shared between list card, row thumb and article hero).
- Photography is the real Cloudinary imagery (cloud `dcwv2corw`) — ids in `assets/imagery.md`.
- The Google Maps iframe is the exact embed URL from the source.
- Booking links point at the live Salonic page; "Online programok" points at `oktatas.kirillareka.hu`.
- The legal pages (`#/terms`, `#/privacy`, `#/cookie`) are footer links only — plain long-form text, no distinct design.
- The online-programs surface has no design source; that screen shows only the placeholder, with a note saying so.

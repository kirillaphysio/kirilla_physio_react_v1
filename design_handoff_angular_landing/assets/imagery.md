# Imagery — Cloudinary IDs

All brand photography lives on Cloudinary cloud **`dcwv2corw`** and is publicly readable. Build a URL as:

```
https://res.cloudinary.com/dcwv2corw/image/upload/<imageId>
```

Add transforms before the id when you need a size, e.g. `.../upload/c_fill,w_600,h_600,q_auto,f_auto/<imageId>`.

## Portrait / hero

| Purpose | imageId |
|---|---|
| Landing portrait (300×450 in source) | `kezdőlap__u1ybav` |
| Shared social/OG image ("egyéni kezelés") | `v1744007836/egye%CC%81ni_kezele%CC%81s_wkmddy.jpg` |

## Therapy thumbnails (square, 300–500px in source)

| Therapy | imageId |
|---|---|
| Gyógytorna | `Gyógytorna__zxtbrv` |
| FDM (Fascia Disztorziós Modell) | `FDM_yoyqch` |
| Visceralis terápia | `Visceral_key38l` |
| Vagus terápia | `Vagus_dvqu1y` |
| Mulligan manuálterápia | `Mulligan_o8mzoi` |
| Dorn terápia | `Dorn_terápia__cekv1u` |
| Nyirok kezelés | `Nyirok_kezelés__eogcem` |
| Hegkezelés | `Hegkezelés__wbj806` |
| Köpöly | `Köpöly_tnfza9` |
| Kinezio tape | `Kinezio_Tape_azwszz` |
| Állkapocs‑ízületi terápia | `Állkapocs-ízületi_terápia__qcwsbl` |
| Cranio FDM (Fejfájás terápia) | `CranioFDM_v2d9nz` |
| Neuro‑mozgáskorrekció | `Neuro-mozgáskorrekció__s2qhdv` |

Several ids contain Hungarian accented characters — URL‑encode them (`encodeURIComponent`) as the source's Cloudinary SDK does.

## Fallback

When an image 404s, production swaps in `https://placehold.co/<size>/5F3D44/F8EFF1?text=A+kép+nem+elérhetö`. Keep that behaviour; the colours are already plum‑700 on plum‑50.

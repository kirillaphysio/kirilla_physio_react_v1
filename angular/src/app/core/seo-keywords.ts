/**
 * The keyword-stuffed tail appended to most pages' <meta name="description"> in the React app —
 * but deliberately NOT their Open Graph description, which stayed human-readable there (a
 * legitimate, if old-school, SEO pattern: keyword-stuff the crawler-facing description, keep the
 * social-share preview clean). Ported verbatim; each page passes its own `ogDescription` to
 * SeoService.apply() to reproduce that split.
 */
export const COMMON_SEO_KEYWORDS =
  'Gyógytornász, gyógytorna, manuálterápia, manuális terápia, derékfájás, derékfájdalom, nyakfájás, ' +
  'nyakfájdalom, vállfájdalom, könyökfájdalom, teniszkönyök, golfkönyök, csuklófájdalom, csípőfájdalom, ' +
  'térdfájás, sarkanytú, bokaficam, rehabilitáció, mozgásterápia, holisztikus szemléletmód, porckorongsérv, ' +
  'gerincsérv, becsípődés, húzódás, sérülés, baba projekt, sibo, petefészek ciszta, alternatív terápia, sibo, ' +
  'puffadás, tartásjavító torna, tartásjavítás, gerincferdülés, stresszkezelés, bolygóideg';

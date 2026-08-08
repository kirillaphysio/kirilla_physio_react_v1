/**
 * Shared mobile/desktop breakpoint. Keep this pixel value in sync with
 * src/styles/_breakpoints.scss. Most mobile-vs-desktop differences should be plain CSS via that
 * partial's mixins — this constant exists only for ViewportService, i.e. the rare case that
 * needs a real DOM/JS decision instead of pure layout.
 */
export const MOBILE_MAX_WIDTH_PX = 767;
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_MAX_WIDTH_PX}px)`;

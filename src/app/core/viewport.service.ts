import {
  DOCUMENT,
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Below this width (px, inclusive) the layout is treated as mobile. Matches the 768 CSS breakpoint. */
export const MOBILE_MAX = 767;

/**
 * The one real JS/DOM breakpoint decision the handoff calls out. CSS handles the vast majority
 * of responsive layout; this service exists for the few cases a component must *not render at all*
 * on mobile — chiefly the Contacts page's third-party Maps iframe.
 *
 * SSR-safe: `width` stays 0 during prerender, so `isMobile` reports `false` and the prerendered
 * HTML follows the desktop branch. In the browser `afterNextRender` seeds the real width and keeps
 * it current on resize; any `@if (viewport.isMobile())` block then reconciles on hydration.
 */
@Injectable({ providedIn: 'root' })
export class ViewportService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _width = signal(0);
  /** Current viewport width in px; 0 until the browser reports one (SSR / pre-hydration). */
  readonly width = this._width.asReadonly();

  /** True only once a real browser width ≤ MOBILE_MAX is known — never during prerender. */
  readonly isMobile = computed(() => {
    const w = this._width();
    return w > 0 && w <= MOBILE_MAX;
  });

  constructor() {
    if (!this.isBrowser) return;
    afterNextRender(() => {
      const win = this.doc.defaultView;
      if (!win) return;
      const update = () => this._width.set(win.innerWidth);
      update();
      win.addEventListener('resize', update, { passive: true });
    });
  }
}

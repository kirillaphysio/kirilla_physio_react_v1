import { Injectable, OnDestroy, signal } from '@angular/core';
import { MOBILE_MEDIA_QUERY } from './breakpoints';

/**
 * Tracks whether the viewport currently matches the mobile breakpoint, via `matchMedia` — not
 * UA sniffing (that's the `isMobile` from `react-device-detect` this replaces, see
 * docs/angular-migration-plan.md). Most mobile-vs-desktop layout differences should be plain CSS
 * (see src/styles/_breakpoints.scss) and don't need this service at all.
 *
 * Use this only where a component needs to make a real DOM/JS decision based on viewport width —
 * e.g. not rendering a heavy embed (the Contacts page's Google Maps iframe) on mobile at all,
 * rather than just hiding it with CSS.
 */
@Injectable({ providedIn: 'root' })
export class ViewportService implements OnDestroy {
  private readonly mediaQueryList: MediaQueryList | null =
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA_QUERY) : null;

  private readonly onChange = (event: MediaQueryListEvent): void => {
    this.isMobile.set(event.matches);
  };

  readonly isMobile = signal(this.mediaQueryList?.matches ?? false);

  constructor() {
    this.mediaQueryList?.addEventListener('change', this.onChange);
  }

  ngOnDestroy(): void {
    this.mediaQueryList?.removeEventListener('change', this.onChange);
  }
}

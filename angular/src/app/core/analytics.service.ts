import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const GA_MEASUREMENT_ID = 'G-0GWJX0SNMX';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Wraps the gtag.js integration loaded in index.html (same GA4 property as the React app,
 * G-0GWJX0SNMX — see components/wrappers/AnalyticsWrapper.tsx in the React app for the original).
 * Tracks a page_view on every route change automatically once instantiated — inject it once from
 * the app root component to start tracking (wired in step 4, alongside the rest of the app
 * shell). Route tracking uses the router's post-redirect URL, the hash-routing equivalent of
 * react-router's `location.pathname`.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.trackPageView(event.urlAfterRedirects));
  }

  trackPageView(path: string): void {
    window.gtag?.('config', GA_MEASUREMENT_ID, { page_path: path });
  }

  /**
   * Not used yet — kept so the future GA work in docs/angular-migration-plan.md (custom events
   * like newsletter signups or therapy-detail views) is a small addition, not a refactor.
   */
  trackEvent(name: string, params?: Record<string, unknown>): void {
    window.gtag?.('event', name, params);
  }
}

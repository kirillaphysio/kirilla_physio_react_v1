import {
  DOCUMENT,
  Injectable,
  PLATFORM_ID,
  effect,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ConsentService } from './consent.service';

export const GA_ID = 'G-0GWJX0SNMX';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics, gated behind the analytics consent category. The gtag script is NOT loaded
 * until the visitor grants analytics; once granted it loads and page views are tracked on every
 * route change. Revoking consent disables further collection via the ga-disable flag.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly doc = inject(DOCUMENT);
  private readonly consent = inject(ConsentService);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private loaded = false;

  init(): void {
    if (!this.isBrowser) return;

    effect(() => {
      const granted = this.consent.analyticsGranted();
      (this.doc.defaultView as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] =
        !granted;
      if (granted) this.load();
    });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (this.loaded && this.consent.analyticsGranted()) {
          window.gtag('config', GA_ID, { page_path: e.urlAfterRedirects });
        }
      });
  }

  private load(): void {
    if (this.loaded) return;
    this.loaded = true;

    const s = this.doc.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    this.doc.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }
}

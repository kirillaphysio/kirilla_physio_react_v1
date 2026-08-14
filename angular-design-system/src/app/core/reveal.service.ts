import {
  DOCUMENT,
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Section reveal animation: [data-reveal] blocks rise + fade in as they enter the viewport
 * (~94% line). Progressive enhancement — the CSS only hides blocks once `html.reveal-ready`
 * is set, so prerendered HTML is visible without JS. No-op under prefers-reduced-motion.
 */
@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  init(): void {
    if (!this.isBrowser) return;
    const win = this.doc.defaultView;
    if (!win || win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.doc.documentElement.classList.add('reveal-ready');
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    );

    afterNextRender(() => this.scan());
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => win.requestAnimationFrame(() => this.scan()));
  }

  private scan(): void {
    this.doc
      .querySelectorAll('[data-reveal]:not(.is-revealed)')
      .forEach((el) => this.observer?.observe(el));
  }
}

import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ConsentState {
  /** Essential is always granted — required for the site to work. */
  essential: true;
  analytics: boolean;
  social: boolean;
  advertising: boolean;
  /** ISO date the choice was last saved. */
  date: string;
}

export type ConsentCategory = 'analytics' | 'social' | 'advertising';

const STORAGE_KEY = 'kp-consent';

/**
 * Native cookie-consent state (replaces react-cookie-manager). Four categories; essential is
 * always on. Persisted to localStorage, revocable. GA loads only after `analytics` is granted
 * (the AnalyticsService reacts to `consent()`).
 */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly state = signal<ConsentState | null>(this.read());

  /** Current saved consent, or null if the visitor hasn't chosen yet. */
  readonly consent = computed(() => this.state());
  readonly decided = computed(() => this.state() !== null);
  readonly analyticsGranted = computed(() => this.state()?.analytics === true);

  acceptAll(): void {
    this.persist({ essential: true, analytics: true, social: true, advertising: true });
  }
  declineAll(): void {
    this.persist({ essential: true, analytics: false, social: false, advertising: false });
  }
  save(categories: Record<ConsentCategory, boolean>): void {
    this.persist({ essential: true, ...categories });
  }
  /** True once the given category is granted. Reactive — reads the consent signal. */
  isGranted(category: ConsentCategory): boolean {
    return this.state()?.[category] === true;
  }
  /** Grant a single category, preserving the others (used by consent-gated embeds like blog videos). */
  grant(category: ConsentCategory): void {
    const c = this.state();
    this.persist({
      essential: true,
      analytics: c?.analytics ?? false,
      social: c?.social ?? false,
      advertising: c?.advertising ?? false,
      [category]: true,
    });
  }
  /** Clear the saved choice so the banner shows again (used by the cookie page). */
  revoke(): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* storage unavailable */
      }
    }
    this.state.set(null);
  }

  private persist(partial: Omit<ConsentState, 'date'>): void {
    const next: ConsentState = { ...partial, date: this.today() };
    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
    }
    this.state.set(next);
  }

  private read(): ConsentState | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<ConsentState>;
      return {
        essential: true,
        analytics: !!parsed.analytics,
        social: !!parsed.social,
        advertising: !!parsed.advertising,
        date: parsed.date ?? this.today(),
      };
    } catch {
      return null;
    }
  }

  private today(): string {
    // Prerender never reaches this (browser-only writes), so new Date() is safe here.
    return new Date().toISOString().slice(0, 10);
  }
}

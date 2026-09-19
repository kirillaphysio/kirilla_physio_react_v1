import { DOCUMENT, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'kp-theme';
/** Kept in sync with --surface-page in the light/dark token sets (for the address-bar tint). */
const THEME_COLOR: Record<Theme, string> = { light: '#FBF2F1', dark: '#1E1216' };

/**
 * Light/dark theme controller. The theme is expressed as `html[data-theme]`, which the dark token
 * set (styles/tokens/theme-dark.scss) hangs off. The initial value is set before paint by the
 * inline no-flash script in index.html; this service mirrors that choice into a signal, lets the
 * header toggle it, and persists an explicit choice to localStorage. With no saved choice it follows
 * the OS preference and keeps following it live until the visitor picks one.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** The active theme. Reactive — the header toggle icon reads it. */
  readonly theme = signal<Theme>('light');

  /** Whether the visitor has made an explicit choice (then we stop tracking the OS). */
  private explicit = false;

  constructor() {
    if (!this.isBrowser) return;

    const stored = this.readStored();
    this.explicit = stored !== null;
    // Trust the attribute the no-flash script already set; fall back to OS, then light.
    const current =
      (this.doc.documentElement.getAttribute('data-theme') as Theme | null) ??
      stored ??
      this.osPreference();
    this.theme.set(current);
    this.apply(current);

    // Follow the OS while the visitor hasn't overridden it.
    this.doc.defaultView
      ?.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.explicit) return;
        const next: Theme = e.matches ? 'dark' : 'light';
        this.theme.set(next);
        this.apply(next);
      });
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.explicit = true;
    this.theme.set(theme);
    this.apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }

  private apply(theme: Theme): void {
    this.doc.documentElement.setAttribute('data-theme', theme);
    this.doc
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
  }

  private osPreference(): Theme {
    return this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private readStored(): Theme | null {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch {
      return null;
    }
  }
}

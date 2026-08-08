import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

type ConsentChoice = 'accepted' | 'declined';

const STORAGE_KEY = 'kirillareka-cookie-consent';

/**
 * Replaces the React app's CookieManagerWrapper.tsx (react-cookie-manager, a hosted/SaaS-backed
 * library — no Angular port exists, so this is a from-scratch equivalent, not a port). Ported
 * behavior: a site-wide banner (not a blocking modal) with Elfogadom/Elutasítom, and a "reopen"
 * button surfaced only on the /privacy page — the same condition the React version used for its
 * `enableFloatingButton` prop.
 *
 * Simplification, disclosed: the original exposed a granular manage-modal (essential/analytics/
 * social/advertising toggles) behind that floating button. Essential is always-on and
 * non-optional, and this site doesn't actually set social/advertising cookies of its own — the
 * only real toggle was ever analytics. So "reopen" here just re-shows the same accept/decline
 * choice rather than a 4-category modal; functionally equivalent for this site, simpler UI.
 *
 * Also disclosed, not fixed here: like the React version, this choice is decorative — it doesn't
 * actually block the gtag.js analytics load or AnalyticsService's tracking, which both run
 * unconditionally regardless of what's chosen (same as the original: the GA script tag in
 * index.html and AnalyticsWrapper.tsx never checked consent either). Flagging in case real
 * consent-gating is wanted as separate follow-up work.
 */
@Component({
  selector: 'app-cookie-consent',
  imports: [RouterLink],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss',
})
export class CookieConsent {
  private readonly router = inject(Router);

  private readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly choice = signal<ConsentChoice | null>(readStoredChoice());
  protected readonly bannerOpen = signal(this.choice() === null);

  protected readonly showReopenButton = computed(
    () =>
      !this.bannerOpen() && this.choice() !== null && this.currentPath().split('?')[0].split('#')[0] === '/privacy',
  );

  protected accept(): void {
    this.setChoice('accepted');
  }

  protected decline(): void {
    this.setChoice('declined');
  }

  protected reopen(): void {
    this.bannerOpen.set(true);
  }

  private setChoice(choice: ConsentChoice): void {
    this.choice.set(choice);
    this.bannerOpen.set(false);
    writeStoredChoice(choice);
  }
}

function readStoredChoice(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'accepted' || stored === 'declined' ? stored : null;
  } catch {
    // Storage can throw under blocked-storage/private-browsing settings — just re-ask each visit.
    return null;
  }
}

function writeStoredChoice(choice: ConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Choice still holds for this page load via the signal; it just won't persist.
  }
}

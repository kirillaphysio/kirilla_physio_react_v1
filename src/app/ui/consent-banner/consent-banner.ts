import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../button/button';
import { ConsentCategory, ConsentService } from '../../core/consent.service';

interface CategoryRow {
  key: 'essential' | ConsentCategory;
  title: string;
  subtitle: string;
  locked: boolean;
}

const CATEGORIES: CategoryRow[] = [
  { key: 'essential', title: 'Alapvető', subtitle: 'Szükséges a weboldal megfelelő működéséhez', locked: true },
  { key: 'analytics', title: 'Analitika', subtitle: 'Segít megérteni, hogyan lépnek kapcsolatba a látogatók weboldalunkkal', locked: false },
  { key: 'social', title: 'Közösségi média', subtitle: 'Engedélyezi a közösségi média funkcióit és a megosztást', locked: false },
  { key: 'advertising', title: 'Hirdetés', subtitle: 'Személyre szabja a hirdetéseket és méri azok teljesítményét', locked: false },
];

/**
 * Native cookie-consent banner (replaces react-cookie-manager). Shows until the visitor chooses.
 * Four categories with the source's Hungarian strings; essential is always on. GA loads only
 * after the analytics category is granted (AnalyticsService reacts to the saved consent).
 */
@Component({
  selector: 'kp-consent-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button],
  templateUrl: './consent-banner.html',
  styleUrl: './consent-banner.scss',
  host: { ngSkipHydration: 'true' },
})
export class ConsentBanner {
  private readonly consent = inject(ConsentService);

  readonly categories = CATEGORIES;
  readonly visible = computed(() => !this.consent.decided());
  readonly manageOpen = signal(false);

  // Toggle state for the manage modal (seeded from any existing choice).
  readonly analytics = signal(false);
  readonly social = signal(false);
  readonly advertising = signal(false);

  toggleValue(key: 'essential' | ConsentCategory) {
    switch (key) {
      case 'analytics':
        return this.analytics;
      case 'social':
        return this.social;
      case 'advertising':
        return this.advertising;
      default:
        return null;
    }
  }

  acceptAll(): void {
    this.consent.acceptAll();
  }
  declineAll(): void {
    this.consent.declineAll();
  }

  openManage(): void {
    const current = this.consent.consent();
    this.analytics.set(current?.analytics ?? false);
    this.social.set(current?.social ?? false);
    this.advertising.set(current?.advertising ?? false);
    this.manageOpen.set(true);
  }
  closeManage(): void {
    this.manageOpen.set(false);
  }
  saveManage(): void {
    this.consent.save({
      analytics: this.analytics(),
      social: this.social(),
      advertising: this.advertising(),
    });
    this.manageOpen.set(false);
  }

  toggle(key: 'essential' | ConsentCategory): void {
    const sig = this.toggleValue(key);
    sig?.set(!sig());
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.manageOpen()) this.closeManage();
  }
}

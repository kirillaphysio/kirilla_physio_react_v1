import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { ConsentService } from '../../core/consent.service';
import { Button } from '../../ui';

@Component({
  selector: 'app-cookie-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './cookie-page.html',
})
export class CookiePage {
  private readonly consent = inject(ConsentService);

  constructor() {
    inject(SeoService).apply({
      title: 'Cookie nyilatkozat - Kirilla Réka gyógytornász‑fizioterapeuta',
      description: 'Kirilla Réka gyógytornász-fizioterapeuta Cookie nyilatkozat.',
      ogUrl: 'https://www.kirillareka.hu/cookie',
    });
  }

  /** Revoke the saved choice so the consent banner reappears for a fresh decision. */
  reopenConsent(): void {
    this.consent.revoke();
  }
}

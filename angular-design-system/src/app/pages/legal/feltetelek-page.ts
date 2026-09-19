import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-feltetelek-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feltetelek-page.html',
})
export class FeltetelekPage {
  constructor() {
    inject(SeoService).apply({
      title: 'ÁSZF - Kirilla Réka gyógytornász‑fizioterapeuta',
      description:
        'Kirilla Réka gyógytornász-fizioterapeuta Általános Szerződési Feltételek.',
      ogUrl: 'https://www.kirillareka.hu/feltetelek',
    });
  }
}

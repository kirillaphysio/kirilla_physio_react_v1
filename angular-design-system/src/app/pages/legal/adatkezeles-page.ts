import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-adatkezeles-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './adatkezeles-page.html',
})
export class AdatkezelesPage {
  constructor() {
    inject(SeoService).apply({
      title: 'Adatvédelmi Tájékoztató - Kirilla Réka gyógytornász‑fizioterapeuta',
      description: 'Kirilla Réka gyógytornász-fizioterapeuta Adatkezelési Tájékoztató.',
      ogUrl: 'https://www.kirillareka.hu/adatkezeles',
    });
  }
}

import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';

@Component({
  selector: 'app-privacy',
  imports: [],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {
  constructor() {
    inject(SeoService).apply({
      title: 'Adatkezelési Tájékoztató programok - Kirilla Réka gyógytornász-fizioterapeuta',
      canonical: 'https://www.kirillareka.hu/#/privacy',
      description: `Kirilla Réka gyógytornász-fizioterapeuta Adatkezelési Tájékoztató. ${COMMON_SEO_KEYWORDS}`,
      ogDescription: 'Kirilla Réka gyógytornász-fizioterapeuta Adatkezelési Tájékoztató.',
      ogType: 'product',
      // Note: the React version's og:title was a copy-paste leftover from the Programs page
      // ("Online programok - ...", not matching this page's real title) — not reproduced here,
      // left to default to the correct title instead. See docs/angular-migration-plan.md.
    });
  }
}

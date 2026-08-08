import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';

@Component({
  selector: 'app-terms',
  imports: [],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms {
  constructor() {
    inject(SeoService).apply({
      title: 'ÁSZF - Kirilla Réka gyógytornász-fizioterapeuta',
      canonical: 'https://www.kirillareka.hu/#/terms',
      description: `Kirilla Réka gyógytornász-fizioterapeuta Általános Szerződési Feltételek. ${COMMON_SEO_KEYWORDS}`,
      ogDescription: 'Kirilla Réka gyógytornász-fizioterapeuta Általános Szerződési Feltételek.',
      ogType: 'product',
    });
  }
}

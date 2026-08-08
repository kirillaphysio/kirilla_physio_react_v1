import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';

@Component({
  selector: 'app-programs',
  imports: [],
  templateUrl: './programs.html',
  styleUrl: './programs.scss',
  host: { class: 'programs-page' },
})
export class Programs {
  constructor() {
    inject(SeoService).apply({
      title: 'Online programok - Kirilla Réka gyógytornász-fizioterapeuta',
      canonical: 'https://www.kirillareka.hu/#/online-programs',
      description: `Kirilla Réka gyógytornász-fizioterapeuta otthonrol végezhető, online programjai. ${COMMON_SEO_KEYWORDS}`,
      ogDescription: 'Kirilla Réka gyógytornász-fizioterapeuta otthonrol végezhető, online programjai.',
      ogType: 'product',
    });
  }
}

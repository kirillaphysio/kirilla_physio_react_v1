import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';

@Component({
  selector: 'app-cookie',
  imports: [],
  templateUrl: './cookie.html',
  styleUrl: './cookie.scss',
})
export class Cookie {
  constructor() {
    inject(SeoService).apply({
      title: 'Cookie nyilatkozat - Kirilla Réka gyógytornász-fizioterapeuta',
      canonical: 'https://www.kirillareka.hu/#/cookie',
      description: `Kirilla Réka gyógytornász-fizioterapeuta Cookie nyilatkozat. ${COMMON_SEO_KEYWORDS}`,
      ogDescription: 'Kirilla Réka gyógytornász-fizioterapeuta Cookie nyilatkozat.',
      ogType: 'product',
    });
  }
}

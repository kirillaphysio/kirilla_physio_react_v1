import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  host: { class: 'contacts-page' },
})
export class Contacts {
  constructor() {
    inject(SeoService).apply({
      title: 'Kapcsolat - Kirilla Réka gyógytornász-fizioterapeuta',
      canonical: 'https://www.kirillareka.hu/#/contacts',
      description: `Kirilla Réka gyógytornász-fizioterapeuta honlapjának kapcsolat oldala, ahol tájékozódhatsz Réka elérhetőségeiről. ${COMMON_SEO_KEYWORDS}`,
      // React's og:description had a duplicated "honlapjának honlapjának" typo — not reproduced.
      ogDescription: 'Kirilla Réka gyógytornász-fizioterapeuta honlapjának kapcsolat oldala, ahol tájékozódhatsz Réka elérhetőségeiről.',
      ogType: 'place',
    });
  }
}

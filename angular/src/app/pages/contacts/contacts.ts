import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';
import { ViewportService } from '../../core/viewport.service';

@Component({
  selector: 'app-contacts',
  imports: [FaIconComponent],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  host: { class: 'contacts-page' },
})
export class Contacts {
  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faEnvelope = faEnvelope;

  // The map iframe is omitted from the DOM entirely on mobile (not just hidden), same as the
  // React version — that's a real DOM decision, hence ViewportService rather than CSS.
  protected readonly isMobile = inject(ViewportService).isMobile;

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

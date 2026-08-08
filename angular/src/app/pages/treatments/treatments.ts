import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';
import { therapies } from '../../data/therapy';

@Component({
  selector: 'app-treatments',
  imports: [],
  templateUrl: './treatments.html',
  styleUrl: './treatments.scss',
  // Note: "treatment-page" singular, matching the original Treatments.scss selector exactly.
  host: { class: 'treatment-page' },
})
export class Treatments {
  constructor() {
    const description =
      'Kirilla Réka gyógytornász-fizioterapeuta honlapjának egyéni kezeléseket bemutató oldala, ahol ' +
      'tájékozódhatsz a kezelések menetéről, az alkalmazott terápiákról, árakról.';

    inject(SeoService).apply({
      title: 'Egyéni kezelések - Kirilla Réka gyógytornász-fizioterapeuta',
      canonical: 'https://www.kirillareka.hu/#/individual-treatments',
      description: `${description} ${COMMON_SEO_KEYWORDS} ${therapies.map((therapy) => therapy.title).join(', ')}`,
      ogDescription: description,
      ogType: 'product',
    });
  }
}

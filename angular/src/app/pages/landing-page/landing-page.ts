import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  host: { class: 'landing-page' },
})
export class LandingPage {
  constructor() {
    const description =
      'Kirilla Réka gyógytornász-fizioterapeuta honlapjának kezdőoldala, ahol többek közt tájékozódhatsz Réka ' +
      'szakmai múltjáról, végzettségeiről és betekintést kaphatsz a honlap további tartalmába.';

    inject(SeoService).apply({
      title: 'Kirilla Réka gyógytornász-fizioterapeuta',
      canonical: 'https://www.kirillareka.hu',
      description: `${description} ${COMMON_SEO_KEYWORDS}`,
      ogDescription: description,
      // ogType defaults to 'website', matching the original.
    });
  }
}

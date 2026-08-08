import { Component, ElementRef, Signal, inject, viewChild } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';
import { therapies } from '../../data/therapy';
import { treatmentsTestimonials } from '../../data/testimonials-treatments';
import { TherapyList } from '../../shared/therapy-list/therapy-list';
import { TestimonialCarousel } from '../../shared/testimonial-carousel/testimonial-carousel';
import { Faq } from '../../shared/faq/faq/faq';

@Component({
  selector: 'app-treatments',
  imports: [FaIconComponent, TherapyList, TestimonialCarousel, Faq],
  templateUrl: './treatments.html',
  styleUrl: './treatments.scss',
  // Note: "treatment-page" singular, matching the original Treatments.scss selector exactly.
  host: { class: 'treatment-page' },
})
export class Treatments {
  protected readonly faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  protected readonly testimonials = treatmentsTestimonials;

  // viewChild signal queries + scrollIntoView, replacing the React version's 7 useRefs +
  // scrollToSection callback. Locator strings below name the *Ref template reference variables
  // in treatments.html (not these property names — a #ref and a same-named class property would
  // otherwise shadow each other inside the template).
  protected readonly bookingSection = viewChild<ElementRef<HTMLElement>>('bookingRef');
  protected readonly helpSection = viewChild<ElementRef<HTMLElement>>('helpRef');
  protected readonly therapiesSection = viewChild<ElementRef<HTMLElement>>('therapiesRef');
  protected readonly pricesSection = viewChild<ElementRef<HTMLElement>>('pricesRef');
  protected readonly feedbackSection = viewChild<ElementRef<HTMLElement>>('feedbackRef');
  protected readonly faqSection = viewChild<ElementRef<HTMLElement>>('faqRef');
  protected readonly policySection = viewChild<ElementRef<HTMLElement>>('policyRef');

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

  protected scrollTo(section: Signal<ElementRef<HTMLElement> | undefined>): void {
    section()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}

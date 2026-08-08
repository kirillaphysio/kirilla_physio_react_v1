import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faHouse, faHouseMedicalFlag } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from '../../core/seo.service';
import { COMMON_SEO_KEYWORDS } from '../../core/seo-keywords';
import { CloudinaryImage } from '../../shared/cloudinary-image/cloudinary-image';
import { TestimonialCarousel } from '../../shared/testimonial-carousel/testimonial-carousel';
import { landingTestimonials } from '../../data/testimonials-landing';
import { qualifications } from '../../data/qualification';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, FaIconComponent, CloudinaryImage, TestimonialCarousel],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  host: { class: 'landing-page' },
})
export class LandingPage {
  protected readonly faCheck = faCheck;
  protected readonly faHouseMedicalFlag = faHouseMedicalFlag;
  protected readonly faHouse = faHouse;
  protected readonly testimonials = landingTestimonials;
  protected readonly qualifications = qualifications;

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

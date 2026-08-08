import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, input } from '@angular/core';
import { ViewportService } from '../../core/viewport.service';
import { Testimonial } from '../../data/testimonial';

/**
 * Wraps the Swiper web component (registered globally in main.ts) into the testimonial carousel
 * used on both the Landing and Treatments pages — the React app duplicated this Swiper setup
 * verbatim in both pages; here it's a single reusable component instead.
 *
 * CUSTOM_ELEMENTS_SCHEMA: <swiper-container>/<swiper-slide> aren't Angular components, so Angular
 * would otherwise reject them as unknown elements.
 */
@Component({
  selector: 'app-testimonial-carousel',
  imports: [],
  templateUrl: './testimonial-carousel.html',
  styleUrl: './testimonial-carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialCarousel {
  readonly testimonials = input.required<Testimonial[]>();

  // slidesPerView is a real Swiper layout parameter (JS-computed slide widths), not something CSS
  // alone can express — a legitimate ViewportService use, unlike most other isMobile branches in
  // the React app.
  protected readonly isMobile = inject(ViewportService).isMobile;

  protected readonly autoplay = { delay: 2500, disableOnInteraction: true };
  protected readonly pagination = { dynamicBullets: true };
}

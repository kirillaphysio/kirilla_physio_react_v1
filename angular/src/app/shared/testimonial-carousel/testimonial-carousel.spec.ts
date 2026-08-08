import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCarousel } from './testimonial-carousel';
import { stubMatchMedia } from '../../../testing/stub-match-media';

describe('TestimonialCarousel', () => {
  let fixture: ComponentFixture<TestimonialCarousel>;

  const testimonials = [
    { author: 'A. Author', description: 'First testimonial.' },
    { author: 'B. Author', description: 'Second testimonial.' },
  ];

  async function create(mobile: boolean): Promise<void> {
    stubMatchMedia(mobile);

    await TestBed.configureTestingModule({
      imports: [TestimonialCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialCarousel);
    fixture.componentRef.setInput('testimonials', testimonials);
    await fixture.whenStable();
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', async () => {
    await create(false);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders one slide per testimonial', async () => {
    await create(false);
    const slides = (fixture.nativeElement as HTMLElement).querySelectorAll('swiper-slide');
    expect(slides.length).toBe(testimonials.length);
    expect(slides[0].textContent).toContain('First testimonial.');
    expect(slides[0].textContent).toContain('A. Author');
  });

  it('shows 3 slides per view on desktop', async () => {
    await create(false);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('swiper-container')?.getAttribute('slides-per-view'),
    ).toBe('3');
  });

  it('shows 1 slide per view on mobile', async () => {
    await create(true);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('swiper-container')?.getAttribute('slides-per-view'),
    ).toBe('1');
  });
});

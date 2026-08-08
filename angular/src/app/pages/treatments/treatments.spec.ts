import { provideCloudinaryLoader } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { Treatments } from './treatments';
import { therapies } from '../../data/therapy';
import { treatmentsTestimonials } from '../../data/testimonials-treatments';
import { faqs } from '../../data/faq';
import { stubMatchMedia } from '../../../testing/stub-match-media';

describe('Treatments', () => {
  let fixture: ComponentFixture<Treatments>;

  beforeEach(async () => {
    stubMatchMedia(false); // TestimonialCarousel injects ViewportService

    await TestBed.configureTestingModule({
      imports: [Treatments],
      providers: [provideRouter([]), provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw')],
    }).compileComponents();

    fixture = TestBed.createComponent(Treatments);
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the treatment-page class (singular) on its host element', () => {
    expect((fixture.nativeElement as HTMLElement).classList.contains('treatment-page')).toBe(true);
  });

  it('has 7 local-menu items, each scrolling its own section into view when clicked', () => {
    const el = fixture.nativeElement as HTMLElement;
    const items = el.querySelectorAll<HTMLElement>('.local-menu li');
    expect(items.length).toBe(7);

    const sections = ['bookingSection', 'helpSection', 'therapiesSection', 'pricesSection', 'feedbackSection', 'faqSection', 'policySection'] as const;
    for (const [index, sectionName] of sections.entries()) {
      const section = fixture.componentInstance[sectionName]();
      // jsdom doesn't implement scrollIntoView at all, so there's nothing for vi.spyOn to wrap —
      // stub it directly instead.
      const stub = vi.fn();
      section!.nativeElement.scrollIntoView = stub;
      items[index].click();
      expect(stub).toHaveBeenCalledWith({ behavior: 'smooth' });
    }
  });

  it('links the booking CTA to the external Salonic booking site', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>('.cta-button');
    expect(link?.getAttribute('href')).toBe('https://kirillareka.salonic.hu/');
  });

  it('renders the full therapy list', () => {
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-therapy-card');
    expect(cards.length).toBe(therapies.length);
  });

  it('passes the treatments testimonial set to the carousel', () => {
    const slides = (fixture.nativeElement as HTMLElement).querySelectorAll('swiper-slide');
    expect(slides.length).toBe(treatmentsTestimonials.length);
  });

  it('renders the FAQ accordion', () => {
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('app-faq-item');
    expect(items.length).toBe(faqs.length);
  });

  it('sets the page title, canonical link and Open Graph tags', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Egyéni kezelések - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu/#/individual-treatments',
    );
    expect(meta.getTag('property="og:type"')?.content).toBe('product');
  });

  it('appends every therapy title to the meta description, but not the Open Graph description', () => {
    const meta = TestBed.inject(Meta);
    const description = meta.getTag('name="description"')?.content ?? '';
    const ogDescription = meta.getTag('property="og:description"')?.content ?? '';

    for (const therapy of therapies) {
      expect(description).toContain(therapy.title);
      expect(ogDescription).not.toContain(therapy.title);
    }
  });
});

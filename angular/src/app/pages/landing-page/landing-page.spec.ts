import { provideCloudinaryLoader } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { LandingPage } from './landing-page';
import { stubMatchMedia } from '../../../testing/stub-match-media';
import { landingTestimonials } from '../../data/testimonials-landing';
import { qualifications } from '../../data/qualification';

describe('LandingPage', () => {
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async () => {
    stubMatchMedia(false); // TestimonialCarousel injects ViewportService

    await TestBed.configureTestingModule({
      imports: [LandingPage],
      providers: [provideRouter([]), provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw')],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPage);
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the landing-page class on its host element, for the .app > [class$="-page"] layout rule', () => {
    expect((fixture.nativeElement as HTMLElement).classList.contains('landing-page')).toBe(true);
  });

  it('links the individual-treatments card via routerLink and the online-programs card via a plain external href', () => {
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.card');
    expect(cards[0].getAttribute('href')).toBe('/individual-treatments');
    expect(cards[1].getAttribute('href')).toBe('https://oktatas.kirillareka.hu/');
  });

  it('passes the landing testimonial set to the carousel', () => {
    const carousel = (fixture.nativeElement as HTMLElement).querySelectorAll('swiper-slide');
    expect(carousel.length).toBe(landingTestimonials.length);
  });

  it('lists every qualification', () => {
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('.qualifications li');
    expect(items.length).toBe(qualifications.length);
  });

  it('sets the page title, canonical link and Open Graph tags', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu',
    );
    expect(meta.getTag('name="description"')?.content).toContain('kezdőoldala');
    expect(meta.getTag('name="description"')?.content).toContain('Gyógytornász, gyógytorna');
    expect(meta.getTag('property="og:description"')?.content).not.toContain('Gyógytornász, gyógytorna');
    expect(meta.getTag('property="og:type"')?.content).toBe('website');
  });
});

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AnalyticsService } from './analytics.service';

@Component({ selector: 'app-blank', template: '' })
class BlankComponent {}

describe('AnalyticsService', () => {
  let gtagSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtagSpy = vi.fn();
    window.gtag = gtagSpy as unknown as Window['gtag'];

    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: BlankComponent },
          { path: 'contacts', component: BlankComponent },
        ]),
      ],
    });
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('tracks a page view via gtag on every navigation, once instantiated', async () => {
    TestBed.inject(AnalyticsService); // start tracking, mirrors injecting it from the app root
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/contacts');

    expect(gtagSpy).toHaveBeenCalledWith('config', 'G-0GWJX0SNMX', { page_path: '/contacts' });
  });

  it('does not track navigations that happened before it was instantiated', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/contacts');
    expect(gtagSpy).not.toHaveBeenCalled();
  });

  it('does not throw when gtag is not present on window', () => {
    delete window.gtag;
    const service = TestBed.inject(AnalyticsService);

    expect(() => service.trackPageView('/x')).not.toThrow();
  });

  it('trackEvent forwards to gtag as a GA event', () => {
    const service = TestBed.inject(AnalyticsService);

    service.trackEvent('newsletter_signup', { source: 'treatments' });

    expect(gtagSpy).toHaveBeenCalledWith('event', 'newsletter_signup', { source: 'treatments' });
  });
});

import { provideCloudinaryLoader } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { stubMatchMedia } from '../testing/stub-match-media';
import { LandingPage } from './pages/landing-page/landing-page';
import { Contacts } from './pages/contacts/contacts';
import { Programs } from './pages/programs/programs';
import { Treatments } from './pages/treatments/treatments';
import { TherapyPage } from './pages/therapy-page/therapy-page';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';
import { Cookie } from './pages/cookie/cookie';

describe('app routes', () => {
  beforeEach(() => {
    stubMatchMedia(false); // Contacts injects ViewportService, which reads matchMedia eagerly.
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw')],
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    ['/', LandingPage],
    ['/contacts', Contacts],
    ['/online-programs', Programs],
    ['/individual-treatments', Treatments],
    ['/therapy/gyogytorna', TherapyPage],
    ['/terms', Terms],
    ['/privacy', Privacy],
    ['/cookie', Cookie],
  ] as const)('routes %s to the right page component', async (path, componentType) => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl(path);

    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(componentType);
  });

  it('redirects an unmatched path to home', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/this-page-does-not-exist');

    expect(TestBed.inject(Router).url).toBe('/');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(LandingPage);
  });
});

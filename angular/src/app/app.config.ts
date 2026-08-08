import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideCloudinaryLoader } from '@angular/common';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // URLs stay as /#/route, matching the GitHub Pages static-hosting deploy (no server-side
      // rewrites available). See docs/angular-migration-plan.md.
      withHashLocation(),
      // Scrolls to top on every navigation — replaces the React app's ScrollToTopWrapper
      // (useLayoutEffect(() => document.documentElement.scrollTo(0, 0), [location.pathname])).
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    // Same Cloudinary cloud as the React app (dcwv2corw) — see shared/cloudinary-image.
    provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw'),
  ]
};

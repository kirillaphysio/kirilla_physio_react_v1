import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideCloudinaryLoader } from '@angular/common';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withHashLocation(): URLs stay as /#/route, matching the GitHub Pages static-hosting
    // deploy (no server-side rewrites available). See docs/angular-migration-plan.md.
    provideRouter(routes, withHashLocation()),
    // Same Cloudinary cloud as the React app (dcwv2corw) — see shared/cloudinary-image.
    provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw'),
  ]
};

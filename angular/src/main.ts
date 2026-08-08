import { bootstrapApplication } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Registers <swiper-container>/<swiper-slide> as custom elements. Not used by any component yet
// (that's step 6 — the testimonial carousels on the Landing/Treatments pages) but the
// registration itself is one-time, global app bootstrap wiring, so it lives here.
register();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

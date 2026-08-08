import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './core/analytics.service';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { BackToTopButton } from './shared/back-to-top-button/back-to-top-button';
import { CookieConsent } from './shared/cookie-consent/cookie-consent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, BackToTopButton, CookieConsent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Injected only to force instantiation at bootstrap — AnalyticsService starts tracking page
  // views as soon as it exists (see its constructor). Mirrors where <AnalyticsTracker /> sat in
  // the React app's component tree (App.tsx).
  private readonly analytics = inject(AnalyticsService);

  // Scroll-to-top-on-navigation: handled by withInMemoryScrolling in app.config.ts (step 5),
  // replacing React's ScrollToTopWrapper — no component needed here.
}

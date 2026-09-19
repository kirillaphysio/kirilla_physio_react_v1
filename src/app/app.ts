import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './ui/header/header';
import { Footer } from './ui/footer/footer';
import { BackToTop } from './ui/back-to-top/back-to-top';
import { ConsentBanner } from './ui/consent-banner/consent-banner';
import { AnalyticsService } from './core/analytics.service';
import { RevealService } from './core/reveal.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer, BackToTop, ConsentBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    inject(AnalyticsService).init();
    inject(RevealService).init();
  }
}

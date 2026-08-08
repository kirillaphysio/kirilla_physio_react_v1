import { Component, OnDestroy, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-to-top-button',
  imports: [FaIconComponent],
  templateUrl: './back-to-top-button.html',
  styleUrl: './back-to-top-button.scss',
})
export class BackToTopButton implements OnDestroy {
  protected readonly faArrowUp = faArrowUp;

  // Visible once scrolled past one viewport height — same threshold as the React version's
  // `y > height` (react-use's useWindowScroll/useWindowSize). Restricting this to mobile at all
  // is handled in CSS (see back-to-top-button.scss), not here.
  protected readonly visible = signal(false);

  private readonly onScroll = (): void => this.updateVisibility();
  private readonly onResize = (): void => this.updateVisibility();

  constructor() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    this.updateVisibility();
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateVisibility(): void {
    this.visible.set(window.scrollY > window.innerHeight);
  }
}

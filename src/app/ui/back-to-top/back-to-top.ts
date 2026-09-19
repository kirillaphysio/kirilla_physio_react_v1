import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { Icon } from '../../shared/icon/icon';

/**
 * Fixed back-to-top glass circle, bottom-right, appearing after 260px of scroll. Keeps the
 * source's 2s alternating chevron hop (the one bit of playful motion the system allows).
 */
@Component({
  selector: 'kp-back-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <button
      type="button"
      class="kp-btt"
      [class.is-visible]="visible()"
      aria-label="Vissza a lap tetejére"
      (click)="scrollTop()"
    >
      <kp-icon name="chevron-up" class="kp-btt__glyph" />
    </button>
  `,
  styleUrl: './back-to-top.scss',
})
export class BackToTop {
  private readonly doc = inject(DOCUMENT);
  protected readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      const win = this.doc.defaultView;
      if (!win) return;
      // Hide the button while the footer is in view so it never overlaps the footer's links/CTA
      // (it's fixed bottom-right and would otherwise sit on top of them on mobile).
      let footerInView = false;
      const footer = this.doc.querySelector('footer, [role="contentinfo"]');
      if (footer && 'IntersectionObserver' in win) {
        new IntersectionObserver((entries) => {
          footerInView = entries[0].isIntersecting;
          update();
        }).observe(footer);
      }
      const update = () => this.visible.set(win.scrollY > 260 && !footerInView);
      update();
      win.addEventListener('scroll', update, { passive: true });
    });
  }

  scrollTop(): void {
    this.doc.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

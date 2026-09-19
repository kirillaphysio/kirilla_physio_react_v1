import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Card } from '../card/card';
import { IconButton } from '../icon-button/icon-button';
import { Icon } from '../../shared/icon/icon';
import { Testimonial } from '../../data/testimonial';

const GAP = 24; // var(--gap-grid)

/**
 * Native testimonial slider (replaces Swiper): a flex track translated by transform, one page
 * per step, no autoplay. perView drops 3 → 2 under 900px → 1 under 600px. Keyboard arrows move
 * the pages; the active dot is a rose gradient bar.
 */
@Component({
  selector: 'kp-testimonial-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, IconButton, Icon],
  templateUrl: './testimonial-carousel.html',
  styleUrl: './testimonial-carousel.scss',
})
export class TestimonialCarousel {
  private readonly doc = inject(DOCUMENT);

  readonly items = input<Testimonial[]>([]);
  readonly perView = input(3);

  private readonly width = signal(1280);
  private readonly index = signal(0);

  readonly view = computed(() => {
    const w = this.width();
    const pv = this.perView();
    if (w < 600) return 1;
    if (w < 900) return Math.min(2, pv);
    return pv;
  });
  readonly pages = computed(() => Math.max(1, this.items().length - this.view() + 1));
  readonly clamped = computed(() => Math.min(this.index(), this.pages() - 1));

  readonly step = computed(() => 100 / this.view());
  readonly trackTransform = computed(() => {
    const c = this.clamped();
    const v = this.view();
    return `translateX(calc(${-c * this.step()}% - ${c * (GAP / v)}px))`;
  });
  readonly cardBasis = computed(() => {
    const v = this.view();
    return `calc(${this.step()}% - ${GAP - GAP / v}px)`;
  });

  readonly pageDots = computed(() => Array.from({ length: this.pages() }, (_, i) => i));

  constructor() {
    afterNextRender(() => {
      const win = this.doc.defaultView;
      if (!win) return;
      const update = () => this.width.set(win.innerWidth);
      update();
      win.addEventListener('resize', update, { passive: true });
    });
  }

  prev(): void {
    this.index.set(Math.max(0, this.clamped() - 1));
  }
  next(): void {
    this.index.set(Math.min(this.pages() - 1, this.clamped() + 1));
  }
  goTo(i: number): void {
    this.index.set(i);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prev();
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.next();
      event.preventDefault();
    }
  }
}

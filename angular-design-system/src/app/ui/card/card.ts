import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type CardSurface =
  | 'plain'
  | 'mesh'
  | 'tintRose'
  | 'tintLilac'
  | 'tintCream'
  | 'filled'
  | 'band'
  | 'invert';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'md' | 'lg' | 'xl' | 'band';

/**
 * The system's container — 28px radius, plum-tinted shadow, hairline drawn as an inset shadow
 * (never a real border). `interactive` adds the hover lift; `href` makes the whole card a link.
 */
@Component({
  selector: 'kp-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly surface = input<CardSurface>('plain');
  readonly padding = input<CardPadding>('md');
  readonly radius = input<CardRadius>('lg');
  readonly interactive = input(false);
  readonly href = input<string>();

  readonly clicked = output<MouseEvent>();

  readonly cardClass = computed(
    () =>
      `kp-card surface-${this.surface()} pad-${this.padding()} rad-${this.radius()}` +
      (this.interactive() ? ' is-interactive' : ''),
  );
  readonly isInternal = computed(() => {
    const h = this.href();
    return !!h && h.startsWith('/');
  });
}

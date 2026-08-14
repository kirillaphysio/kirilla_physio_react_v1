import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Eyebrow } from '../eyebrow/eyebrow';
import { GradientText } from '../gradient-text/gradient-text';

/** Eyebrow + display heading + lead paragraph, as one block with the system's stack rhythm. */
@Component({
  selector: 'kp-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Eyebrow, GradientText, NgTemplateOutlet],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
  host: {
    '[class.align-center]': "align() === 'center'",
    '[class.on-accent]': 'onAccent()',
  },
})
export class SectionHeading {
  readonly eyebrow = input<string>();
  readonly title = input.required<string>();
  readonly lead = input<string>();
  readonly level = input<1 | 2 | 3 | 4>(2);
  readonly as = input<'h1' | 'h2' | 'h3'>();
  readonly align = input<'left' | 'center'>('left');
  readonly tone = input<'default' | 'onAccent'>('default');
  readonly gradientTitle = input(false);
  readonly maxWidth = input('680px');

  readonly onAccent = computed(() => this.tone() === 'onAccent');
  readonly tag = computed(() => this.as() ?? 'h2');
  readonly headingClass = computed(() => `lvl-${this.level()}`);
  readonly useGradient = computed(() => this.gradientTitle() && !this.onAccent());
}

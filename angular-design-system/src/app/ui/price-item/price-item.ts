import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from '../card/card';
import { Chip } from '../chip/chip';
import { GradientText } from '../gradient-text/gradient-text';

/** One row of the "Árak" list: name, duration chip, gradient price numeral, what's included. */
@Component({
  selector: 'kp-price-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Chip, GradientText],
  templateUrl: './price-item.html',
  styleUrl: './price-item.scss',
})
export class PriceItem {
  readonly title = input.required<string>();
  readonly price = input.required<string>();
  readonly duration = input<string>();
  readonly includes = input<string>();
  readonly featured = input(false);
}

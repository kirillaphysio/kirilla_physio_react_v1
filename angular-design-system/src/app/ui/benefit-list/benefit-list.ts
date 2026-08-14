import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../../shared/icon/icon';

/** The "Miért válassz engem?" list — a check glyph in a soft circle beside each line. */
@Component({
  selector: 'kp-benefit-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <ul class="kp-benefits" [class]="'tone-' + tone() + ' align-' + align()">
      @for (item of items(); track $index) {
        <li class="kp-benefits__item">
          <span class="kp-benefits__mark"><kp-icon [name]="icon()" /></span>
          <span>{{ item }}</span>
        </li>
      }
    </ul>
  `,
  styleUrl: './benefit-list.scss',
})
export class BenefitList {
  readonly items = input<string[]>([]);
  readonly icon = input('check');
  readonly tone = input<'rose' | 'lilac' | 'onAccent'>('rose');
  readonly align = input<'left' | 'center'>('left');
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icon-data';

/** A list item: a plain string (uses the list's default icon) or a string with its own glyph. */
export type BenefitItem = string | { text: string; icon: IconName };

/** The "Miért válassz engem?" list — a glyph in a soft circle beside each line. */
@Component({
  selector: 'kp-benefit-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <ul class="kp-benefits" [class]="'tone-' + tone() + ' align-' + align()">
      @for (item of items(); track $index) {
        <li class="kp-benefits__item">
          <span class="kp-benefits__mark"><kp-icon [name]="iconOf(item)" /></span>
          <span>{{ textOf(item) }}</span>
        </li>
      }
    </ul>
  `,
  styleUrl: './benefit-list.scss',
})
export class BenefitList {
  readonly items = input<BenefitItem[]>([]);
  readonly icon = input<IconName>('check');
  readonly tone = input<'rose' | 'lilac' | 'onAccent'>('rose');
  readonly align = input<'left' | 'center'>('left');

  textOf(item: BenefitItem): string {
    return typeof item === 'string' ? item : item.text;
  }
  iconOf(item: BenefitItem): IconName {
    return typeof item === 'string' ? this.icon() : item.icon;
  }
}

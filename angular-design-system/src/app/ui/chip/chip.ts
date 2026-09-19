import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../../shared/icon/icon';

export type ChipTone =
  | 'rose'
  | 'lilac'
  | 'plum'
  | 'success'
  | 'error'
  | 'gradient'
  | 'onAccent';

/** A small tinted pill for metadata — duration, category, status. Not interactive. */
@Component({
  selector: 'kp-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <span class="kp-chip" [class]="'tone-' + tone() + ' size-' + size()">
      @if (icon()) {
        <kp-icon [name]="icon()!" />
      }
      <ng-content />
    </span>
  `,
  styleUrl: './chip.scss',
})
export class Chip {
  readonly tone = input<ChipTone>('rose');
  readonly icon = input<string>();
  readonly size = input<'md' | 'sm'>('md');
}

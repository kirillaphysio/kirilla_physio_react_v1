import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Icon } from '../../shared/icon/icon';

export interface JumpMenuItem {
  id: string;
  label: string;
}

/** In-page section jump row — wrapping pills; the active pill fills with the brand gradient. */
@Component({
  selector: 'kp-jump-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <nav class="jump" [class.align-left]="align() === 'left'" aria-label="Ugrás szakaszra">
      @for (item of items(); track item.id) {
        <button
          type="button"
          class="jump__pill"
          [class.is-active]="item.id === activeId()"
          [attr.aria-current]="item.id === activeId() ? 'true' : null"
          (click)="select.emit(item.id)"
        >
          <kp-icon name="arrow-up-right-from-square" class="jump__icon" />
          {{ item.label }}
        </button>
      }
    </nav>
  `,
  styleUrl: './jump-menu.scss',
})
export class JumpMenu {
  readonly items = input<JumpMenuItem[]>([]);
  readonly activeId = input<string>();
  readonly align = input<'center' | 'left'>('center');
  readonly select = output<string>();
}

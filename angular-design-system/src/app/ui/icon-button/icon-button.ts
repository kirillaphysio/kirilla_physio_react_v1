import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon/icon';

export type IconButtonVariant = 'solid' | 'soft' | 'lilac' | 'glass' | 'plain';
export type IconButtonSize = 'lg' | 'md' | 'sm';

/** A circular icon-only control — always carries a Hungarian ariaLabel. */
@Component({
  selector: 'kp-icon-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButton {
  readonly icon = input.required<string>();
  readonly ariaLabel = input.required<string>();
  readonly variant = input<IconButtonVariant>('soft');
  readonly size = input<IconButtonSize>('md');
  readonly href = input<string>();
  readonly disabled = input(false);

  readonly clicked = output<MouseEvent>();

  readonly cls = computed(
    () =>
      `kp-iconbtn v-${this.variant()} s-${this.size()}` +
      (this.size() === 'sm' ? ' kp-iconbtn--sm' : ''),
  );
  readonly isInternal = computed(() => {
    const h = this.href();
    return !!h && h.startsWith('/');
  });
  readonly isExternalUrl = computed(() => {
    const h = this.href();
    return !!h && /^https?:\/\//.test(h);
  });

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}

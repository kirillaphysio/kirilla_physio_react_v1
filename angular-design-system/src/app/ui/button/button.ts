import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon/icon';
import { computed } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'lilac'
  | 'outline'
  | 'ghost'
  | 'onAccent'
  | 'onAccentOutline';
export type ButtonSize = 'lg' | 'md' | 'sm';

/**
 * The brand's only button — always a pill; primary is the rose→lilac gradient (one per viewport).
 * Renders an <a> when `href` is set, otherwise a <button>.
 */
@Component({
  selector: 'kp-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, NgTemplateOutlet, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: { '[class.kp-button--full]': 'fullWidth()' },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  /** Glyph name (or legacy FA class string) rendered inline. */
  readonly icon = input<string>();
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly href = input<string>();
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel = input<string>();

  readonly clicked = output<MouseEvent>();

  /** Internal clean-path link (leading "/") → routed with RouterLink; anything else is a plain anchor. */
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

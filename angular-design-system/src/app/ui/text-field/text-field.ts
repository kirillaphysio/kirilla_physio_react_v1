import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Icon } from '../../shared/icon/icon';

/**
 * Single-line form field. 14px radius (inputs are the one thing that isn't a pill), hairline
 * inset shadow at rest, lilac ring on focus, rose-red ring when invalid.
 */
@Component({
  selector: 'kp-text-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField {
  readonly label = input<string>();
  readonly value = model<string>('');
  readonly placeholder = input<string>();
  readonly type = input<'text' | 'email' | 'tel' | 'password' | 'date'>('text');
  readonly name = input<string>();
  readonly icon = input<string>();
  readonly helper = input<string>();
  readonly error = input<string>();
  readonly disabled = input(false);
  readonly required = input(false);

  readonly invalid = computed(() => !!this.error());

  onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}

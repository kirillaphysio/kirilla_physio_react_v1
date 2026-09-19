import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';

/** Multi-line field. Same shell as TextField; vertical resize only. */
@Component({
  selector: 'kp-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  readonly label = input<string>();
  readonly value = model<string>('');
  readonly placeholder = input<string>();
  readonly name = input<string>();
  readonly rows = input(4);
  readonly helper = input<string>();
  readonly error = input<string>();
  readonly disabled = input(false);
  readonly required = input(false);

  readonly invalid = computed(() => !!this.error());

  onInput(event: Event): void {
    this.value.set((event.target as HTMLTextAreaElement).value);
  }
}

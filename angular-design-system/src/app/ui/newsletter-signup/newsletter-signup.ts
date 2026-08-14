import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '../../shared/icon/icon';

/**
 * Newsletter signup block: title, inline e-mail pill with submit, and a caption note.
 * After submit the field is replaced by the success message — nothing is sent here.
 * tone="onAccent" for the plum footer and gradient bands.
 */
@Component({
  selector: 'kp-newsletter-signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Icon],
  templateUrl: './newsletter-signup.html',
  styleUrl: './newsletter-signup.scss',
  host: { '[class.on-accent]': 'onAccent()' },
})
export class NewsletterSignup {
  readonly title = input('Iratkozz fel a hírlevelemre');
  readonly note = input(
    'Havonta egy levél gyakorlatokkal és tippekkel. Bármikor leiratkozhatsz.',
  );
  readonly placeholder = input('E-mail címed');
  readonly cta = input('Feliratkozom');
  readonly successMessage = input(
    'Köszönöm! Hamarosan jelentkezem az első levéllel.',
  );
  readonly tone = input<'default' | 'onAccent'>('default');

  readonly submitted = output<string>();

  readonly onAccent = computed(() => this.tone() === 'onAccent');
  protected readonly email = signal('');
  protected readonly sent = signal(false);

  onInput(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  submit(event: Event): void {
    event.preventDefault();
    const value = this.email().trim();
    if (!value) return;
    this.submitted.emit(value);
    this.sent.set(true);
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../../../ui';

const AVAILABILITY =
  'A naptáram gyakran hetekre előre betelt, ezért készítettem online programokat: azokat bármikor elkezdheted, és otthonról végezheted.';

/** Calendar icon + muted body-sm note under the hero CTAs. */
@Component({
  selector: 'app-availability-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <p class="note" [class.on-accent]="tone() === 'onAccent'">
      <kp-icon name="calendar" class="note__icon" />
      <span>{{ text }}</span>
    </p>
  `,
  styles: [
    `
      .note {
        display: flex;
        gap: var(--gap-inline);
        align-items: flex-start;
        font-size: var(--body-sm-size);
        line-height: var(--body-sm-line);
        color: var(--text-muted);
        max-width: 540px;
      }
      .note.on-accent {
        color: var(--text-on-accent-muted);
      }
      .note__icon {
        margin-top: 3px;
        color: var(--rose-500);
      }
      .note.on-accent .note__icon {
        color: inherit;
      }
    `,
  ],
})
export class AvailabilityNote {
  readonly tone = input<'default' | 'onAccent'>('default');
  readonly text = AVAILABILITY;
}

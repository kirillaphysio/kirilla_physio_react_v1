import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Icon } from '../../shared/icon/icon';
import {
  WEEKLY_MESSAGES,
  WEEKLY_TOPICS,
  WeeklyEntry,
  WeeklyTopic,
  isoWeek,
} from '../../data/weekly';

/**
 * A short positive message that changes every week, sitting as one column in the footer.
 * The ISO week number picks the entry, so it advances on its own. ngSkipHydration keeps the
 * build-time week (SSR) from clashing with the visitor's current week (CSR).
 */
@Component({
  selector: 'kp-weekly-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './weekly-message.html',
  styleUrl: './weekly-message.scss',
  host: { ngSkipHydration: 'true' },
})
export class WeeklyMessage {
  readonly label = input('A hét üzenete');
  /** Force a week (1–52) instead of today's — for previews. */
  readonly week = input<number>();

  private readonly list = WEEKLY_MESSAGES;
  readonly resolvedWeek = computed(() => this.week() || isoWeek());
  readonly entry = computed<WeeklyEntry>(() => {
    const w = this.resolvedWeek();
    return this.list[(w - 1 + this.list.length * 100) % this.list.length];
  });
  readonly topic = computed<WeeklyTopic>(
    () => WEEKLY_TOPICS[this.entry().topic] ?? { label: '', icon: 'heart' },
  );
}

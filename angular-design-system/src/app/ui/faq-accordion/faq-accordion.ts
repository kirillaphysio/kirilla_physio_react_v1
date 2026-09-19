import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Icon } from '../../shared/icon/icon';

export interface FaqEntry {
  question: string;
  answer: string;
}

/** The "Gyakori kérdések" accordion. Chevron rotates −180° when open; open row tints lilac. */
@Component({
  selector: 'kp-faq-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './faq-accordion.html',
  styleUrl: './faq-accordion.scss',
})
export class FaqAccordion {
  readonly items = input<FaqEntry[]>([]);
  readonly allowMultiple = input(false);

  private readonly open = signal<Set<number>>(new Set());

  isOpen(i: number): boolean {
    return this.open().has(i);
  }
  toggle(i: number): void {
    const next = new Set(this.allowMultiple() ? this.open() : []);
    if (this.open().has(i)) next.delete(i);
    else next.add(i);
    this.open.set(next);
  }
}

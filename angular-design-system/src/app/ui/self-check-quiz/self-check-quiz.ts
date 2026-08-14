import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { Card } from '../card/card';
import { Button } from '../button/button';
import { Eyebrow } from '../eyebrow/eyebrow';

export interface QuizOption {
  label: string;
  value: string;
}
export interface QuizQuestion {
  id: string;
  question: string;
  help?: string;
  options: QuizOption[];
}
export interface QuizResultLink {
  label: string;
  href: string;
}
export interface QuizResult {
  eyebrow?: string;
  title: string;
  lead?: string;
  links?: QuizResultLink[];
  primary?: { label: string; href?: string };
  note?: string;
}

/**
 * Short self-check: single-choice questions ending in one recommendation. Holds its own state;
 * the consumer supplies the questions and a `resolve` mapping answers to a result. The result
 * never diagnoses — the caveat lives in `note`.
 */
@Component({
  selector: 'kp-self-check-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Button, Eyebrow],
  templateUrl: './self-check-quiz.html',
  styleUrl: './self-check-quiz.scss',
})
export class SelfCheckQuiz {
  readonly questions = input<QuizQuestion[]>([]);
  readonly resolve = input.required<(answers: Record<string, string>) => QuizResult>();
  readonly eyebrow = input<string>();
  readonly restartLabel = input('Újrakezdem');
  readonly surface = input<'plain' | 'mesh' | 'tintRose' | 'tintLilac' | 'tintCream'>('plain');

  private readonly index = signal(0);
  private readonly answers = signal<Record<string, string>>({});
  private readonly done = signal(false);

  readonly currentIndex = this.index;
  readonly current = computed(() => this.questions()[this.index()]);
  readonly total = computed(() => this.questions().length);
  readonly progress = computed(() => Array.from({ length: this.total() }, (_, i) => i));
  readonly result = computed<QuizResult | null>(() =>
    this.done() ? this.resolve()(this.answers()) : null,
  );

  isSelected(value: string): boolean {
    const q = this.current();
    return !!q && this.answers()[q.id] === value;
  }

  pick(value: string): void {
    const q = this.current();
    if (!q) return;
    this.answers.set({ ...this.answers(), [q.id]: value });
    if (this.index() + 1 < this.total()) this.index.set(this.index() + 1);
    else this.done.set(true);
  }

  back(): void {
    this.index.set(Math.max(0, this.index() - 1));
  }
  restart(): void {
    this.answers.set({});
    this.index.set(0);
    this.done.set(false);
  }
}

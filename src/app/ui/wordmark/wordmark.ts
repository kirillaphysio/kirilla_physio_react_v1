import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type WordmarkVariant = 'full' | 'mark' | 'lockup' | 'lockupTagline';

const MARK = 'brand-mark.png';
const LOCKUP = 'brand-lockup.png';
const LOCKUP_TAGLINE = 'brand-lockup-tagline.png';

/**
 * The brand lockup. `full` pairs the mark with "Kirilla Physio" set in type plus the
 * "gyógytornász‑fizioterapeuta" line; `mark` / `lockup` / `lockupTagline` render supplied artwork.
 */
@Component({
  selector: 'kp-wordmark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './wordmark.html',
  styleUrl: './wordmark.scss',
})
export class Wordmark {
  readonly variant = input<WordmarkVariant>('full');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly tone = input<'default' | 'onAccent'>('default');
  readonly href = input<string>('/');
  readonly mark = input(true);
  readonly assetBase = input('assets/');
  readonly subtitle = input(true);

  readonly scale = computed(() =>
    this.size() === 'lg' ? 1.35 : this.size() === 'sm' ? 0.8 : 1,
  );
  readonly onAccent = computed(() => this.tone() === 'onAccent');
  readonly nameColor = computed(() =>
    this.onAccent() ? 'var(--text-on-accent)' : 'var(--plum-700)',
  );
  readonly subColor = computed(() =>
    this.onAccent() ? 'var(--text-on-accent-muted)' : 'var(--text-muted)',
  );

  readonly markSrc = computed(() => this.assetBase() + MARK);
  readonly lockupSrc = computed(
    () => this.assetBase() + (this.variant() === 'lockup' ? LOCKUP : LOCKUP_TAGLINE),
  );
  readonly lockupHeight = computed(
    () => (this.variant() === 'lockup' ? 78 : 96) * this.scale(),
  );
  readonly lockupAlt = computed(() =>
    this.variant() === 'lockup'
      ? 'Kirilla Physio'
      : 'Kirilla Physio — Legfőbb kincsünk az egészségünk.',
  );

  readonly isInternal = computed(() => this.href().startsWith('/'));
}

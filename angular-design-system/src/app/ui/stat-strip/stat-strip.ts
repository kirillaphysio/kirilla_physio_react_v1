import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Card, CardSurface } from '../card/card';
import { GradientText } from '../gradient-text/gradient-text';
import { Icon } from '../../shared/icon/icon';

export interface StatStripItem {
  value: string;
  label: string;
  icon?: string;
}

/** Compact social-proof row: 2-4 gradient numerals with labels, divided by hairlines. */
@Component({
  selector: 'kp-stat-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, GradientText, Icon],
  templateUrl: './stat-strip.html',
  styleUrl: './stat-strip.scss',
})
export class StatStrip {
  readonly items = input<StatStripItem[]>([]);
  readonly surface = input<CardSurface>('plain');
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly onAccent = computed(() =>
    ['filled', 'band', 'invert'].includes(this.surface()),
  );
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Card } from '../card/card';
import { Icon } from '../../shared/icon/icon';

export interface StepFlowStep {
  title: string;
  description: string;
  meta?: string;
  icon?: string;
}

/** Numbered process walkthrough. Step one is gradient-filled; row variant joins discs with a rule. */
@Component({
  selector: 'kp-step-flow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Icon],
  templateUrl: './step-flow.html',
  styleUrl: './step-flow.scss',
})
export class StepFlow {
  readonly steps = input<StepFlowStep[]>([]);
  readonly variant = input<'row' | 'stack'>('row');
  readonly surface = input<'plain' | 'mesh' | 'tintRose' | 'tintLilac' | 'tintCream'>('mesh');

  readonly stack = computed(() => this.variant() === 'stack');
  readonly cols = computed(() => (this.stack() ? '1fr' : `repeat(${this.steps().length}, 1fr)`));
}

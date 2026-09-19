import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type EyebrowTone = 'rose' | 'lilac' | 'plum' | 'onAccent';

/** The uppercase micro-label above a section heading — the only uppercase type in the system. */
@Component({
  selector: 'kp-eyebrow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="kp-eyebrow" [class]="'tone-' + tone() + ' align-' + align()"><ng-content /></div>`,
  styleUrl: './eyebrow.scss',
})
export class Eyebrow {
  readonly tone = input<EyebrowTone>('rose');
  readonly align = input<'left' | 'center' | 'right'>('left');
}

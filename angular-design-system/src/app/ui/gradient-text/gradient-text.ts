import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type GradientFill = 'brand' | 'soft' | 'deep';

/** Clips text in the rose→lilac gradient — the redesign's headline device. Use sparingly, ≥19px. */
@Component({
  selector: 'kp-gradient-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="kp-gradient-text" [class]="'fill-' + fill()"><ng-content /></span>`,
  styleUrl: './gradient-text.scss',
})
export class GradientText {
  readonly fill = input<GradientFill>('brand');
}

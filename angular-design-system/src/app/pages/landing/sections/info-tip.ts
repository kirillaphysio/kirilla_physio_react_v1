import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  signal,
} from '@angular/core';
import { Icon } from '../../../ui';

/**
 * Small round info button with a tooltip that opens on hover AND focus and closes on
 * blur/leave/Escape. The tooltip text is passed in.
 */
@Component({
  selector: 'app-info-tip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <span
      class="tip"
      (mouseenter)="open.set(true)"
      (mouseleave)="open.set(false)"
    >
      <button
        type="button"
        class="tip__btn"
        aria-label="Megjegyzés"
        [attr.aria-expanded]="open()"
        (click)="open.set(!open())"
        (focus)="open.set(true)"
        (blur)="open.set(false)"
      >
        <kp-icon name="info" />
      </button>
      @if (open()) {
        <span class="tip__bubble" role="tooltip">{{ text() }}</span>
      }
    </span>
  `,
  styleUrl: './info-tip.scss',
})
export class InfoTip {
  readonly text = input.required<string>();
  readonly open = signal(false);

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }
}

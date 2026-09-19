import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  effect,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Icon } from '../../shared/icon/icon';

/**
 * Small round info button with a tooltip that opens on hover AND focus and closes on
 * blur/leave/Escape. The tooltip text is passed in. Used standalone (e.g. next to a label) and
 * inside kp-section-heading via its `infoTip` input.
 *
 * The bubble is a top-layer popover positioned from the button's viewport rect. The top layer
 * ignores ancestor overflow/transform/will-change, so the bubble is never clipped by a kp-card
 * (overflow:hidden) nor mis-anchored by a [data-reveal] section (will-change: transform makes it a
 * fixed-positioning containing block). Browsers without the Popover API just render it inline.
 */
@Component({
  selector: 'kp-info-tip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <span class="tip" (mouseenter)="show()" (mouseleave)="hide()">
      <button
        #btn
        type="button"
        class="tip__btn"
        aria-label="Megjegyzés"
        [attr.aria-expanded]="open()"
        (click)="open() ? hide() : show()"
        (focus)="show()"
        (blur)="hide()"
      >
        <kp-icon name="info" />
      </button>
      @if (open()) {
        <span #bubble class="tip__bubble" popover="manual" role="tooltip">{{ text() }}</span>
      }
    </span>
  `,
  styleUrl: './info-tip.scss',
})
export class InfoTip {
  readonly text = input.required<string>();
  readonly open = signal(false);

  private readonly btn = viewChild<ElementRef<HTMLButtonElement>>('btn');
  private readonly bubble = viewChild<ElementRef<HTMLElement>>('bubble');

  constructor() {
    // When the bubble is added (open → true), place it under the button and lift it into the
    // top layer. Removing it (open → false) drops it from the top layer automatically.
    effect(() => {
      if (!this.open()) return;
      const bubble = this.bubble()?.nativeElement;
      const btn = this.btn()?.nativeElement;
      if (!bubble || !btn) return;

      const r = btn.getBoundingClientRect();
      bubble.style.top = `${r.bottom + 8}px`;
      bubble.style.left = `${r.left + r.width / 2}px`;

      const el = bubble as HTMLElement & { showPopover?: () => void };
      if (typeof el.showPopover === 'function' && !bubble.matches(':popover-open')) {
        try {
          el.showPopover();
        } catch {
          /* already open / not connected */
        }
      }
    });
  }

  show(): void {
    this.open.set(true);
  }
  hide(): void {
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.hide();
  }

  /* Close while open so the fixed bubble can't drift from the button. */
  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this.open()) this.hide();
  }
}

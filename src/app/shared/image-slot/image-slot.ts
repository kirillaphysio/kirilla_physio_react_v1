import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

/**
 * Neutral, on-brand cover placeholder for images that don't exist yet — chiefly the blog's
 * photography (`slotId` = `blog-<post-id>`, shared between a post's list card, row thumb and
 * article hero). Deliberately NOT stock imagery: it renders a soft mesh ground with a mark and
 * an optional label so the layout reads as intentional until Réka supplies real photos.
 *
 * Fills its container (`:host { display:block; height:100% }`) — the parent owns the aspect ratio.
 */
@Component({
  selector: 'kp-image-slot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { '[attr.data-slot]': 'slotId() || null', role: 'img', '[attr.aria-label]': 'ariaLabel()' },
  template: `
    <div class="kp-slot" aria-hidden="true">
      <span class="kp-slot__mark"><kp-icon name="spa" /></span>
      @if (label(); as l) {
        <span class="kp-slot__label">{{ l }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .kp-slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-3);
        width: 100%;
        height: 100%;
        padding: var(--space-5);
        text-align: center;
        background: var(--mesh-card);
        color: var(--text-muted);
      }
      .kp-slot__mark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: var(--radius-pill);
        background: var(--surface-card);
        box-shadow: var(--shadow-ring-hairline);
        color: var(--rose-700);
        font-size: 20px;
      }
      .kp-slot__label {
        font-size: var(--body-sm-size);
        line-height: var(--body-sm-line);
        letter-spacing: var(--eyebrow-track);
        text-transform: uppercase;
        color: var(--text-muted);
      }
    `,
  ],
})
export class ImageSlot {
  /** Persistence/identity key, e.g. `blog-reggeli-derekfajas`. Rendered as a `data-slot` attribute. */
  readonly slotId = input<string>();
  /** Small caption shown under the mark (e.g. the post category). Optional. */
  readonly label = input<string>();
  /** Accessible name for the placeholder region. */
  readonly ariaLabel = input('Kép hamarosan');
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ICONS, IconDef, IconName } from './icon-data';

/**
 * Native icon: renders one Font Awesome 6 glyph as inline SVG sized in `em`, coloured with
 * currentColor. No Font Awesome runtime. `name` accepts either a bare glyph key
 * (`arrow-right`) or a legacy FA class string (`fa-solid fa-arrow-right`); both resolve to
 * the same sprite entry so specs written either way keep working.
 */
@Component({
  selector: 'kp-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kp-icon', 'aria-hidden': 'true' },
  template: `
    @if (def(); as d) {
      <svg
        [attr.viewBox]="'0 0 ' + d.w + ' ' + d.h"
        [style.width]="'1em'"
        [style.height]="'1em'"
        focusable="false"
        role="img"
        preserveAspectRatio="xMidYMid meet"
      >
        <path [attr.d]="d.d" fill="currentColor" />
      </svg>
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        vertical-align: -0.125em;
      }
      svg {
        display: block;
        fill: currentColor;
      }
    `,
  ],
})
export class Icon {
  readonly name = input.required<string>();

  protected readonly def = computed<IconDef | undefined>(() => {
    const key = normalizeIconName(this.name());
    return ICONS[key as IconName];
  });
}

/** Strip a FA class string down to its glyph name; leave a bare name untouched. */
export function normalizeIconName(raw: string): string {
  if (!raw) return raw;
  const parts = raw.trim().split(/\s+/);
  for (const p of parts) {
    if (p.startsWith('fa-') && !['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-thin', 'fa-duotone'].includes(p)) {
      return p.slice(3);
    }
  }
  return raw;
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

export interface RailTab {
  id: string;
  label: string;
  short: string;
  hint: string;
}

/** Sticky blog section jump nav; the active item fills rose and its bar takes the brand gradient. */
@Component({
  selector: 'app-section-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="rail" aria-label="Blog szekciók">
      @for (t of tabs(); track t.id) {
        <button
          type="button"
          class="rail__item"
          [class.is-active]="t.id === activeId()"
          [attr.aria-current]="t.id === activeId() ? 'true' : null"
          (click)="select.emit(t.id)"
        >
          <span class="rail__bar" aria-hidden="true"></span>
          <span class="rail__text">
            <span class="rail__top">
              <span class="rail__label">{{ t.label }}</span>
              <span class="rail__count">{{ counts()[t.id] }}</span>
            </span>
            <span class="rail__hint">{{ t.hint }}</span>
          </span>
        </button>
      }
    </nav>
  `,
  styleUrl: './section-rail.scss',
})
export class SectionRail {
  readonly tabs = input<RailTab[]>([]);
  readonly activeId = input<string>();
  readonly counts = input<Record<string, number>>({});
  readonly select = output<string>();
}

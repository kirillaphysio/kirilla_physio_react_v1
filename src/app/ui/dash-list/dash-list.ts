import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../../shared/icon/icon';

/** A dash-list entry: a bold primary term with an optional lighter line of examples. */
export interface DashItem {
  label: string;
  detail?: string;
}

/**
 * Scannable list, optionally in multiple CSS columns. Each item is a rose check marker + a bold
 * primary term, with an optional muted second line for examples. Used for the treatments
 * "Miben tudok segíteni?" complaint list (2-col).
 */
@Component({
  selector: 'kp-dash-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <ul class="kp-dashlist" [style.--kp-dashlist-cols]="columns()">
      @for (item of items(); track $index) {
        <li class="kp-dashlist__item">
          <span class="kp-dashlist__mark"><kp-icon name="check" /></span>
          <span class="kp-dashlist__body">
            <span class="kp-dashlist__label">{{ item.label }}</span>
            @if (item.detail) {
              <span class="kp-dashlist__detail">{{ item.detail }}</span>
            }
          </span>
        </li>
      }
    </ul>
  `,
  styles: [
    `
      .kp-dashlist {
        margin: 0;
        padding: 0;
        list-style: none;
        column-count: var(--kp-dashlist-cols, 1);
        column-gap: var(--space-10);
      }
      /* Multi-column lists are cramped on a phone — collapse to one column. */
      @media (max-width: 600px) {
        .kp-dashlist {
          column-count: 1;
        }
      }
      .kp-dashlist__item {
        display: flex;
        gap: var(--gap-inline);
        align-items: flex-start;
        break-inside: avoid;
        margin-bottom: var(--space-4);
      }
      .kp-dashlist__mark {
        flex: 0 0 auto;
        width: 24px;
        height: 24px;
        margin-top: 1px;
        border-radius: var(--radius-circle);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        background: var(--rose-100);
        color: var(--rose-500);
      }
      .kp-dashlist__body {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .kp-dashlist__label {
        font-size: var(--body-md-size);
        line-height: var(--body-md-line);
        font-weight: var(--weight-semibold);
        color: var(--text-strong);
      }
      .kp-dashlist__detail {
        font-size: var(--body-sm-size);
        line-height: var(--body-sm-line);
        color: var(--text-muted);
      }
    `,
  ],
})
export class DashList {
  readonly items = input<DashItem[]>([]);
  readonly columns = input(1);
}

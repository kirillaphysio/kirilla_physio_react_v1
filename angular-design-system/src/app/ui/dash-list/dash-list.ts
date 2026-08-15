import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Em-dash bulleted list, optionally laid out in multiple CSS columns. Used for the treatments
 * "Miben tudok segíteni?" panasz list (2-col). Items are plain strings.
 */
@Component({
  selector: 'kp-dash-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="kp-dashlist" [style.--kp-dashlist-cols]="columns()">
      @for (item of items(); track $index) {
        <li class="kp-dashlist__item">{{ item }}</li>
      }
    </ul>
  `,
  styles: [
    `
      .kp-dashlist {
        margin: 0;
        padding-inline-start: 18px;
        column-count: var(--kp-dashlist-cols, 1);
        column-gap: var(--space-10);
        list-style-type: '\\2014';
      }
      /* Multi-column dash lists are cramped on a phone — collapse to one column. */
      @media (max-width: 600px) {
        .kp-dashlist {
          column-count: 1;
        }
      }
      .kp-dashlist__item {
        padding-left: 10px;
        margin-bottom: 10px;
        break-inside: avoid;
        font-size: var(--body-md-size);
        line-height: var(--body-md-line);
        color: var(--text-body);
      }
    `,
  ],
})
export class DashList {
  readonly items = input<string[]>([]);
  readonly columns = input(1);
}

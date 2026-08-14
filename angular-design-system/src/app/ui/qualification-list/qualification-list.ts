import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Qualification {
  date: string;
  description: string;
  highlight?: boolean;
}

/** The "Végzettségeim" list: date column + course name, multi-column on desktop, one on mobile. */
@Component({
  selector: 'kp-qualification-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="quals" [style.column-count]="columns()">
      @for (item of items(); track $index) {
        <li class="quals__row" [class.is-highlight]="item.highlight">
          <span class="quals__date">{{ item.date }}</span>
          <span class="quals__desc">{{ item.description }}</span>
        </li>
      }
    </ul>
  `,
  styleUrl: './qualification-list.scss',
})
export class QualificationList {
  readonly items = input<Qualification[]>([]);
  readonly columns = input<1 | 2 | 3>(2);
}

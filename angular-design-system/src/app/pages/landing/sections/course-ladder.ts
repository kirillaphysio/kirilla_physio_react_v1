import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button, Card, Eyebrow } from '../../../ui';
import { ScrollService } from '../../../core/scroll.service';
import { SALONIC_URL } from '../../../ui/header/header';

/** "Három út, ahogy segíteni tudok" — the 3-column course ladder. Middle card is featured. */
@Component({
  selector: 'app-course-ladder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Eyebrow],
  templateUrl: './course-ladder.html',
  styleUrl: './course-ladder.scss',
})
export class CourseLadder {
  private readonly scroll = inject(ScrollService);
  readonly salonic = SALONIC_URL;

  jumpToHirlevel(): void {
    this.scroll.scrollToAnchor('hirlevel');
  }
}

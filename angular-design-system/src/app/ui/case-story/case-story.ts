import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from '../card/card';
import { Chip } from '../chip/chip';
import { Eyebrow } from '../eyebrow/eyebrow';
import { Icon } from '../../shared/icon/icon';
import { CaseStoryBlock } from '../../data/case';

/** A structured patient story: complaint → what I found → what we did → outcome. */
@Component({
  selector: 'kp-case-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Chip, Eyebrow, Icon],
  templateUrl: './case-story.html',
  styleUrl: './case-story.scss',
})
export class CaseStory {
  readonly meta = input<string>();
  readonly title = input.required<string>();
  readonly blocks = input<CaseStoryBlock[]>([]);
  readonly outcome = input<string>();
  readonly therapies = input<string[]>([]);
  readonly surface = input<
    'plain' | 'mesh' | 'tintRose' | 'tintLilac' | 'tintCream'
  >('plain');
}

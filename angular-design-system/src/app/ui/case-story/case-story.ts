import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Button } from '../button/button';
import { Card } from '../card/card';
import { Chip } from '../chip/chip';
import { Eyebrow } from '../eyebrow/eyebrow';
import { Icon } from '../../shared/icon/icon';
import { CaseCourse, CaseStoryBlock } from '../../data/case';

/** A structured patient story: complaint → what I found → what we did → outcome, with an
 *  optional program CTA when the case grew into an online course. */
@Component({
  selector: 'kp-case-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Chip, Eyebrow, Icon],
  templateUrl: './case-story.html',
  styleUrl: './case-story.scss',
})
export class CaseStory {
  readonly meta = input<string>();
  readonly title = input.required<string>();
  readonly blocks = input<CaseStoryBlock[]>([]);
  readonly outcome = input<string>();
  readonly therapies = input<string[]>([]);
  readonly course = input<CaseCourse>();
  readonly surface = input<
    'plain' | 'mesh' | 'tintRose' | 'tintLilac' | 'tintCream'
  >('plain');
}

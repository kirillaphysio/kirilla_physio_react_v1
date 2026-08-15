import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Button } from '../button/button';
import { Card } from '../card/card';
import { Chip } from '../chip/chip';
import { Icon } from '../../shared/icon/icon';
import { ImageSlot } from '../../shared/image-slot/image-slot';
import { COURSE_PLATFORM, Course } from '../../data/course';

/**
 * One online-course cell: neutral cover slot (covers don't exist yet), weeks/lessons meta
 * (em-dash until Réka supplies numbers), title, optional description, and a footer that is a
 * "Hamarosan" chip for `soon` courses or a "Megnyitom" button for `live` ones.
 */
@Component({
  selector: 'kp-course-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Chip, Icon, ImageSlot],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {
  readonly course = input.required<Course>();
  readonly platform = input(COURSE_PLATFORM);

  readonly soon = computed(() => this.course().status === 'soon');
  readonly weeksLabel = computed(() => {
    const w = this.course().weeks;
    return w ? `${w} hét` : '— hét';
  });
  readonly lessonsLabel = computed(() => {
    const l = this.course().lessons;
    return l ? `${l} lecke` : '— lecke';
  });
}

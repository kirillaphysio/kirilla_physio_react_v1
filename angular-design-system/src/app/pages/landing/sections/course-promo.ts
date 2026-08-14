import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button, Card, Icon } from '../../../ui';
import { ContentService } from '../../../core/content.service';

/**
 * "Amit már most el tudsz kezdeni" — the first two live courses. The cover images do not exist
 * yet (README §4), so each card renders a neutral placeholder slot, never stock imagery.
 */
@Component({
  selector: 'app-course-promo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Icon],
  templateUrl: './course-promo.html',
  styleUrl: './course-promo.scss',
})
export class CoursePromo {
  private readonly content = inject(ContentService);
  readonly courses = this.content.liveCourses(2);
  readonly platform = this.content.coursePlatform;
}

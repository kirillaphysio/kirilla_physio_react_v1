import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Button, Card, CaseStory, SectionHeading } from '../../ui';
import { ContentService } from '../../core/content.service';

/**
 * "Páciens történetek" panel: a master list of anonymised cases on the left, the selected
 * `kp-case-story` on the right with prev/next navigation. Local selection state only.
 */
@Component({
  selector: 'app-stories-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, CaseStory, SectionHeading],
  templateUrl: './stories-panel.html',
  styleUrl: './stories-panel.scss',
})
export class StoriesPanel {
  private readonly content = inject(ContentService);

  readonly stories = this.content.blogStories();
  readonly openId = signal(this.stories[0].id);

  readonly index = computed(() =>
    Math.max(0, this.stories.findIndex((s) => s.id === this.openId())),
  );
  readonly story = computed(() => this.stories[this.index()]);

  select(id: string): void {
    this.openId.set(id);
  }

  step(delta: number): void {
    const n = this.stories.length;
    const i = (this.index() + delta + n) % n;
    this.openId.set(this.stories[i].id);
  }
}

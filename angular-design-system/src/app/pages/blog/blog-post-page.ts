import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Button, Card, Eyebrow, SectionHeading } from '../../ui';
import { ImageSlot } from '../../shared/image-slot/image-slot';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { SALONIC_URL } from '../../ui/header/header';

const SITE_ORIGIN = 'https://www.kirillareka.hu';

/**
 * /blog/:id — one blog article. Hero (back link + meta + title + lead), a cover placeholder, the
 * body via [innerHTML] on `.kp-post-body`, a booking card, and a "További írások" 3-up. Prerendered
 * one page per post id; an unknown id falls back to a friendly message. Per-post SEO via effect.
 */
@Component({
  selector: 'app-blog-post-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Eyebrow, SectionHeading, ImageSlot],
  templateUrl: './blog-post-page.html',
  styleUrl: './blog-post-page.scss',
})
export class BlogPostPage {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly salonic = SALONIC_URL;

  readonly postId = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('id') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('id') ?? '' },
  );

  readonly post = computed(() => this.content.blogPost(this.postId()));
  readonly others = computed(() =>
    this.content.blogPosts().filter((p) => p.id !== this.postId()).slice(0, 3),
  );

  constructor() {
    effect(() => {
      const p = this.post();
      if (p) {
        this.seo.apply({
          title: `${p.title} – Kirilla Réka blog`,
          description: p.lead,
          ogUrl: `${SITE_ORIGIN}/blog/${this.postId()}`,
          ogType: 'article',
        });
      } else {
        this.seo.apply({
          title: 'A bejegyzés nem található – Kirilla Réka blog',
          description: 'A keresett blogbejegyzés nem található.',
          ogUrl: `${SITE_ORIGIN}/blog`,
        });
      }
    });
  }
}

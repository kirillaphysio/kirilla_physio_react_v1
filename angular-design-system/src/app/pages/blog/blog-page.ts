import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card, Eyebrow, Icon, SectionHeading } from '../../ui';
import { ImageSlot } from '../../shared/image-slot/image-slot';
import { PlaylistCard } from './playlist-card';
import { StoriesPanel } from './stories-panel';
import { SectionRail, RailTab } from './section-rail';
import { ContentService } from '../../core/content.service';
import { ScrollService } from '../../core/scroll.service';
import { SeoService } from '../../core/seo.service';

const TABS: RailTab[] = [
  { id: 'irasok', label: 'Blog bejegyzések', short: 'Írások', hint: 'Rövid magyarázatok egy-egy témáról' },
  { id: 'videok', label: 'YouTube lejátszási listák', short: 'Videók', hint: 'Gyakorlatok témák szerint' },
  { id: 'tortenetek', label: 'Páciens történetek', short: 'Történetek', hint: 'Panasztól a kezelési tervig' },
];

const SEO_DESCRIPTION =
  'Írások, YouTube gyakorlat-lejátszási listák és anonimizált páciens történetek Kirilla Réka gyógytornász-fizioterapeutától — ugorj arra a részre, amelyik érdekel.';

/**
 * /blog — one page, three stacked sections (írások / videók / történetek) with a sticky
 * `app-section-rail` that scroll-spies the in-view section. Supports `/blog#videok` and
 * `/blog#tortenetek` deep links (offset scroll via ScrollService). Scroll handling is browser-only.
 */
@Component({
  selector: 'app-blog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Card,
    Eyebrow,
    Icon,
    SectionHeading,
    ImageSlot,
    PlaylistCard,
    StoriesPanel,
    SectionRail,
  ],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss',
})
export class BlogPage {
  private readonly doc = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly scroll = inject(ScrollService);
  private readonly seo = inject(SeoService);

  private readonly posts = this.content.blogPosts();
  readonly featured = this.posts[0];
  readonly rest = this.posts.slice(1);
  readonly playlists = this.content.blogPlaylists();
  private readonly stories = this.content.blogStories();

  readonly tabs = TABS;
  readonly counts: Record<string, number> = {
    irasok: this.posts.length,
    videok: this.playlists.length,
    tortenetek: this.stories.length,
  };

  readonly active = signal(TABS[0].id);

  private observer?: IntersectionObserver;
  private readonly visible = new Set<string>();

  constructor() {
    this.seo.apply({
      title: 'Blog - Kirilla Réka gyógytornász-fizioterapeuta',
      description: SEO_DESCRIPTION,
      canonical: 'https://www.kirillareka.hu/blog',
      ogUrl: 'https://www.kirillareka.hu/blog',
    });

    inject(DestroyRef).onDestroy(() => this.observer?.disconnect());

    afterNextRender(() => {
      this.initScrollSpy();
      const frag = this.route.snapshot.fragment;
      if (frag) this.scrollToTab(frag);
    });

    // Same-page fragment changes (e.g. arriving at /blog#videok while already on /blog).
    this.route.fragment.pipe(takeUntilDestroyed()).subscribe((frag) => {
      if (frag) this.scrollToTab(frag);
    });
  }

  private isTab(id: string): boolean {
    return TABS.some((t) => t.id === id);
  }

  private scrollToTab(id: string): void {
    if (!this.isTab(id)) return;
    const win = this.doc.defaultView;
    // Defer a frame so the target section is laid out before we measure it.
    win?.requestAnimationFrame(() => this.scroll.scrollToAnchor(id));
  }

  /** Browser-only scroll-spy: a thin band ~40% down the viewport picks the topmost in-view panel. */
  private initScrollSpy(): void {
    const win = this.doc.defaultView;
    if (!win || !('IntersectionObserver' in win)) return;
    const ids = TABS.map((t) => t.id);
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting) this.visible.add(id);
          else this.visible.delete(id);
        }
        const first = ids.find((id) => this.visible.has(id));
        if (first) this.active.set(first);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    for (const id of ids) {
      const el = this.doc.getElementById(id);
      if (el) this.observer.observe(el);
    }
  }

  onSelect(id: string): void {
    this.active.set(id);
    this.scroll.scrollToAnchor(id);
  }
}

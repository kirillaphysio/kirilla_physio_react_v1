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
import {
  Button,
  Card,
  CloudinaryImage,
  Eyebrow,
  SectionHeading,
  TherapyCard,
} from '../../ui';
import { LeadMagnet } from '../landing/sections/lead-magnet';
import { AvailabilityNote } from '../landing/sections/availability-note';
import { ContentService } from '../../core/content.service';
import { ScrollService } from '../../core/scroll.service';
import { SeoService } from '../../core/seo.service';
import { SALONIC_URL } from '../../ui/header/header';

const SITE_ORIGIN = 'https://www.kirillareka.hu';

/**
 * /terapia/:id — one therapy detail page (Online fókusz). Hero (square photo + PDF/booking CTAs),
 * long clinical copy via [innerHTML] on `.kp-rich`, an "Otthon is dolgozhatsz" block (inline lead
 * magnet + programs card), and a "További kezelések" grid. Prerendered one page per therapy id;
 * an unknown id falls back to a friendly message + the full therapy list.
 */
@Component({
  selector: 'app-therapy-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Card,
    CloudinaryImage,
    Eyebrow,
    SectionHeading,
    TherapyCard,
    LeadMagnet,
    AvailabilityNote,
  ],
  templateUrl: './therapy-page.html',
  styleUrl: './therapy-page.scss',
})
export class TherapyPage {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly scroll = inject(ScrollService);
  private readonly seo = inject(SeoService);

  readonly salonic = SALONIC_URL;
  readonly platform = this.content.coursePlatform;
  /** Bound to CloudinaryImage — a stable reference so the srcset isn't recomputed each check. */
  readonly squareRatio: [number, number] = [1, 1];

  readonly therapyId = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('id') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('id') ?? '' },
  );

  readonly therapy = computed(() => this.content.therapy(this.therapyId()));
  readonly allTherapies = this.content.therapies();
  /** Up to 8 other therapies for the 4-up "További kezelések" grid. */
  readonly others = computed(() =>
    this.allTherapies.filter((t) => t.id !== this.therapyId()).slice(0, 8),
  );

  constructor() {
    effect(() => {
      const t = this.therapy();
      if (t) {
        this.seo.apply({
          title: `${t.title} – Kirilla Réka gyógytornász`,
          description: t.short,
          ogUrl: `${SITE_ORIGIN}/terapia/${this.therapyId()}`,
        });
      } else {
        this.seo.apply({
          title: 'A terápia nem található – Kirilla Réka',
          description:
            'A keresett terápia nem található. Válaszd ki a listából az általad keresett kezelést.',
          ogUrl: `${SITE_ORIGIN}/terapia`,
        });
      }
    });
  }

  jumpToHirlevel(): void {
    this.scroll.scrollToAnchor('hirlevel');
  }
}

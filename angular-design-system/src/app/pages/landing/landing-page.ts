import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BenefitList,
  Button,
  Card,
  CaseStory,
  CloudinaryImage,
  Eyebrow,
  GradientText,
  Icon,
  SectionHeading,
  TestimonialCarousel,
} from '../../ui';
import { AvailabilityNote } from './sections/availability-note';
import { CourseLadder } from './sections/course-ladder';
import { CoursePromo } from './sections/course-promo';
import { SymptomRouter } from './sections/symptom-router';
import { LeadMagnet } from './sections/lead-magnet';
import { ContentService } from '../../core/content.service';
import { ScrollService } from '../../core/scroll.service';
import { SeoService } from '../../core/seo.service';
import { SALONIC_URL } from '../../ui/header/header';

const SEO_DESCRIPTION =
  'Kirilla Réka gyógytornász-fizioterapeuta honlapjának kezdőoldala, ahol többek közt tájékozódhatsz Réka szakmai múltjáról, végzettségeiről és betekintést kaphatsz a honlap további tartalmába.';

@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BenefitList,
    Button,
    Card,
    CaseStory,
    CloudinaryImage,
    Eyebrow,
    GradientText,
    Icon,
    SectionHeading,
    TestimonialCarousel,
    AvailabilityNote,
    CourseLadder,
    CoursePromo,
    SymptomRouter,
    LeadMagnet,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  private readonly content = inject(ContentService);
  private readonly scroll = inject(ScrollService);
  private readonly seo = inject(SeoService);

  readonly salonic = SALONIC_URL;
  readonly benefits = [
    'Szakértői tapasztalat és folyamatosan frissített tudás',
    'Személyre szabott, hatékony kezelések holisztikus szemléletmóddal',
    'Empatikus és figyelmes megközelítés',
  ];
  readonly cases = this.content.cases();
  readonly opinions = this.content.landingOpinions();

  constructor() {
    this.seo.apply({
      title: 'Kirilla Réka gyógytornász‑fizioterapeuta',
      description: SEO_DESCRIPTION,
      ogUrl: 'https://www.kirillareka.hu',
    });
  }

  jumpToHirlevel(): void {
    this.scroll.scrollToAnchor('hirlevel');
  }
}

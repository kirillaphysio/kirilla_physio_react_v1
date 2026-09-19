import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BenefitItem,
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
  readonly audience: BenefitItem[] = [
    { icon: 'chair', text: 'Ellensúlyoznád az irodai munka és a sok ülés negatív hatásait' },
    { icon: 'dumbbell', text: 'Rendszeresen sportolsz, és szeretnéd elkerülni a sérüléseket' },
    { icon: 'graduation-cap', text: 'Megbízható információkat és gyakorlatban is alkalmazható megoldásokat keresel' },
  ];
  readonly benefits = [
    'Szakértői tapasztalat és folyamatosan frissített tudás',
    'Empatikus és figyelmes megközelítés',
    'Holisztikus szemléletmód',
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

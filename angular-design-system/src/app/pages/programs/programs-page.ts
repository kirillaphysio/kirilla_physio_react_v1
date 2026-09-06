import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button, CourseCard, SectionHeading } from '../../ui';
import { VideoEmbed } from '../../shared/video-embed/video-embed';
import { LeadMagnet } from '../landing/sections/lead-magnet';
import { AvailabilityNote } from '../landing/sections/availability-note';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';

const SEO_DESCRIPTION =
  'Kirilla Réka gyógytornász-fizioterapeuta otthonról végezhető, online programjai — felépített, videós gyakorlatsorok, amiket bármikor elkezdhetsz.';

/**
 * /online-programok — Programs (Online fókusz). Hero (heading + availability note + CTAs + a
 * consent-gated intro video, `kp-video-embed`), the full course catalogue (`kp-course-card`, incl. "soon" chips),
 * and the wide PDF lead magnet under the catalogue.
 */
@Component({
  selector: 'app-programs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    CourseCard,
    SectionHeading,
    VideoEmbed,
    LeadMagnet,
    AvailabilityNote,
  ],
  templateUrl: './programs-page.html',
  styleUrl: './programs-page.scss',
})
export class ProgramsPage {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly courses = this.content.courses();
  readonly platform = this.content.coursePlatform;

  constructor() {
    this.seo.apply({
      title: 'Online programok - Kirilla Réka gyógytornász-fizioterapeuta',
      description: SEO_DESCRIPTION,
      canonical: 'https://www.kirillareka.hu/online-programok',
      ogUrl: 'https://www.kirillareka.hu/online-programok',
      ogType: 'product',
    });
  }
}

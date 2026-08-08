import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { map } from 'rxjs';
import { SeoService } from '../../core/seo.service';
import { therapies } from '../../data/therapy';
import { CloudinaryImage } from '../../shared/cloudinary-image/cloudinary-image';
import { TherapyList } from '../../shared/therapy-list/therapy-list';

// Matches the React version's MAX_IMAGE_SIZE for this page. Same static-size simplification as
// TherapyCard (see its comment) in place of the original's ResizeObserver-based measurement.
const IMAGE_SIZE = 500;

@Component({
  selector: 'app-therapy-page',
  imports: [CloudinaryImage, TherapyList],
  templateUrl: './therapy-page.html',
  styleUrl: './therapy-page.scss',
  host: { class: 'therapy-page' },
})
export class TherapyPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);

  // Signal instead of the React version's useParams()/useMemo — recomputes when the route param
  // changes without the component being recreated (navigating from one /therapy/:id to another).
  private readonly therapyId = toSignal(this.route.paramMap.pipe(map((params) => params.get('therapyId'))), {
    initialValue: null,
  });

  protected readonly therapy = computed(() => therapies.find((t) => t.id === this.therapyId()));
  protected readonly imageSize = IMAGE_SIZE;

  // DOMPurify.sanitize + DomSanitizer.bypassSecurityTrustHtml, same combination the plan called
  // for: DOMPurify does the actual sanitizing (therapy.long contains hand-authored <strong> tags,
  // same static data Angular itself would otherwise escape), then Angular is told the
  // *already-sanitized* result is safe to render via [innerHTML].
  protected readonly sanitizedLong = computed<SafeHtml | null>(() => {
    const therapy = this.therapy();
    return therapy ? this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(therapy.long)) : null;
  });

  constructor() {
    effect(() => {
      const therapy = this.therapy();

      if (therapy) {
        this.seo.apply({
          title: `${therapy.title} - Kirilla Réka gyógytornász-fizioterapeuta`,
          canonical: `https://www.kirillareka.hu/#/therapy/${therapy.id}`,
          description: `Kirilla Réka gyógytornász-fizioterapeuta által végzett ${therapy.title} ismertetője.`,
          ogType: 'article',
        });
      } else {
        // The React version left this case as literally "undefined - Kirilla Réka..." (template
        // literal over an undefined therapy) — a graceful fallback here instead, for an invalid
        // therapyId.
        this.seo.apply({
          title: 'Terápia nem található - Kirilla Réka gyógytornász-fizioterapeuta',
          canonical: 'https://www.kirillareka.hu/#/individual-treatments',
          description: 'Kirilla Réka gyógytornász-fizioterapeuta által kínált terápiák.',
        });
      }
    });
  }
}

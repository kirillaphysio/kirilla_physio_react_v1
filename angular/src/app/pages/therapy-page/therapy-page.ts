import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SeoService } from '../../core/seo.service';
import { therapies } from '../../data/therapy';

@Component({
  selector: 'app-therapy-page',
  imports: [],
  templateUrl: './therapy-page.html',
  styleUrl: './therapy-page.scss',
  host: { class: 'therapy-page' },
})
export class TherapyPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  // Signal instead of the React version's useParams()/useMemo — recomputes when the route param
  // changes without the component being recreated (navigating from one /therapy/:id to another).
  private readonly therapyId = toSignal(this.route.paramMap.pipe(map((params) => params.get('therapyId'))), {
    initialValue: null,
  });

  protected readonly therapy = computed(() => therapies.find((t) => t.id === this.therapyId()));

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

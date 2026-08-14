import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Button, Card, SectionHeading } from '../../ui';

@Component({
  selector: 'app-placeholder-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, SectionHeading],
  template: `
    <section class="kp-section">
      <kp-card surface="tintCream" padding="lg" radius="xl">
        <div class="placeholder">
          <kp-section-heading
            eyebrow="Készülőben"
            [title]="title()"
            [level]="3"
            lead="Ez az oldal hamarosan elérhető lesz. Addig is nézz körül a kezdőlapon."
          />
          <kp-button variant="secondary" icon="arrow-left" href="/">Vissza a kezdőlapra</kp-button>
        </div>
      </kp-card>
    </section>
  `,
  styles: [
    `
      .placeholder {
        display: flex;
        flex-direction: column;
        gap: var(--space-8);
        align-items: flex-start;
      }
    `,
  ],
})
export class PlaceholderPage {
  private route = inject(ActivatedRoute);
  readonly title = toSignal(
    this.route.data.pipe(map((d) => (d['title'] as string) ?? 'készülőben')),
    { initialValue: 'készülőben' },
  );
}

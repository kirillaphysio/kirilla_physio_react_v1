import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, BodyMap, Card, Eyebrow, Icon } from '../../../ui';
import { InfoTip } from './info-tip';
import { ContentService } from '../../../core/content.service';
import { SALONIC_URL } from '../../../ui/header/header';

const TIP_TEXT =
  'Nem csak ez a három terápia lehet hatásos ezen a testtájékon — ezek a leggyakoribb választásaim, de a kezelési tervet mindig az állapotfelmérés alapján állítom össze.';

/** "Kezdjük ott, ahol a panaszod van" — body map + the selected region's detail card. */
@Component({
  selector: 'app-symptom-router',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, BodyMap, Card, Eyebrow, Icon, InfoTip],
  templateUrl: './symptom-router.html',
  styleUrl: './symptom-router.scss',
})
export class SymptomRouter {
  private readonly content = inject(ContentService);

  readonly salonic = SALONIC_URL;
  readonly tipText = TIP_TEXT;
  readonly regions = this.content.regions();

  readonly active = signal(this.content.defaultRegion);

  readonly region = computed(() =>
    this.regions.find((r) => r.id === this.active()),
  );
  readonly detail = computed(() => this.content.regionDetail(this.active()));
  readonly therapies = computed(() => this.content.regionTherapies(this.active()));

  select(id: string): void {
    this.active.set(id);
  }
}

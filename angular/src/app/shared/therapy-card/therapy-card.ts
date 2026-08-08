import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { CloudinaryImage } from '../cloudinary-image/cloudinary-image';
import { Therapy } from '../../data/therapy';

// Matches the React version's MAX_IMAGE_SIZE. There, a ResizeObserver (useMeasure) picked the
// exact fetched-image width per card at render time; here we just fetch at this fixed size and
// let CSS `max-width` handle the true responsive display sizing (see therapy-card.scss) — a
// deliberate simplification. Trade-off: on unusually wide mobile cards the image could look
// slightly soft, since NgOptimizedImage's srcset is density- not container-width-based. Revisit
// with a ResizeObserver directive if that turns out to matter.
const IMAGE_SIZE = 300;

@Component({
  selector: 'app-therapy-card',
  imports: [RouterLink, FaIconComponent, CloudinaryImage],
  templateUrl: './therapy-card.html',
  styleUrl: './therapy-card.scss',
  host: { class: 'therapy-card', '(click)': 'toggleDescription()' },
})
export class TherapyCard {
  readonly therapy = input.required<Therapy>();

  protected readonly faCircleInfo = faCircleInfo;
  protected readonly imageSize = IMAGE_SIZE;

  // Always toggles on click. On desktop this is harmless — the description is permanently shown
  // there regardless of this signal (see therapy-card.scss) — it only matters on mobile, where
  // the description overlays the image until tapped. Replaces the React version's
  // `if (isMobile) setDescriptionVisible(...)` branch; simpler, and CSS still gates the actual
  // effect exactly the same way the JS guard did.
  protected readonly descriptionVisible = signal(false);

  protected toggleDescription(): void {
    this.descriptionVisible.update((visible) => !visible);
  }
}

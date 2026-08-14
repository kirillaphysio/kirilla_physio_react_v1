import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from '../card/card';
import { Icon } from '../../shared/icon/icon';
import { CloudinaryImage } from '../../shared/cloudinary-image/cloudinary-image';

/** One cell of the therapies grid: 4:3 photo, title, one-line summary, "Részletek" link. */
@Component({
  selector: 'kp-therapy-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Icon, CloudinaryImage],
  templateUrl: './therapy-card.html',
  styleUrl: './therapy-card.scss',
})
export class TherapyCard {
  readonly title = input.required<string>();
  readonly short = input<string>();
  readonly imageId = input<string>();
  readonly imageUrl = input<string>();
  readonly href = input<string>();
  readonly linkLabel = input('Részletek');
}

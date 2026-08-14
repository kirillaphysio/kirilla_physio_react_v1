import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Card } from '../card/card';
import { Icon } from '../../shared/icon/icon';

export type LinkTileSurface = 'mesh' | 'plain' | 'tintRose' | 'tintLilac' | 'filled';

/** The large navigational route tile — icon disc, title, blurb, arrow link. */
@Component({
  selector: 'kp-link-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Icon],
  templateUrl: './link-tile.html',
  styleUrl: './link-tile.scss',
  host: { '[class.on-accent]': 'onAccent()' },
})
export class LinkTile {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly linkLabel = input<string>();
  readonly href = input<string>();
  readonly surface = input<LinkTileSurface>('mesh');

  readonly onAccent = computed(() => this.surface() === 'filled');
}

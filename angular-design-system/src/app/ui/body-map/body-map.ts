import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BodyRegion } from '../../data/region';

export const FIG_W = 240;
export const FIG_H = 430;

interface FigurePart {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
}

/** The abstract figure — plain rounded shapes, never an anatomical drawing. */
export const FIGURE_PARTS: FigurePart[] = [
  { left: 92, top: 0, width: 56, height: 56, radius: '50%' },
  { left: 111, top: 50, width: 18, height: 20, radius: '6px' },
  { left: 68, top: 66, width: 104, height: 124, radius: '36px 36px 22px 22px' },
  { left: 42, top: 76, width: 22, height: 146, radius: '999px' },
  { left: 176, top: 76, width: 22, height: 146, radius: '999px' },
  { left: 74, top: 186, width: 92, height: 48, radius: '18px 18px 26px 26px' },
  { left: 82, top: 230, width: 30, height: 172, radius: '999px' },
  { left: 128, top: 230, width: 30, height: 172, radius: '999px' },
  { left: 80, top: 406, width: 34, height: 16, radius: '999px' },
  { left: 126, top: 406, width: 34, height: 16, radius: '999px' },
];

/**
 * Schematic body diagram with edge-anchored label pills — the "Hol fáj?" symptom-first entry.
 * Three tracks: left labels | 240px figure | right labels. Controlled: pair with a detail panel.
 * Below 720px the side labels move into a wrapped pill list under the figure.
 */
@Component({
  selector: 'kp-body-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  templateUrl: './body-map.html',
  styleUrl: './body-map.scss',
})
export class BodyMap {
  readonly regions = input<BodyRegion[]>([]);
  readonly activeId = input<string>();
  readonly caption = input<string>();

  readonly select = output<string>();

  readonly figW = FIG_W;
  readonly figH = FIG_H;
  readonly parts = FIGURE_PARTS;

  readonly leftRegions = computed(() =>
    this.regions().filter((r) => r.side !== 'right'),
  );
  readonly rightRegions = computed(() =>
    this.regions().filter((r) => r.side === 'right'),
  );

  isActive(r: BodyRegion): boolean {
    return r.id === this.activeId();
  }
  onSelect(id: string): void {
    this.select.emit(id);
  }
}

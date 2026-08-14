import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

const CLOUD = 'dcwv2corw';
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;
const WIDTHS = [760, 1140, 1520];

/** Encode each path segment (ids carry Hungarian accents) without escaping the slashes. */
function encodeId(id: string): string {
  return id.split('/').map(encodeURIComponent).join('/');
}

/**
 * Native Cloudinary image — plain <img> with a `srcset` built from the `w_` transform, no SDK.
 * All URLs carry q_auto,f_auto. On a 404 it swaps to the plum placehold.co fallback.
 */
@Component({
  selector: 'kp-cloudinary-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="failed() ? fallback() : src()"
      [srcset]="failed() ? null : srcset()"
      [attr.sizes]="failed() ? null : sizes()"
      [alt]="alt()"
      [attr.loading]="eager() ? 'eager' : 'lazy'"
      [attr.decoding]="'async'"
      (error)="failed.set(true)"
    />
  `,
  styles: [
    `
      :host {
        display: block;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
})
export class CloudinaryImage {
  readonly imageId = input.required<string>();
  readonly alt = input('');
  /** Extra crop transform, e.g. "c_fill". */
  readonly crop = input<string>();
  /** Aspect [w, h] used with c_fill to derive the height per width. */
  readonly ratio = input<[number, number]>();
  readonly sizes = input('100vw');
  readonly eager = input(false);
  /** Fallback placeholder size, e.g. "760x1000". */
  readonly placeholderSize = input('600x800');

  protected readonly failed = signal(false);

  private transform(width: number): string {
    const parts: string[] = [];
    const c = this.crop();
    if (c) parts.push(c);
    parts.push(`w_${width}`);
    const r = this.ratio();
    if (c && r) parts.push(`h_${Math.round((width * r[1]) / r[0])}`);
    parts.push('q_auto', 'f_auto');
    return parts.join(',');
  }

  private url(width: number): string {
    return `${BASE}/${this.transform(width)}/${encodeId(this.imageId())}`;
  }

  readonly src = computed(() => this.url(WIDTHS[0]));
  readonly srcset = computed(() =>
    WIDTHS.map((w) => `${this.url(w)} ${w}w`).join(', '),
  );
  readonly fallback = computed(
    () =>
      `https://placehold.co/${this.placeholderSize()}/5F3D44/F8EFF1?text=A+k%C3%A9p+nem+el%C3%A9rhet%C3%B6`,
  );
}

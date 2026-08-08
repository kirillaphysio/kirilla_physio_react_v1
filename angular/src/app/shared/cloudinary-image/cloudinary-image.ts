import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

const DEFAULT_SIZE = 300;

// The placehold.co fallback used when a Cloudinary image fails to load, ported verbatim from
// CloudinaryImage.tsx's onError handler.
function placeholderUrl(width: number): string {
  return `https://placehold.co/${width}/5F3D44/F8EFF1?text=A+k%C3%A9p+nem+el%C3%A9rhet%C3%B6`;
}

/**
 * Renders a Cloudinary-hosted image (cloud `dcwv2corw`, configured via provideCloudinaryLoader in
 * app.config.ts) through Angular's built-in NgOptimizedImage, replacing the React app's
 * @cloudinary/react AdvancedImage wrapper. `imageId` is the Cloudinary public id — same values as
 * the `imageId` fields in data/therapy.ts etc.
 *
 * No object-fit/crop is applied here: the original never resized images server-side either (no
 * .resize() transform), it just constrained the raw image into a width×height CSS box, so images
 * whose aspect ratio doesn't match get stretched — preserved as-is for visual parity.
 */
@Component({
  selector: 'app-cloudinary-image',
  imports: [NgOptimizedImage],
  templateUrl: './cloudinary-image.html',
  styleUrl: './cloudinary-image.scss',
})
export class CloudinaryImage {
  readonly imageId = input.required<string>();
  readonly width = input(DEFAULT_SIZE);
  readonly height = input(DEFAULT_SIZE);
  readonly alt = input('');
  readonly className = input('');
  /** Set true for above-the-fold/LCP images — eager + high fetch priority instead of lazy. */
  readonly priority = input(false);

  protected onError(event: Event): void {
    (event.target as HTMLImageElement).src = placeholderUrl(this.width());
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Button, Icon } from '../../ui';
import { ImageSlot } from '../image-slot/image-slot';
import { ConsentService } from '../../core/consent.service';

/**
 * Consent-gated lazy YouTube embed for a single video (mirrors the blog `playlist-card` gating).
 * Fills its container — the parent owns the aspect ratio and rounding (e.g. `.hero__video`). The
 * poster is the brand `kp-image-slot`; the actual youtube-nocookie iframe loads only after the
 * visitor clicks play AND has granted the `social` (embedded content) consent category, so the
 * prerendered HTML never carries a third-party embed.
 */
@Component({
  selector: 'kp-video-embed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Icon, ImageSlot],
  templateUrl: './video-embed.html',
  styleUrl: './video-embed.scss',
})
export class VideoEmbed {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly consent = inject(ConsentService);

  /** YouTube video id, e.g. `-327kcwYFUw`. */
  readonly videoId = input.required<string>();
  /** Accessible title for the iframe and play button. */
  readonly title = input.required<string>();
  /** Small label shown on the poster placeholder. Optional. */
  readonly posterLabel = input<string>();

  readonly playing = signal(false);
  readonly needsConsent = signal(false);

  /** Thumbnail loading state: try the HD poster, fall back to the SD one, then the brand slot. */
  private readonly thumbLevel = signal<0 | 1 | 2>(0);
  readonly thumbUrl = computed(() => {
    const id = this.videoId();
    return this.thumbLevel() === 0
      ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
      : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  });
  /** True once no YouTube thumbnail could load (e.g. a private video) — show the brand poster. */
  readonly thumbFailed = computed(() => this.thumbLevel() === 2);

  onThumbError(): void {
    this.thumbLevel.update((l) => (l < 2 ? ((l + 1) as 0 | 1 | 2) : l));
  }

  readonly socialGranted = computed(() => this.consent.isGranted('social'));

  readonly embedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.videoId()}?autoplay=1&rel=0`,
    ),
  );
  readonly youtubeUrl = computed(
    () => `https://youtu.be/${this.videoId()}`,
  );

  onPlay(): void {
    if (this.socialGranted()) {
      this.playing.set(true);
    } else {
      this.needsConsent.set(true);
    }
  }

  allowAndPlay(): void {
    this.consent.grant('social');
    this.needsConsent.set(false);
    this.playing.set(true);
  }
}

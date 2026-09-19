import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Button, Card, Icon } from '../../ui';
import { BlogPlaylist } from '../../data/blog';
import { ConsentService } from '../../core/consent.service';

/**
 * One YouTube-playlist tile. The poster is the brand `kp-playlist-art`; the actual
 * youtube-nocookie iframe is lazy — it loads only after the visitor clicks play AND has granted
 * the `social` (embedded content) consent category. Until then no third-party request is made, so
 * the prerendered HTML never carries an embed.
 */
@Component({
  selector: 'app-playlist-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Icon],
  templateUrl: './playlist-card.html',
  styleUrl: './playlist-card.scss',
})
export class PlaylistCard {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly consent = inject(ConsentService);

  readonly playlist = input.required<BlogPlaylist>();

  readonly playing = signal(false);
  readonly needsConsent = signal(false);

  readonly socialGranted = computed(() => this.consent.isGranted('social'));

  readonly embedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/videoseries?list=${this.playlist().list}&autoplay=1&rel=0`,
    ),
  );
  readonly youtubeUrl = computed(
    () => `https://www.youtube.com/playlist?list=${this.playlist().list}`,
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

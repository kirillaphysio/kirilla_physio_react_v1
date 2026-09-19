import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  PLAYLIST_GROUNDS,
  PlaylistKind,
  playlistSvg,
} from './playlist-art-data';

/**
 * Brand SVG poster for a YouTube playlist, one scene per body region
 * (spine/neck/hip/knee/foot/hand/stress/vlog). Fills its container — the parent owns the 16:9 box.
 * On hover the scene lifts slightly (disabled under prefers-reduced-motion).
 *
 * The scene markup is static, author-controlled SVG built in playlist-art-data.ts; it's injected
 * via bypassSecurityTrustHtml because Angular's HTML sanitizer strips `<svg>`. No user input
 * reaches this binding.
 */
@Component({
  selector: 'kp-playlist-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kp-playlist-art" [style.background]="ground()" [innerHTML]="svg()"></div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      /* The injected <svg> is sized + animated from global styles.scss (.kp-playlist-art > svg) —
         emulated encapsulation can't tag a node added via [innerHTML]. */
      .kp-playlist-art {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class PlaylistArt {
  private readonly sanitizer = inject(DomSanitizer);

  readonly kind = input.required<PlaylistKind>();

  protected readonly ground = computed(() => PLAYLIST_GROUNDS[this.kind()] ?? PLAYLIST_GROUNDS.spine);
  protected readonly svg = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(playlistSvg(this.kind())),
  );
}

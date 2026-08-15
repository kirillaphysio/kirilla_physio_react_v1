import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Wordmark } from '../wordmark/wordmark';
import { Button } from '../button/button';
import { IconButton } from '../icon-button/icon-button';

export interface NavItem {
  label: string;
  href: string;
}

export const SALONIC_URL = 'https://kirillareka.salonic.hu/';

/** Nav in Online fókusz mode, in source order. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Kezdőlap', href: '/' },
  { label: 'Online programok', href: '/online-programok' },
  { label: 'Egyéni kezelések', href: '/egyeni-kezelesek' },
  { label: 'Rólam', href: '/rolam' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kapcsolat', href: '/kapcsolat' },
];

/** Site header: wordmark, pill nav (active pill carries the gradient), one primary CTA. */
@Component({
  selector: 'kp-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Wordmark, Button, IconButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: { role: 'banner' },
})
export class Header {
  readonly items = NAV_ITEMS;
  readonly ctaLabel = 'Időpontot foglalok';
  readonly ctaHref = SALONIC_URL;

  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }
  close(): void {
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}

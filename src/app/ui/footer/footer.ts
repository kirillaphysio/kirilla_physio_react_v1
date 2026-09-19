import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Wordmark } from '../wordmark/wordmark';
import { IconButton } from '../icon-button/icon-button';
import { WeeklyMessage } from '../weekly-message/weekly-message';
import { NewsletterSignup } from '../newsletter-signup/newsletter-signup';

export interface PolicyLink {
  label: string;
  href: string;
}
export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

const SOCIALS: SocialLink[] = [
  { icon: 'facebook', href: 'https://www.facebook.com/kirillaphysio/', label: 'Ide kattintva tudod felkeresni a Facebook profilomat' },
  { icon: 'instagram', href: 'https://www.instagram.com/kirilla_physio/', label: 'Ide kattintva tudod felkeresni az Instagram profilomat' },
  { icon: 'tiktok', href: 'https://www.tiktok.com/@kirilla_physio', label: 'Ide kattintva tudod felkeresni a TikTok profilomat' },
  { icon: 'youtube', href: 'https://www.youtube.com/channel/UCN9ZM4g1KHw_8GTmYq9cG2g', label: 'Ide kattintva tudod felkeresni a YouTube csatornámat' },
];

const POLICY: PolicyLink[] = [
  { label: 'Ászf', href: '/feltetelek' },
  { label: 'Adatkezelési tájékoztató', href: '/adatkezeles' },
  { label: 'Cookie nyilatkozat', href: '/cookie' },
];

/** Site footer on the plum-800 surface: wordmark + newsletter, social row, weekly message, policy links. */
@Component({
  selector: 'kp-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Wordmark, IconButton, WeeklyMessage, NewsletterSignup],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  host: { role: 'contentinfo' },
})
export class Footer {
  readonly socialLabel = input(
    'Vedd fel velem a kapcsolatot a közösségi média oldalaimon!',
  );
  readonly weekly = input(true);

  readonly socials = SOCIALS;
  readonly policyLinks = POLICY;
  readonly year = new Date().getFullYear();
}

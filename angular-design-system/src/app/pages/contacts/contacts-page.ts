import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Button, Card, Eyebrow, Icon, IconButton } from '../../ui';
import { ViewportService } from '../../core/viewport.service';
import { ConsentService } from '../../core/consent.service';
import { SeoService } from '../../core/seo.service';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.5671552762215!2d19.019068076417017!3d47.498344995446736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc2759855e45%3A0x2b036953b04e80d2!2sBudapest%2C%20Nagyenyed%20u.%2015%2Fa%2C%201123!5e0!3m2!1sen!2shu!4v1748095089521!5m2!1sen!2shu';
const ADDRESS = 'Budapest, XII. kerület, Nagyenyed utca 15/A';
const MAPS_LINK = 'https://maps.app.goo.gl/MFLgSvpn8ttvUxos6';
const EMAIL = 'kirillaphysio@gmail.com';
const SOCIALS = [
  { icon: 'facebook', href: 'https://www.facebook.com/kirillaphysio/', label: 'Ide kattintva tudod felkeresni a Facebook profilomat' },
  { icon: 'instagram', href: 'https://www.instagram.com/kirilla_physio/', label: 'Ide kattintva tudod felkeresni az Instagram profilomat' },
  { icon: 'tiktok', href: 'https://www.tiktok.com/@kirilla_physio', label: 'Ide kattintva tudod felkeresni a TikTok profilomat' },
  { icon: 'youtube', href: 'https://www.youtube.com/channel/UCN9ZM4g1KHw_8GTmYq9cG2g', label: 'Ide kattintva tudod felkeresni a YouTube csatornámat' },
];

/**
 * /kapcsolat — Contacts. Address + email + socials cards. The Google Maps embed is a third-party
 * iframe, so it is BOTH gated behind `social` consent AND rendered on desktop only
 * (ViewportService) — on mobile the map card shows just the address + a "Térkép" link, never the
 * iframe. Prerender assumes desktop + no consent, so it emits the blocked placeholder, not an embed.
 */
@Component({
  selector: 'app-contacts-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Eyebrow, Icon, IconButton],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
})
export class ContactsPage {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly consent = inject(ConsentService);
  private readonly seo = inject(SeoService);
  protected readonly viewport = inject(ViewportService);

  readonly address = ADDRESS;
  readonly mapsLink = MAPS_LINK;
  readonly email = EMAIL;
  readonly emailHref = `mailto:${EMAIL}`;
  readonly socials = SOCIALS;

  readonly mapEmbed: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(MAP_EMBED);
  readonly mapAllowed = computed(() => this.consent.isGranted('social'));

  allowMap(): void {
    this.consent.grant('social');
  }

  constructor() {
    this.seo.apply({
      title: 'Kapcsolat - Kirilla Réka gyógytornász-fizioterapeuta',
      description:
        'Kirilla Réka gyógytornász-fizioterapeuta honlapjának kapcsolat oldala, ahol tájékozódhatsz Réka elérhetőségeiről.',
      canonical: 'https://www.kirillareka.hu/kapcsolat',
      ogUrl: 'https://www.kirillareka.hu/kapcsolat',
      ogType: 'place',
    });
  }
}

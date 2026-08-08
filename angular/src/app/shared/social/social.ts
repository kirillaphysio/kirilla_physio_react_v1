import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social',
  imports: [FaIconComponent],
  templateUrl: './social.html',
  styleUrl: './social.scss',
})
export class Social {
  protected readonly faFacebook = faFacebook;
  protected readonly faInstagram = faInstagram;
  protected readonly faTiktok = faTiktok;
  protected readonly faYoutube = faYoutube;
}

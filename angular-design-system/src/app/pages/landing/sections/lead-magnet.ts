import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BenefitList,
  Button,
  Card,
  Eyebrow,
  GradientText,
  Icon,
  TextField,
} from '../../../ui';
import { NewsletterService } from '../../../core/newsletter.service';
import { ContentService } from '../../../core/content.service';

const PDF_TITLE = '5 gyakorlat derékfájásra';
const PDF_POINTS = [
  'Öt gyakorlat, amit otthon, eszköz nélkül elvégezhetsz',
  'Mindegyikhez leírás és annyi ismétlés, amennyi valóban elég',
  'Utána havonta egy levél arról, mit tehetsz a saját mozgásodért',
];
const SUCCESS =
  'Köszönöm! A PDF-et elküldtem a megadott címre. Ha nem érkezik meg pár percen belül, nézd meg a spam mappát is.';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

/** Hírlevél lead magnet (anchor #hirlevel). Client states are real: idle/submitting/success/error. */
@Component({
  selector: 'app-lead-magnet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, BenefitList, Button, Card, Eyebrow, GradientText, Icon, TextField],
  templateUrl: './lead-magnet.html',
  styleUrl: './lead-magnet.scss',
})
export class LeadMagnet {
  private readonly newsletter = inject(NewsletterService);
  private readonly content = inject(ContentService);

  readonly pdfTitle = PDF_TITLE;
  readonly pdfPoints = PDF_POINTS;
  readonly successMessage = SUCCESS;
  readonly platform = this.content.coursePlatform;

  readonly email = signal('');
  readonly state = signal<FormState>('idle');
  readonly errorMsg = signal<string | undefined>(undefined);

  async submit(): Promise<void> {
    if (this.state() === 'submitting') return;
    const value = this.email().trim();
    if (!EMAIL_RE.test(value)) {
      this.errorMsg.set('Kérlek adj meg egy érvényes e-mail címet.');
      this.state.set('error');
      return;
    }
    this.errorMsg.set(undefined);
    this.state.set('submitting');
    try {
      await this.newsletter.submit(value);
      this.state.set('success');
    } catch {
      this.errorMsg.set('Valami hiba történt. Kérlek próbáld újra kicsit később.');
      this.state.set('error');
    }
  }
}

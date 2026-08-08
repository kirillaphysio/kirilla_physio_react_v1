import { Component } from '@angular/core';
import { FaqItem } from '../faq-item/faq-item';
import { faqs } from '../../../data/faq';

@Component({
  selector: 'app-faq',
  imports: [FaqItem],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
  host: { class: 'faq' },
})
export class Faq {
  protected readonly faqs = faqs;
}

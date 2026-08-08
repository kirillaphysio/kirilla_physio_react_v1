import { Component, input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Faq as FaqEntry } from '../../../data/faq';

@Component({
  selector: 'app-faq-item',
  imports: [FaIconComponent],
  templateUrl: './faq-item.html',
  styleUrl: './faq-item.scss',
  host: { class: 'faq-item' },
})
export class FaqItem {
  readonly entry = input.required<FaqEntry>();

  protected readonly faChevronDown = faChevronDown;
  protected readonly expanded = signal(false);

  protected toggle(): void {
    this.expanded.update((value) => !value);
  }
}

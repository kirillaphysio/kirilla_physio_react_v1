import { Component, input } from '@angular/core';
import { TherapyCard } from '../therapy-card/therapy-card';
import { therapies } from '../../data/therapy';

@Component({
  selector: 'app-therapy-list',
  imports: [TherapyCard],
  templateUrl: './therapy-list.html',
  styleUrl: './therapy-list.scss',
  host: { class: 'therapy-list' },
})
export class TherapyList {
  /** Excluded from the list — used on a therapy's own detail page to show only the others. */
  readonly selectedTherapyId = input<string>();

  protected readonly therapies = therapies;
}

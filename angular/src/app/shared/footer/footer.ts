import { Component } from '@angular/core';
import { Social } from '../social/social';
import { Policy } from '../policy/policy';

@Component({
  selector: 'app-footer',
  imports: [Social, Policy],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}

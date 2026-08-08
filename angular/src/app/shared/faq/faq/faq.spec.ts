import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faq } from './faq';
import { faqs } from '../../../data/faq';

describe('Faq', () => {
  let fixture: ComponentFixture<Faq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faq],
    }).compileComponents();

    fixture = TestBed.createComponent(Faq);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders one item per FAQ entry', () => {
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('app-faq-item');
    expect(items.length).toBe(faqs.length);
  });
});

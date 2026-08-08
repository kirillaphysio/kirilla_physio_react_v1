import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqItem } from './faq-item';

describe('FaqItem', () => {
  let fixture: ComponentFixture<FaqItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqItem],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqItem);
    fixture.componentRef.setInput('entry', { question: 'Kérdés?', answer: 'Válasz.' });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the question, collapsed by default', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h5')?.textContent).toContain('Kérdés?');
    expect(el.querySelector('h5')?.getAttribute('aria-expanded')).toBe('false');
    expect(el.querySelector('.collapse')?.classList.contains('expanded')).toBe(false);
  });

  it('expands on click and collapses again on a second click', () => {
    const heading = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('h5')!;

    heading.click();
    fixture.detectChanges();
    expect(heading.getAttribute('aria-expanded')).toBe('true');
    expect((fixture.nativeElement as HTMLElement).querySelector('.collapse')?.classList.contains('expanded')).toBe(
      true,
    );

    heading.click();
    fixture.detectChanges();
    expect(heading.getAttribute('aria-expanded')).toBe('false');
  });

  it('shows the answer text', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.content')?.textContent).toContain('Válasz.');
  });
});

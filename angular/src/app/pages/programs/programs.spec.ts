import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { Programs } from './programs';

describe('Programs', () => {
  let fixture: ComponentFixture<Programs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Programs],
    }).compileComponents();

    fixture = TestBed.createComponent(Programs);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the programs-page class on its host element', () => {
    expect((fixture.nativeElement as HTMLElement).classList.contains('programs-page')).toBe(true);
  });

  it('sets the page title, canonical link and Open Graph tags', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Online programok - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu/#/online-programs',
    );
    expect(meta.getTag('property="og:type"')?.content).toBe('product');
  });
});

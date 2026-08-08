import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { Privacy } from './privacy';

describe('Privacy', () => {
  let fixture: ComponentFixture<Privacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Privacy],
    }).compileComponents();

    fixture = TestBed.createComponent(Privacy);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('does not set a page class on its host element (matches the React version, which had none)', () => {
    expect((fixture.nativeElement as HTMLElement).className).toBe('');
  });

  it("sets the page title, canonical link and Open Graph tags, fixing the React version's mismatched og:title", () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Adatkezelési Tájékoztató programok - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu/#/privacy',
    );
    // React's og:title was "Online programok - ..." here, a copy-paste leftover — this should
    // match the real title instead.
    expect(meta.getTag('property="og:title"')?.content).toBe(title.getTitle());
    expect(meta.getTag('property="og:type"')?.content).toBe('product');
  });
});

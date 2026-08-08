import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { Cookie } from './cookie';

describe('Cookie', () => {
  let fixture: ComponentFixture<Cookie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cookie],
    }).compileComponents();

    fixture = TestBed.createComponent(Cookie);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('does not set a page class on its host element (matches the React version, which had none)', () => {
    expect((fixture.nativeElement as HTMLElement).className).toBe('');
  });

  it('sets the page title, canonical link and Open Graph tags', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Cookie nyilatkozat - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu/#/cookie',
    );
    expect(meta.getTag('property="og:type"')?.content).toBe('product');
  });
});

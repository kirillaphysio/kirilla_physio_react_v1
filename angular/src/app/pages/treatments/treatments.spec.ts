import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { Treatments } from './treatments';
import { therapies } from '../../data/therapy';

describe('Treatments', () => {
  let fixture: ComponentFixture<Treatments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Treatments],
    }).compileComponents();

    fixture = TestBed.createComponent(Treatments);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the treatment-page class (singular) on its host element', () => {
    expect((fixture.nativeElement as HTMLElement).classList.contains('treatment-page')).toBe(true);
  });

  it('sets the page title, canonical link and Open Graph tags', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Egyéni kezelések - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu/#/individual-treatments',
    );
    expect(meta.getTag('property="og:type"')?.content).toBe('product');
  });

  it('appends every therapy title to the meta description, but not the Open Graph description', () => {
    const meta = TestBed.inject(Meta);
    const description = meta.getTag('name="description"')?.content ?? '';
    const ogDescription = meta.getTag('property="og:description"')?.content ?? '';

    for (const therapy of therapies) {
      expect(description).toContain(therapy.title);
      expect(ogDescription).not.toContain(therapy.title);
    }
  });
});

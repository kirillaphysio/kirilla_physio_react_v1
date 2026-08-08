import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { Contacts } from './contacts';

describe('Contacts', () => {
  let fixture: ComponentFixture<Contacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contacts],
    }).compileComponents();

    fixture = TestBed.createComponent(Contacts);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the contacts-page class on its host element', () => {
    expect((fixture.nativeElement as HTMLElement).classList.contains('contacts-page')).toBe(true);
  });

  it('sets the page title, canonical link and Open Graph tags, without the React version\'s duplicated-word typo', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Kapcsolat - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu/#/contacts',
    );
    expect(meta.getTag('property="og:description"')?.content).not.toContain('honlapjának honlapjának');
    expect(meta.getTag('property="og:type"')?.content).toBe('place');
  });
});

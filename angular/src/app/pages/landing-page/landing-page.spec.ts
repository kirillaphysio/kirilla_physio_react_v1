import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { LandingPage } from './landing-page';

describe('LandingPage', () => {
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPage);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the landing-page class on its host element, for the .app > [class$="-page"] layout rule', () => {
    expect((fixture.nativeElement as HTMLElement).classList.contains('landing-page')).toBe(true);
  });

  it('sets the page title, canonical link and Open Graph tags', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe('Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu',
    );
    expect(meta.getTag('name="description"')?.content).toContain('kezdőoldala');
    expect(meta.getTag('name="description"')?.content).toContain('Gyógytornász, gyógytorna');
    expect(meta.getTag('property="og:description"')?.content).not.toContain('Gyógytornász, gyógytorna');
    expect(meta.getTag('property="og:type"')?.content).toBe('website');
  });
});

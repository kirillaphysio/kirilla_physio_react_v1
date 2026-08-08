import { provideCloudinaryLoader } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TherapyCard } from './therapy-card';
import { therapies } from '../../data/therapy';

describe('TherapyCard', () => {
  let fixture: ComponentFixture<TherapyCard>;
  const therapy = therapies[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyCard],
      providers: [provideRouter([]), provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw')],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapyCard);
    fixture.componentRef.setInput('therapy', therapy);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the title, short description and a link to the detail page', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.title')?.textContent).toContain(therapy.title);
    expect(el.querySelector('.description label')?.textContent).toContain(therapy.short);
    expect(el.querySelector('.more-btn')?.getAttribute('href')).toBe(`/therapy/${therapy.id}`);
  });

  it('toggles descriptionVisible when the card is clicked (harmless on desktop, matters on mobile)', () => {
    expect(fixture.componentInstance['descriptionVisible']()).toBe(false);

    (fixture.nativeElement as HTMLElement).click();
    expect(fixture.componentInstance['descriptionVisible']()).toBe(true);
  });
});

import { provideCloudinaryLoader } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TherapyList } from './therapy-list';
import { therapies } from '../../data/therapy';

describe('TherapyList', () => {
  let fixture: ComponentFixture<TherapyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyList],
      providers: [provideRouter([]), provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw')],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapyList);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders every therapy when none is selected/excluded', () => {
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-therapy-card');
    expect(cards.length).toBe(therapies.length);
  });

  it('excludes the selected therapy from the list', async () => {
    fixture.componentRef.setInput('selectedTherapyId', therapies[0].id);
    await fixture.whenStable();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-therapy-card');
    expect(cards.length).toBe(therapies.length - 1);
  });
});

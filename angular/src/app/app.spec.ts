import { provideCloudinaryLoader } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw')],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    await fixture.whenStable();
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the header, router outlet, back-to-top button, footer and cookie consent banner in order', () => {
    const children = Array.from((fixture.nativeElement as HTMLElement).querySelector('.app')!.children).map(
      (el) => el.tagName.toLowerCase(),
    );

    expect(children).toEqual([
      'app-header',
      'router-outlet',
      'app-back-to-top-button',
      'app-footer',
      'app-cookie-consent',
    ]);
  });
});

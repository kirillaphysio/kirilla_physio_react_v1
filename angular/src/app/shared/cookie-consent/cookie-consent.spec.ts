import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { CookieConsent } from './cookie-consent';

const STORAGE_KEY = 'kirillareka-cookie-consent';

@Component({ selector: 'app-blank', template: '' })
class BlankComponent {}

async function createOnRoute(path: string): Promise<ComponentFixture<CookieConsent>> {
  await TestBed.configureTestingModule({
    imports: [CookieConsent],
    providers: [
      provideRouter([
        { path: '', component: BlankComponent },
        { path: 'privacy', component: BlankComponent },
      ]),
    ],
  }).compileComponents();

  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(path);

  const fixture = TestBed.createComponent(CookieConsent);
  await fixture.whenStable();
  return fixture;
}

describe('CookieConsent', () => {
  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should create', async () => {
    const fixture = await createOnRoute('/');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the banner by default, with no stored choice', async () => {
    const fixture = await createOnRoute('/');
    expect((fixture.nativeElement as HTMLElement).querySelector('.cookie-banner')).toBeTruthy();
  });

  it('does not show the banner on a fresh instance once a choice was stored', async () => {
    const first = await createOnRoute('/');
    (first.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.accept-button')!.click();
    first.detectChanges();

    // Simulate a fresh page load with a brand-new Angular application, not just a new component
    // instance in the same one.
    TestBed.resetTestingModule();
    const second = await createOnRoute('/');
    expect((second.nativeElement as HTMLElement).querySelector('.cookie-banner')).toBeNull();
  });

  it('accepting closes the banner and persists "accepted"', async () => {
    const fixture = await createOnRoute('/');
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.accept-button')!.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.cookie-banner')).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('accepted');
  });

  it('declining closes the banner and persists "declined"', async () => {
    const fixture = await createOnRoute('/');
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.decline-button')!.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.cookie-banner')).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('declined');
  });

  it('links to the privacy policy from within the banner', async () => {
    const fixture = await createOnRoute('/');
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(link?.getAttribute('href')).toBe('/privacy');
  });

  it('does not show a reopen button on other pages, even after a choice was made', async () => {
    const fixture = await createOnRoute('/');
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.accept-button')!.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.reopen-button')).toBeNull();
  });

  it('shows a reopen button on the privacy page once a choice was made', async () => {
    const fixture = await createOnRoute('/privacy');
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.accept-button')!.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.reopen-button')).toBeTruthy();
  });

  it('reopening the banner via the reopen button hides the reopen button again', async () => {
    const fixture = await createOnRoute('/privacy');
    const el = fixture.nativeElement as HTMLElement;
    el.querySelector<HTMLButtonElement>('.accept-button')!.click();
    fixture.detectChanges();

    el.querySelector<HTMLButtonElement>('.reopen-button')!.click();
    fixture.detectChanges();

    expect(el.querySelector('.cookie-banner')).toBeTruthy();
    expect(el.querySelector('.reopen-button')).toBeNull();
  });
});

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { Menu } from './menu';

@Component({ selector: 'app-blank', template: '' })
class BlankComponent {}

describe('Menu', () => {
  let fixture: ComponentFixture<Menu>;
  let component: Menu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [
        provideRouter([
          { path: '', component: BlankComponent },
          { path: 'contacts', component: BlankComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the four nav items in order, with the external link as a plain anchor', () => {
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.menu-list a');
    const labels = Array.from(links).map((link) => link.textContent?.trim());
    expect(labels).toEqual(['Kezdőlap', 'Online programok', 'Egyéni kezelések', 'Kapcsolat']);

    expect(links[1].getAttribute('href')).toBe('https://oktatas.kirillareka.hu/');
    expect(links[1].getAttribute('routerLink')).toBeNull();
  });

  it('toggles isOpen when the hamburger button is clicked', () => {
    expect(component['isOpen']()).toBe(false);

    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.hamburger')!;
    button.click();
    fixture.detectChanges();
    expect(component['isOpen']()).toBe(true);

    button.click();
    fixture.detectChanges();
    expect(component['isOpen']()).toBe(false);
  });

  it('closes the menu on route navigation', async () => {
    component['isOpen'].set(true);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/contacts');

    expect(component['isOpen']()).toBe(false);
  });
});

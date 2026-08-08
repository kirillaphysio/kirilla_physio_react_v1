import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Policy } from './policy';

describe('Policy', () => {
  let component: Policy;
  let fixture: ComponentFixture<Policy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Policy],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Policy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to the three legal pages', () => {
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('a');
    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));

    expect(hrefs).toEqual(['/terms', '/privacy', '/cookie']);
  });
});

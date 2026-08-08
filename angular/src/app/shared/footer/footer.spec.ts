import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the social links and policy links inside a footer landmark', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('footer.app-footer app-social')).toBeTruthy();
    expect(el.querySelector('footer.app-footer app-policy')).toBeTruthy();
  });
});

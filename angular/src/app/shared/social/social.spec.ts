import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Social } from './social';

describe('Social', () => {
  let component: Social;
  let fixture: ComponentFixture<Social>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Social],
    }).compileComponents();

    fixture = TestBed.createComponent(Social);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders all four social links pointing at the right profiles', () => {
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a.social-link');
    const hrefs = Array.from(links).map((link) => link.href);

    expect(hrefs).toEqual([
      'https://www.facebook.com/kirillaphysio/',
      'https://www.instagram.com/kirilla_physio/',
      'https://www.tiktok.com/@kirilla_physio',
      'https://www.youtube.com/channel/UCN9ZM4g1KHw_8GTmYq9cG2g',
    ]);
  });
});

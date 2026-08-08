import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { Contacts } from './contacts';
import { stubMatchMedia } from '../../../testing/stub-match-media';

describe('Contacts', () => {
  let fixture: ComponentFixture<Contacts>;

  async function create(mobile: boolean): Promise<void> {
    stubMatchMedia(mobile);

    await TestBed.configureTestingModule({
      imports: [Contacts],
    }).compileComponents();

    fixture = TestBed.createComponent(Contacts);
    await fixture.whenStable();
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', async () => {
    await create(false);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the contacts-page class on its host element', async () => {
    await create(false);
    expect((fixture.nativeElement as HTMLElement).classList.contains('contacts-page')).toBe(true);
  });

  it('renders the Google Maps iframe on desktop', async () => {
    await create(false);
    expect((fixture.nativeElement as HTMLElement).querySelector('iframe')).toBeTruthy();
  });

  it('omits the Google Maps iframe entirely on mobile (not just hides it)', async () => {
    await create(true);
    expect((fixture.nativeElement as HTMLElement).querySelector('iframe')).toBeNull();
  });

  it("sets the page title, canonical link and Open Graph tags, without the React version's duplicated-word typo", async () => {
    await create(false);
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { TherapyPage } from './therapy-page';

describe('TherapyPage', () => {
  let paramMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  let fixture: ComponentFixture<TherapyPage>;

  async function create(therapyId: string | null): Promise<void> {
    paramMap$ = new BehaviorSubject(convertToParamMap(therapyId ? { therapyId } : {}));

    await TestBed.configureTestingModule({
      imports: [TherapyPage],
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: paramMap$ } }],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapyPage);
    await fixture.whenStable();
  }

  it('should create', async () => {
    await create('gyogytorna');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the therapy-page class on its host element', async () => {
    await create('gyogytorna');
    expect((fixture.nativeElement as HTMLElement).classList.contains('therapy-page')).toBe(true);
  });

  it('resolves the therapy matching the route param and sets its SEO tags', async () => {
    await create('gyogytorna');

    expect(fixture.componentInstance['therapy']()?.id).toBe('gyogytorna');

    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    expect(title.getTitle()).toBe('Gyógytorna - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.kirillareka.hu/#/therapy/gyogytorna',
    );
    expect(meta.getTag('name="description"')?.content).toContain('Gyógytorna');
    expect(meta.getTag('property="og:type"')?.content).toBe('article');
  });

  it('falls back to a graceful title/canonical for an unknown therapy id, instead of "undefined"', async () => {
    await create('does-not-exist');

    expect(fixture.componentInstance['therapy']()).toBeUndefined();

    const title = TestBed.inject(Title);
    expect(title.getTitle()).toBe('Terápia nem található - Kirilla Réka gyógytornász-fizioterapeuta');
    expect(title.getTitle()).not.toContain('undefined');
  });

  it('re-resolves and updates SEO tags reactively when the route param changes', async () => {
    await create('gyogytorna');
    const title = TestBed.inject(Title);
    expect(title.getTitle()).toContain('Gyógytorna');

    paramMap$.next(convertToParamMap({ therapyId: 'fdm' }));
    await fixture.whenStable();

    expect(fixture.componentInstance['therapy']()?.id).toBe('fdm');
    expect(title.getTitle()).toContain('FDM');
  });
});

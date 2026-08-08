import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToTopButton } from './back-to-top-button';

function setViewport(scrollY: number, innerHeight: number): void {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true });
}

describe('BackToTopButton', () => {
  let component: BackToTopButton;
  let fixture: ComponentFixture<BackToTopButton>;

  beforeEach(async () => {
    setViewport(0, 800);

    await TestBed.configureTestingModule({
      imports: [BackToTopButton],
    }).compileComponents();

    fixture = TestBed.createComponent(BackToTopButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts hidden when not scrolled past one viewport height', () => {
    expect(component['visible']()).toBe(false);
  });

  it('becomes visible once scrolled past one viewport height', () => {
    setViewport(801, 800);
    window.dispatchEvent(new Event('scroll'));

    expect(component['visible']()).toBe(true);
  });

  it('hides again when scrolled back up', () => {
    setViewport(801, 800);
    window.dispatchEvent(new Event('scroll'));
    expect(component['visible']()).toBe(true);

    setViewport(100, 800);
    window.dispatchEvent(new Event('scroll'));
    expect(component['visible']()).toBe(false);
  });

  it('scrolls to top smoothly when clicked', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.back-to-top-button')!.click();

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('stops listening once destroyed', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    fixture.destroy();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});

import { TestBed } from '@angular/core/testing';
import { MOBILE_MEDIA_QUERY } from './breakpoints';
import { ViewportService } from './viewport.service';

type ChangeListener = (event: MediaQueryListEvent) => void;

/** jsdom doesn't implement matchMedia — stub it so the service can be exercised in tests. */
function stubMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners: ChangeListener[] = [];

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media: MOBILE_MEDIA_QUERY,
    onchange: null,
    addEventListener: (_type: string, listener: ChangeListener) => listeners.push(listener),
    removeEventListener: (_type: string, listener: ChangeListener) => {
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    },
    dispatchEvent: () => true,
    addListener: () => {},
    removeListener: () => {},
  } as unknown as MediaQueryList;

  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mediaQueryList));

  return {
    listenerCount: () => listeners.length,
    emit(newMatches: boolean) {
      matches = newMatches;
      listeners.forEach((listener) => listener({ matches: newMatches } as MediaQueryListEvent));
    },
  };
}

describe('ViewportService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reflects the initial matchMedia state', () => {
    stubMatchMedia(true);

    const service = TestBed.inject(ViewportService);

    expect(service.isMobile()).toBe(true);
  });

  it('updates isMobile when the media query match state changes', () => {
    const media = stubMatchMedia(false);
    const service = TestBed.inject(ViewportService);
    expect(service.isMobile()).toBe(false);

    media.emit(true);
    expect(service.isMobile()).toBe(true);

    media.emit(false);
    expect(service.isMobile()).toBe(false);
  });

  it('stops listening once destroyed', () => {
    const media = stubMatchMedia(false);
    const service = TestBed.inject(ViewportService);
    expect(media.listenerCount()).toBe(1);

    service.ngOnDestroy();
    expect(media.listenerCount()).toBe(0);
  });
});

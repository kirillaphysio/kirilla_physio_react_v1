import { TestBed } from '@angular/core/testing';
import { stubMatchMedia } from '../../testing/stub-match-media';
import { ViewportService } from './viewport.service';

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

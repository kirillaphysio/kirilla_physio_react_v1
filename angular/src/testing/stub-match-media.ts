// jsdom doesn't implement matchMedia — any spec that (directly or transitively, e.g. via
// ViewportService) exercises code calling window.matchMedia needs this stubbed first.
// See core/viewport.service.ts.
//
// Explicit import (rather than relying on the vitest/globals ambient types): this file isn't a
// *.spec.ts itself, so it falls outside tsconfig.spec.json's `include` and picks up whichever
// tsconfig happens to type-check it transitively — tsconfig.app.json doesn't have vitest globals.
import { vi } from 'vitest';

type ChangeListener = (event: MediaQueryListEvent) => void;

export type MatchMediaStub = {
  listenerCount: () => number;
  emit: (matches: boolean) => void;
};

/** Call before the code under test reads window.matchMedia (e.g. before TestBed.inject/createComponent). */
export function stubMatchMedia(initialMatches: boolean): MatchMediaStub {
  let matches = initialMatches;
  const listeners: ChangeListener[] = [];

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media: '',
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

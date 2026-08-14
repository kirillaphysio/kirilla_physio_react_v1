import { DOCUMENT, Injectable, inject } from '@angular/core';

/** Smooth in-page scrolling that lands a fixed offset (default 90px) above the target anchor. */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly doc = inject(DOCUMENT);

  scrollToAnchor(id: string, offset = 90): void {
    const win = this.doc.defaultView;
    const el = this.doc.getElementById(id);
    if (!win || !el) return;
    const top = el.getBoundingClientRect().top + win.scrollY - offset;
    win.scrollTo({ top, behavior: 'smooth' });
  }
}

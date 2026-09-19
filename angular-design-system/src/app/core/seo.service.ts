import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}

const SITE_ORIGIN = 'https://www.kirillareka.hu';
const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dcwv2corw/image/upload/v1744007836/egye%CC%81ni_kezele%CC%81s_wkmddy.jpg';

/**
 * Per-page SEO — one apply() call sets the title, description, canonical and OG tags.
 * Replaces React's inline <title>/<meta> hoisting.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  apply(data: SeoData): void {
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.ogTitle ?? data.title });
    this.meta.updateTag({
      property: 'og:description',
      content: data.ogDescription ?? data.description,
    });
    this.meta.updateTag({ property: 'og:image', content: data.ogImage ?? DEFAULT_OG_IMAGE });
    this.meta.updateTag({ property: 'og:url', content: data.ogUrl ?? SITE_ORIGIN });
    this.meta.updateTag({ property: 'og:type', content: data.ogType ?? 'website' });
    this.setCanonical(data.canonical ?? data.ogUrl ?? SITE_ORIGIN);
  }

  private setCanonical(href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}

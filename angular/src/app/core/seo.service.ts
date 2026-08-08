import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
};

// The same og:image every React page falls back to when it doesn't set its own.
const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dcwv2corw/image/upload/v1744007836/egye%CC%81ni_kezele%CC%81s_wkmddy.jpg';

/**
 * Sets the per-page SEO tags (title, canonical link, description, Open Graph) that each React
 * page previously set inline via JSX `<title>`/`<meta>` hoisting. Call `apply()` once from each
 * routed page component (wired page-by-page in step 6).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(seo: PageSeo): void {
    this.titleService.setTitle(seo.title);
    this.setCanonical(seo.canonical);

    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.ogTitle ?? seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.ogDescription ?? seo.description });
    this.meta.updateTag({ property: 'og:image', content: seo.ogImage ?? DEFAULT_OG_IMAGE });
    this.meta.updateTag({ property: 'og:url', content: seo.ogUrl ?? seo.canonical });
    this.meta.updateTag({ property: 'og:type', content: seo.ogType ?? 'website' });
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}

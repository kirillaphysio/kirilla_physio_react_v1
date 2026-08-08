import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    document = TestBed.inject(DOCUMENT);
  });

  it('sets the document title', () => {
    service.apply({ title: 'Test Title', description: 'Test description', canonical: 'https://example.com/' });

    expect(document.title).toBe('Test Title');
  });

  it('creates a canonical link tag if none exists', () => {
    service.apply({ title: 'T', description: 'D', canonical: 'https://example.com/page' });

    const link = document.querySelector('link[rel="canonical"]');
    expect(link?.getAttribute('href')).toBe('https://example.com/page');
  });

  it('reuses the existing canonical link tag on subsequent calls, rather than duplicating it', () => {
    service.apply({ title: 'T', description: 'D', canonical: 'https://example.com/a' });
    service.apply({ title: 'T2', description: 'D2', canonical: 'https://example.com/b' });

    const links = document.querySelectorAll('link[rel="canonical"]');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://example.com/b');
  });

  it('sets description and Open Graph tags, defaulting og:title/description/url/type from the page SEO', () => {
    service.apply({ title: 'Page Title', description: 'Page description', canonical: 'https://example.com/page' });

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Page description');
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Page Title');
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
      'Page description',
    );
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      'https://example.com/page',
    );
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website');
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toContain(
      'res.cloudinary.com',
    );
  });

  it('allows overriding the Open Graph tags explicitly', () => {
    service.apply({
      title: 'T',
      description: 'D',
      canonical: 'https://example.com/',
      ogTitle: 'OG Title',
      ogDescription: 'OG Description',
      ogImage: 'https://example.com/img.jpg',
      ogUrl: 'https://example.com/og',
      ogType: 'article',
    });

    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('OG Title');
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
      'OG Description',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://example.com/img.jpg',
    );
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      'https://example.com/og',
    );
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
  });
});

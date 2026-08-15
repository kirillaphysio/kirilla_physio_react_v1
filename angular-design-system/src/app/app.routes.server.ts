import { RenderMode, ServerRoute } from '@angular/ssr';
import { THERAPIES } from './data/therapy';
import { BLOG_POSTS } from './data/blog';

export const serverRoutes: ServerRoute[] = [
  {
    // Prerender one static page per therapy id so /terapia/:id deep-links resolve on gh-pages.
    path: 'terapia/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => THERAPIES.map((t) => ({ id: t.id })),
  },
  {
    // Prerender one static page per blog post id (mirrors /terapia/:id). Real page lands in
    // Session 4; the route resolves to the placeholder until then, but the paths already prerender.
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => BLOG_POSTS.map((p) => ({ id: p.id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

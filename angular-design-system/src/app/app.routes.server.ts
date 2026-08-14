import { RenderMode, ServerRoute } from '@angular/ssr';
import { THERAPIES } from './data/therapy';

export const serverRoutes: ServerRoute[] = [
  {
    // Prerender one static page per therapy id so /terapia/:id deep-links resolve on gh-pages.
    path: 'terapia/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => THERAPIES.map((t) => ({ id: t.id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

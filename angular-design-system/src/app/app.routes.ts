import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing-page').then((m) => m.LandingPage),
    pathMatch: 'full',
  },
  {
    path: 'online-programok',
    loadComponent: () =>
      import('./pages/programs/programs-page').then((m) => m.ProgramsPage),
  },
  {
    path: 'egyeni-kezelesek',
    loadComponent: () =>
      import('./pages/treatments/treatments-page').then((m) => m.TreatmentsPage),
  },
  {
    path: 'terapia/:id',
    loadComponent: () =>
      import('./pages/therapy/therapy-page').then((m) => m.TherapyPage),
  },
  {
    path: 'rolam',
    loadComponent: () =>
      import('./pages/about/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-page').then((m) => m.BlogPage),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./pages/blog/blog-post-page').then((m) => m.BlogPostPage),
  },
  {
    path: 'kapcsolat',
    loadComponent: () =>
      import('./pages/contacts/contacts-page').then((m) => m.ContactsPage),
  },
  {
    path: 'adatkezeles',
    loadComponent: () =>
      import('./pages/legal/adatkezeles-page').then((m) => m.AdatkezelesPage),
  },
  {
    path: 'feltetelek',
    loadComponent: () =>
      import('./pages/legal/feltetelek-page').then((m) => m.FeltetelekPage),
  },
  {
    path: 'cookie',
    loadComponent: () =>
      import('./pages/legal/cookie-page').then((m) => m.CookiePage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/placeholder/placeholder-page').then((m) => m.PlaceholderPage),
    data: { title: 'Az oldal nem található' },
  },
];

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
      import('./pages/placeholder/placeholder-page').then((m) => m.PlaceholderPage),
    data: { title: 'Online programok' },
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
      import('./pages/placeholder/placeholder-page').then((m) => m.PlaceholderPage),
    data: { title: 'Rólam' },
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/placeholder/placeholder-page').then((m) => m.PlaceholderPage),
    data: { title: 'Blog' },
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./pages/placeholder/placeholder-page').then((m) => m.PlaceholderPage),
    data: { title: 'Blog' },
  },
  {
    path: 'kapcsolat',
    loadComponent: () =>
      import('./pages/placeholder/placeholder-page').then((m) => m.PlaceholderPage),
    data: { title: 'Kapcsolat' },
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

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts').then((m) => m.Contacts),
  },
  {
    path: 'online-programs',
    loadComponent: () => import('./pages/programs/programs').then((m) => m.Programs),
  },
  {
    path: 'individual-treatments',
    loadComponent: () => import('./pages/treatments/treatments').then((m) => m.Treatments),
  },
  {
    path: 'therapy/:therapyId',
    loadComponent: () => import('./pages/therapy-page/therapy-page').then((m) => m.TherapyPage),
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms').then((m) => m.Terms),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy').then((m) => m.Privacy),
  },
  {
    path: 'cookie',
    loadComponent: () => import('./pages/cookie/cookie').then((m) => m.Cookie),
  },
  // No auth in this app — the only routing safeguard needed is redirecting unmatched paths home.
  // Replaces the React app's catch-all, which was dead code there (missing path="*", so it never
  // actually matched anything) — see docs/angular-migration-plan.md.
  { path: '**', redirectTo: '' },
];

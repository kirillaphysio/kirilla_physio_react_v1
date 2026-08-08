import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

// Same items/order as the React Menu.tsx. "Online programok" links off-site to a separate
// learning platform, hence `external` (a plain <a>, not routerLink).
const ITEMS: MenuItem[] = [
  { label: 'Kezdőlap', href: '/' },
  { label: 'Online programok', href: 'https://oktatas.kirillareka.hu/', external: true },
  { label: 'Egyéni kezelések', href: '/individual-treatments' },
  { label: 'Kapcsolat', href: '/contacts' },
];

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private readonly router = inject(Router);

  protected readonly items = ITEMS;
  protected readonly isOpen = signal(false);

  constructor() {
    // Close the mobile dropdown whenever the route changes, mirroring the React Menu's
    // useEffect(() => setIsOpen(false), [location]).
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.isOpen.set(false));
  }

  protected toggle(): void {
    this.isOpen.update((open) => !open);
  }
}

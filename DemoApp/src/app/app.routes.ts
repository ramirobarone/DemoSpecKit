import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./features/productos/productos.component').then(
        (m) => m.ProductosComponent
      ),
  },
  {
    path: 'acerca-de',
    loadComponent: () =>
      import('./features/acerca-de/acerca-de.component').then(
        (m) => m.AcercaDeComponent
      ),
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./list-page/list-page').then((page) => page.ListPage),
  },
];

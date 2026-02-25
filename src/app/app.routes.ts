import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '*',
        redirectTo: 'list',
    },
    {
        path: 'list',
        loadComponent: () => import('./list-page/list-page').then(page => page.ListPage),
    },
];

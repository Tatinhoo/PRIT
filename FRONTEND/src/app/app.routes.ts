import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente-list',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'cliente-create',
    loadComponent: () => import('./cliente-create/cliente-create.page').then( m => m.ClienteCreatePage)
  },
  {
    path: 'cliente-list',
    loadComponent: () => import('./cliente-list/cliente-list.page').then( m => m.ClienteListPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'servico-create',
    loadComponent: () => import('./servico-create/servico-create.page').then( m => m.ServicoCreatePage)
  },
];

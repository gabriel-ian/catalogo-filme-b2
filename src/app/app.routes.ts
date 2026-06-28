import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/home/home')
        .then(c => c.Home)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(c => c.Login)
  },

  {
    path: 'filmes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/filmes/filme-list/filme-list')
        .then(c => c.FilmeList)
  },

  {
    path: 'novo-filme',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/filmes/filme-form/filme-form')
        .then(c => c.FilmeForm)
  },

  {
    path: 'editar-filme/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/filmes/filme-form/filme-form')
        .then(c => c.FilmeForm)
  },

  {
    path: 'filmes/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/filmes/filme-detail/filme-detail')
        .then(c => c.FilmeDetail)
  },

  {
    path: 'interesse',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/interesse/interesse')
        .then(c => c.Interesse)
  },

  {
    path: 'usuarios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/usuarios/usuario-list/usuario-list')
        .then(c => c.UsuarioList)
  },

  {
    path: 'novo-usuario',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/usuarios/usuario-form/usuario-form')
        .then(c => c.UsuarioForm)
  },

  {
    path: 'editar-usuario/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/usuarios/usuario-form/usuario-form')
        .then(c => c.UsuarioForm)
  }

];
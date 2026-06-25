import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/home/home')
        .then(c => c.Home)
  },

  {
    path: 'filmes',
    loadComponent: () =>
      import('./features/filmes/filme-list/filme-list')
        .then(c => c.FilmeList)
  },

  {
    path: 'novo-filme',
    loadComponent: () =>
      import('./features/filmes/filme-form/filme-form')
        .then(c => c.FilmeForm)
  },

  {
    path: 'filmes/:id',
    loadComponent: () =>
      import('./features/filmes/filme-detail/filme-detail')
        .then(c => c.FilmeDetail)
  },

  {
    path: 'interesse',
    loadComponent: () =>
      import('./features/interesse/interesse')
        .then(c => c.Interesse)
  },
  {
    path: 'editar-filme/:id',
    loadComponent: () =>
      import('./features/filmes/filme-form/filme-form')
        .then(c => c.FilmeForm)
  }
    
];
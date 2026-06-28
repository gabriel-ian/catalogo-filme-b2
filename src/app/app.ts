import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { AuthService } from './core/services/auth';
import { Usuario } from './core/models/usuario.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('catalogo-filmes-b2');

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  usuarioLogado(): Usuario | null {
    return this.authService.usuarioLogado();
  }

  estaLogado(): boolean {
    return this.authService.estaLogado();
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
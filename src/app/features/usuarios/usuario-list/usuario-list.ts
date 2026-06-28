import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css'
})
export class UsuarioList {

  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: () => {
        alert('Erro ao carregar usuários.');
      }
    });
  }

  excluir(id: string) {
    if (confirm('Deseja excluir este usuário?')) {
      this.usuarioService.deleteUsuario(id)
        .then(() => {
          alert('Usuário excluído com sucesso!');
        })
        .catch(() => {
          alert('Erro ao excluir usuário.');
        });
    }
  }
}
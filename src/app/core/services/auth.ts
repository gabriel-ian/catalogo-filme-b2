import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly chave = 'usuario-logado';

  constructor(
    private usuarioService: UsuarioService
  ) {}

  login(
    email: string,
    senha: string
  ): Promise<boolean> {

    return new Promise((resolve) => {

      this.usuarioService
        .getUsuarios()
        .subscribe((usuarios) => {

          const usuario = usuarios.find(
            u =>
              u.email === email &&
              u.senha === senha
          );

          if (usuario) {

            localStorage.setItem(
              this.chave,
              JSON.stringify(usuario)
            );

            resolve(true);

          } else {

            resolve(false);

          }

        });

    });

  }

  logout(): void {

    localStorage.removeItem(
      this.chave
    );

  }

  usuarioLogado(): Usuario | null {

    const usuario =
      localStorage.getItem(
        this.chave
      );

    if (!usuario) {

      return null;

    }

    return JSON.parse(usuario);

  }

  estaLogado(): boolean {

    return this.usuarioLogado() !== null;

  }

}
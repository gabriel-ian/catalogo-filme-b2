import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  Database,
  getDatabase,
  ref,
  onValue,
  set,
  remove
} from 'firebase/database';

import { environment } from '../../../environment/environments';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly caminho = 'usuarios';
  private database: Database;

  constructor() {
    const app = getApps().length
      ? getApp()
      : initializeApp(environment.firebase);

    this.database = getDatabase(app);
  }

  getUsuarios(): Observable<Usuario[]> {
    const usuariosRef = ref(this.database, this.caminho);

    return new Observable<Usuario[]>((observer) => {
      const unsubscribe = onValue(
        usuariosRef,
        (snapshot) => {
          const dados = snapshot.val();
          observer.next(this.converterParaLista(dados));
        },
        (erro) => observer.error(erro)
      );

      return () => unsubscribe();
    });
  }

  getUsuarioById(id: string): Observable<Usuario | null> {
    const usuarioRef = ref(this.database, `${this.caminho}/${id}`);

    return new Observable<Usuario | null>((observer) => {
      const unsubscribe = onValue(
        usuarioRef,
        (snapshot) => {
          const dados = snapshot.val();

          if (!dados) {
            observer.next(null);
            return;
          }

          observer.next({
            ...dados,
            id
          } as Usuario);
        },
        (erro) => observer.error(erro)
      );

      return () => unsubscribe();
    });
  }

  addUsuario(usuario: Usuario): Promise<void> {
    const id = crypto.randomUUID();
    const usuarioRef = ref(this.database, `${this.caminho}/${id}`);

    return set(usuarioRef, {
      ...usuario,
      id
    });
  }

  updateUsuario(usuario: Usuario): Promise<void> {
    if (!usuario.id) {
      return Promise.reject('ID do usuário não informado.');
    }

    const usuarioRef = ref(this.database, `${this.caminho}/${usuario.id}`);

    return set(usuarioRef, usuario);
  }

  deleteUsuario(id: string): Promise<void> {
    const usuarioRef = ref(this.database, `${this.caminho}/${id}`);
    return remove(usuarioRef);
  }

  private converterParaLista(dados: unknown): Usuario[] {
    if (!dados) {
      return [];
    }

    return Object.entries(dados as Record<string, Omit<Usuario, 'id'>>)
      .map(([id, usuario]) => ({
        ...usuario,
        id
      } as Usuario));
  }
}
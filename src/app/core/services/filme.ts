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
import { Filme } from '../models/filme.model';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private readonly caminho = 'filmes';
  private database: Database;

  constructor() {
    const app = getApps().length
      ? getApp()
      : initializeApp(environment.firebase);

    this.database = getDatabase(app);
  }

  getFilmes(): Observable<Filme[]> {
    const filmesRef = ref(this.database, this.caminho);

    return new Observable<Filme[]>((observer) => {
      const unsubscribe = onValue(
        filmesRef,
        (snapshot) => {
          const dados = snapshot.val();
          observer.next(this.converterParaLista(dados));
        },
        (erro) => {
          observer.error(erro);
        }
      );

      return () => unsubscribe();
    });
  }

  getFilmeById(id: string): Observable<Filme | null> {
    const filmeRef = ref(this.database, `${this.caminho}/${id}`);

    return new Observable<Filme | null>((observer) => {
      const unsubscribe = onValue(
        filmeRef,
        (snapshot) => {
          const dados = snapshot.val();

          if (!dados) {
            observer.next(null);
            return;
          }

          observer.next({
            ...dados,
            id
          } as Filme);
        },
        (erro) => {
          observer.error(erro);
        }
      );

      return () => unsubscribe();
    });
  }

  addFilme(filme: Filme): Promise<void> {
    const id = crypto.randomUUID();
    const filmeRef = ref(this.database, `${this.caminho}/${id}`);

    return set(filmeRef, {
      ...filme,
      id
    });
  }

  updateFilme(filme: Filme): Promise<void> {
    if (!filme.id) {
      return Promise.reject('ID do filme não informado.');
    }

    const filmeRef = ref(this.database, `${this.caminho}/${filme.id}`);

    return set(filmeRef, filme);
  }

  deleteFilme(id: string): Promise<void> {
    const filmeRef = ref(this.database, `${this.caminho}/${id}`);
    return remove(filmeRef);
  }

  private converterParaLista(dados: unknown): Filme[] {
    if (!dados) {
      return [];
    }

    return Object.entries(dados as Record<string, Omit<Filme, 'id'>>)
      .map(([id, filme]) => ({
        ...filme,
        id
      } as Filme));
  }
}
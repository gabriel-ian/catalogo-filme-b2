import { Injectable } from '@angular/core';
import { Filme } from '../models/filme.model';

@Injectable({
  providedIn: 'root'
})
export class InteresseService {

  private lista: Filme[] = [];

  adicionar(filme: Filme) {
    this.lista.push(filme);
  }

  listar(): Filme[] {
    return this.lista;
  }

  remover(id: string) {
    this.lista = this.lista.filter(
      filme => filme.id !== id
    );
  }
}
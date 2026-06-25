import { Injectable } from '@angular/core';
import { Filme } from '../models/filme.model';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private filmes: Filme[] = [];

  constructor() {}

  getFilmes(): Filme[] {
    return this.filmes;
  }

  getFilmeById(id: string): Filme | undefined {
    return this.filmes.find(f => f.id === id);
  }

  addFilme(filme: Filme): void {

    filme.id = crypto.randomUUID();

    this.filmes.push(filme);
  }

  deleteFilme(id: string): void {

    this.filmes = this.filmes.filter(
      filme => filme.id !== id
    );
  }

  updateFilme(filmeAtualizado: Filme): void {

    const index = this.filmes.findIndex(
      filme => filme.id === filmeAtualizado.id
    );

    if (index !== -1) {
      this.filmes[index] = filmeAtualizado;
    }
  }

}
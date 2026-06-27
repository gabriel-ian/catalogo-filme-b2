import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FilmeService } from '../../../core/services/filme';
import { Filme } from '../../../core/models/filme.model';

import { ClassificacaoPipe } from '../../../shared/pipes/classificacao-pipe';
import { HighlightDirective } from '../../../shared/directives/highlight';

@Component({
  selector: 'app-filme-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ClassificacaoPipe,
    HighlightDirective
  ],
  templateUrl: './filme-list.html',
  styleUrl: './filme-list.css'
})
export class FilmeList {

  filmes: Filme[] = [];
  termoBusca = '';
  generoSelecionado = '';
  carregando = true;

  constructor(
    private filmeService: FilmeService
  ) {}

  ngOnInit() {
    this.filmeService.getFilmes().subscribe({
      next: (filmes) => {
        this.filmes = filmes;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro Firebase:', erro);
        alert('Erro ao carregar filmes do Firebase. Verifique as regras e o databaseURL.');
        this.carregando = false;
      }
    });
  }

  excluir(id: string) {
    if (confirm('Deseja excluir este filme?')) {
      this.filmeService.deleteFilme(id)
        .then(() => {
          alert('Filme excluído com sucesso!');
        })
        .catch((erro) => {
          console.error('Erro ao excluir:', erro);
          alert('Erro ao excluir filme.');
        });
    }
  }

  get filmesFiltrados(): Filme[] {
    return this.filmes.filter(filme => {
      const nomeValido = filme.nome
        .toLowerCase()
        .includes(this.termoBusca.toLowerCase());

      const generoValido =
        !this.generoSelecionado ||
        filme.genero === this.generoSelecionado;

      return nomeValido && generoValido;
    });
  }
}
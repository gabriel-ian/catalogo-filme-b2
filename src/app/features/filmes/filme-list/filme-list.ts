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

  constructor(
    private filmeService: FilmeService
  ) {}

  ngOnInit() {

    this.filmes =
      this.filmeService.getFilmes();

  }

  excluir(id: string) {

    if (confirm('Deseja excluir este filme?')) {

      this.filmeService.deleteFilme(id);

      this.filmes =
        this.filmeService.getFilmes();

    }

  }

  get filmesFiltrados(): Filme[] {

    return this.filmes.filter(
      filme => {

        const nomeValido =
          filme.nome
            .toLowerCase()
            .includes(
              this.termoBusca.toLowerCase()
            );

        const generoValido =
          !this.generoSelecionado ||
          filme.genero === this.generoSelecionado;

        return (
          nomeValido &&
          generoValido
        );

      }
    );

  }

}
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilmeService } from '../../../core/services/filme';
import { Filme } from '../../../core/models/filme.model';

import { ClassificacaoPipe } from '../../../shared/pipes/classificacao-pipe';

@Component({
  selector: 'app-filme-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ClassificacaoPipe
  ],
  templateUrl: './filme-detail.html',
  styleUrl: './filme-detail.css'
})
export class FilmeDetail {

  filme: Filme | null = null;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.carregando = true;
      this.filme = null;

      if (!id) {
        this.carregando = false;
        return;
      }

      this.filmeService.getFilmeById(id).subscribe({
        next: (filme) => {
          this.filme = filme;
          this.carregando = false;
        },
        error: (erro) => {
          console.error('Erro ao carregar detalhes:', erro);
          alert('Erro ao carregar detalhes do filme.');
          this.carregando = false;
        }
      });
    });
  }
}
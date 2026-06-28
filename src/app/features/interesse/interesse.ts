import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Filme } from '../../core/models/filme.model';
import { InteresseService } from '../../core/services/interesse';
import { ClassificacaoPipe } from '../../shared/pipes/classificacao-pipe';

@Component({
  selector: 'app-interesse',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ClassificacaoPipe
  ],
  templateUrl: './interesse.html',
  styleUrl: './interesse.css'
})
export class Interesse {

  filmes: Filme[] = [];

  constructor(
    private interesseService: InteresseService
  ) {}

  ngOnInit() {
    this.carregarLista();
  }

  carregarLista(): void {
    this.filmes = this.interesseService.listar();
  }

  remover(id: string): void {
    this.interesseService.remover(id);
    this.carregarLista();
  }
}
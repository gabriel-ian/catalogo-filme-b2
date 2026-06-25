import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilmeService } from '../../../core/services/filme';
import { Filme } from '../../../core/models/filme.model';

import { ClassificacaoPipe } from '../../../shared/pipes/classificacao-pipe';

@Component({
  selector: 'app-filme-detail',
  standalone: true,
  imports: [
    CommonModule,
    ClassificacaoPipe
  ],
  templateUrl: './filme-detail.html',
  styleUrl: './filme-detail.css'
})
export class FilmeDetail {

  filme?: Filme;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.filme = this.filmeService.getFilmeById(id);
    }
  }
}
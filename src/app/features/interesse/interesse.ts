import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Filme } from '../../core/models/filme.model';
import { InteresseService } from '../../core/services/interesse';

@Component({
  selector: 'app-interesse',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './interesse.html',
  styleUrl: './interesse.css'
})

export class Interesse {

  filmes: Filme[] = [];

  constructor(
    private interesseService:
      InteresseService
  ) {}

  ngOnInit() {

    this.filmes =
      this.interesseService.listar();
  }
}
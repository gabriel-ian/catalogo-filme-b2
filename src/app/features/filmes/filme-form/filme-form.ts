import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FilmeService } from '../../../core/services/filme';
import { Filme } from '../../../core/models/filme.model';

@Component({
  selector: 'app-filme-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './filme-form.html',
  styleUrl: './filme-form.css'
})

export class FilmeForm {

  filmeForm: FormGroup;

  filmeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private filmeService: FilmeService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.filmeForm = this.fb.group({

      nome: ['', [Validators.required]],

      genero: ['', Validators.required],

      duracao: ['', Validators.required],

      classificacao: ['', Validators.required],

      sinopse: ['', Validators.required],

      imagem: ['', Validators.required]

    });

  }

  ngOnInit() {

    this.filmeId =
      this.route.snapshot.paramMap.get('id');

    if(this.filmeId){

      const filme =
        this.filmeService.getFilmeById(
          this.filmeId
        );

      if(filme){

        this.filmeForm.patchValue(
          filme
        );
      }
    }
  }

  salvar() {

    if(this.filmeForm.invalid){
      return;
    }

    const filme: Filme = {

      id: this.filmeId ?? undefined,

      ...this.filmeForm.value
    };

    if(this.filmeId){

      this.filmeService.updateFilme(
        filme
      );

      alert('Filme atualizado!');
    }
    else{

      this.filmeService.addFilme(
        filme
      );

      alert('Filme cadastrado!');
    }

    this.router.navigate(['/filmes']);
  }
}
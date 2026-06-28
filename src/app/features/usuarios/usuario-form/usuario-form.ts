import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css'
})
export class UsuarioForm {

  usuarioForm: FormGroup;

  usuarioId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.usuarioForm = this.fb.group({

      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      perfil: [
        'usuario',
        Validators.required
      ]

    });

  }

  ngOnInit() {

    this.usuarioId =
      this.route.snapshot.paramMap.get('id');

    if (this.usuarioId) {

      this.usuarioService
        .getUsuarioById(this.usuarioId)
        .subscribe({

          next: (usuario) => {

            if (usuario) {

              this.usuarioForm.patchValue(usuario);

            }

          }

        });

    }

  }

  salvar() {

    if (this.usuarioForm.invalid) {

      this.usuarioForm.markAllAsTouched();

      return;

    }

    const usuario: Usuario = {

      id: this.usuarioId ?? undefined,

      ...this.usuarioForm.value

    };

    if (this.usuarioId) {

      this.usuarioService
        .updateUsuario(usuario)
        .then(() => {

          alert('Usuário atualizado com sucesso!');

          this.router.navigate(['/usuarios']);

        });

    } else {

      this.usuarioService
        .addUsuario(usuario)
        .then(() => {

          alert('Usuário cadastrado com sucesso!');

          this.router.navigate(['/usuarios']);

        });

    }

  }

}
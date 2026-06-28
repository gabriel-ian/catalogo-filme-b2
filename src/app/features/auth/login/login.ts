import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      senha: [
        '',
        Validators.required
      ]

    });

  }

  entrar() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    const { email, senha } =
      this.loginForm.value;

    this.authService
      .login(email, senha)
      .then((sucesso) => {

        if (sucesso) {

          alert('Login realizado com sucesso!');

          this.router.navigate(['/filmes']);

        } else {

          alert('E-mail ou senha inválidos.');

        }

      });

  }

}
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';

type LoginProfile = 'STUDENT' | 'OPERATOR';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly authService  = inject(AuthService);
  private readonly router       = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly selectedProfile = signal<LoginProfile>('STUDENT');

  readonly form = new FormGroup({
    identifier: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  selectProfile(profile: LoginProfile) {
    this.selectedProfile.set(profile);
  }

  submit() {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (user) => {
        this.router.navigateByUrl(this.authService.homePathForCurrentUser());
      },
      error: () => {
        this.errorMessage.set('Não foi possível entrar com os dados informados.');
        this.isSubmitting.set(false);
      },
    });
  }
}

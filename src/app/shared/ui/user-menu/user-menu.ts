import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/data-access/auth.service';

@Component({
  selector: 'app-user-menu',
  imports: [],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;

  readonly isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  userProfileLabel() {
    const roles = this.currentUser()?.roles ?? [];

    if (roles.includes('OPERATOR')) {
      return 'Operador';
    }

    if (roles.includes('CLIENT')) {
      return 'Cliente';
    }

    return 'Perfil';
  }

  userInitials() {
    const name = this.currentUser()?.name?.trim();

    if (!name) {
      return 'US';
    }

    const parts = name.split(/\s+/);

    if (parts.length === 1) {
      return parts[0].slice(0, 1).toUpperCase();
    }

    return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: () => this.router.navigateByUrl('/login'),
    });
  }
}

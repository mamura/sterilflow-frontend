import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-client-home',
  styleUrl: './client-home.css',
  templateUrl: './client-home.html',
})
export class ClientHome {
  private readonly authService  = inject(AuthService);
  private readonly router       = inject(Router);

  protected readonly currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: () => this.router.navigateByUrl('/login'),
    });
  }
}

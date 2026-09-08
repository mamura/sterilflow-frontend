import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from '../data-access/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.parseUrl(authService.homePathForCurrentUser());
  }

  return authService.refreshSession().pipe(
    map(() => router.parseUrl(authService.homePathForCurrentUser())),
    catchError(() => of(true)),
  );
};

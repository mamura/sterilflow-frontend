import { CanActivateFn, Router } from "@angular/router";
import { UserRole } from "../models/auth.models";
import { inject } from "@angular/core";
import { AuthService } from "../data-access/auth.service";
import { catchError, map, of } from "rxjs";

export function roleGuard(requiredRole: UserRole): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router      = inject(Router);

    if (authService.hasRole(requiredRole)) {
      return true;
    }

    return authService.refreshSession().pipe(
      map(() => {
        if (authService.hasRole(requiredRole)) {
          return true;
        }

        return router.parseUrl('/login');
      }),
      catchError(() => {
        authService.clearSession();
        return of(router.parseUrl('/login'));
      }),
    );
  };
}

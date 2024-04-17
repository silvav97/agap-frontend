import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { map, take } from 'rxjs';


// PublicGuard(isNotAuthenticatedGuard) - PrivateGuard(isAuthenticatedGuard)

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authStatus.pipe(
    take(1),
    map((status: AuthStatus) => {
      if (status === AuthStatus.authenticated) {
        router.navigateByUrl('/home');    // cmabio fertilizer a home
        return false;
      }
      return true;
    })
  );
};

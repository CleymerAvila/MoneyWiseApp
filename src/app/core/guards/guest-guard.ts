import { AuthService } from 'src/app/core/services/auth-service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = await authService.isAuthenticated();
  if(!isAuth){
    return true
  }
  return router.createUrlTree(['/tabs']);
};

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { Role } from '../interfaces/role.enum';

export const publicGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.authStatus() === AuthStatus.authenticated){
    if(authService.payload()?.role === Role.PATIENT){
      router.navigateByUrl("/patients/");
    }else{
      router.navigateByUrl("/appointments/");
    }

    return false;
  }

  return true;
};

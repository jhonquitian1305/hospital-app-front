import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let httpReq;

  if(!authService.getToken)
    return next(req);

  if(authService.verifyTokenExpired()){
    Swal.fire("Sesión vencida", "La sesión ya se venció, inicie sesión de nuevo", 'warning')
    router.navigateByUrl("/auth/login");
    return next(req);
  }

  httpReq = req.clone({
    headers: new HttpHeaders({
      'Authorization': `Bearer ${authService.getToken!}`,
    })
  })

  return next(httpReq);
};

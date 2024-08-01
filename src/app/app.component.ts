import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { Role } from './auth/interfaces/role.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  authStatusChangedEffect = effect(() => {
    if(this.authService.authStatus() === AuthStatus.checking) return;

    if(this.authService.authStatus() === AuthStatus.authenticated){
      if(this.authService.payload()?.role === Role.PATIENT){
        this.router.navigateByUrl("/patients/patient");
        return;
      }
      this.router.navigateByUrl("/appointments/");
      return;
    }

    if(this.authService.authStatus() === AuthStatus.notAuthenticated){
      this.router.navigateByUrl("/auth/login");
      return;
    }
  })
}

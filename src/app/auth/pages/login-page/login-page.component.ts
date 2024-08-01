import { Component, signal, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  hide = signal(true);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.minLength(4) ]],
    password: ['', [ Validators.required, Validators.minLength(4) ]]
  });

  showPassword(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
    event.preventDefault();
  }

  onLogin(){
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
    .subscribe({
      next: () => this.router.navigateByUrl('/patients/patient'),
      error: (message) => Swal.fire('Error', message[0], 'error')
    })
  }
}

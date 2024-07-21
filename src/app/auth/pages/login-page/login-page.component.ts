import { Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
  ){}


  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.minLength(4) ]],
    password: ['', [ Validators.required, Validators.minLength(4) ]]
  });

  showPassword(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

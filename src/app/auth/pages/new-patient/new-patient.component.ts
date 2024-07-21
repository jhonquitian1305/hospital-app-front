import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { PatientsService } from '../../../patients/services/patients.service';
import { Patient } from '../../../patients/interfaces/patients.interface';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.css'
})
export class NewPatientComponent {
  hide = signal(true);

  private fb = inject(FormBuilder);
  private patientsService = inject(PatientsService);
  private validatorsService = inject(ValidatorsService);
  private router = inject(Router);

  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  passwordPattern: RegExp = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  patientForm: FormGroup = this.fb.group({
    id: [''],
    fullname: ['', [ Validators.required, Validators.pattern(this.firstNameAndLastnamePattern) ]],
    dni: ['', [ Validators.required, Validators.minLength(5) ]],
    email: ['', [ Validators.required, Validators.pattern(this.emailPattern) ]],
    password: ['', [ Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern) ]],
    password2: ['',  Validators.required ],
  },{
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  })

  showPassword(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get currentPatient(): Patient {
    return this.patientForm.value;
  }

  onSubmit(){
    if(this.patientForm.invalid) return;

    const { password2, id, ...patientForm } = this.patientForm.value;
    const patient = {
      ...patientForm,
    };
    this.patientsService.createOne(patient).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: "Usuario creado",
          html: "El usuario fue creado con éxito",
          timer: 2000,
        })
        this.router.navigateByUrl('patients/patient');
      },
      error: (messages: string[]) => {
        console.log(messages);
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          html: `${messages[0]}`,
        })
      }
    });
  }

  getFieldError(field: string){
    return this.validatorsService.getFieldError(this.patientForm, field);
  }
}

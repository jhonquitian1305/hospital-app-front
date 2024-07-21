import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page.component').then(c => c.LoginPageComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/new-patient/new-patient.component').then(c => c.NewPatientComponent),
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ]
  },
  {
    path: 'appointments',
    loadComponent: () => import('./appointments/appointments.component').then(c => c.AppointmentsComponent),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./appointments/pages/list-appointments/list-appointments.component').then(c => c.ListAppointmentsComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./appointments/pages/create-appointment/create-appointment.component').then(c => c.CreateAppointmentComponent),
      },
      {
        path: '**',
        redirectTo: 'list',
      }
    ]
  },
  {
    path: 'patients',
    loadComponent: () => import('./patients/patients.component').then(c => c.PatientsComponent),
    children: [
      {
        path: 'patient',
        loadComponent: () => import('./patients/pages/patient-page/patient-page.component').then(c => c.PatientPageComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./patients/pages/info-patient/info-patient.component').then(c => c.InfoPatientComponent),
      },
      {
        path: '**',
        redirectTo: 'patient',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

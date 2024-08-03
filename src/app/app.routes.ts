import { Routes } from '@angular/router';
import { privateGuard } from './auth/guards/private.guard';
import { publicGuard } from './auth/guards/public.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
    canActivate: [publicGuard],
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
    canActivate: [privateGuard],
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
    canActivate: [privateGuard],
    children: [
      {
        path: 'patient',
        loadComponent: () => import('./patients/pages/patient-page/patient-page.component').then(c => c.PatientPageComponent),
      },
      {
        path: 'my-appointments',
        loadComponent: () => import('./patients/pages/list-my-appointments/list-my-appointments.component').then(c => c.ListMyAppointmentsComponent),
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
    path: 'doctors',
    loadComponent: () => import('./doctors/doctors.component').then(c => c.DoctorsComponent),
    canActivate: [privateGuard],
    children: [
      {
        path: 'my-appointments',
        loadComponent: () => import('./doctors/pages/list-my-appointments/list-my-appointments.component').then(c => c.ListMyAppointmentsComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

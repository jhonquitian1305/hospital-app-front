import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponsePagination } from '../../shared/interfaces/response-pagination.interface';
import { Appointment } from '../interfaces/appointments.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppointmentsService {

  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  getAll(page: number, size: number): Observable<ResponsePagination<Appointment>> {
    return this.http.get<ResponsePagination<Appointment>>(`${this.baseUrl}/appointments?offset=${page}&limit=${size}`)
  }

  createOne(appointment: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/appointments`, appointment)
    .pipe(
      catchError(err => {
        return throwError(() => err.error.message);
      })
    );
  }

  appoinmentsPatient(page: number, size: number): Observable<ResponsePagination<Appointment>> {
    return this.http.get<ResponsePagination<Appointment>>(`${this.baseUrl}/appointments/my-appointments/by-patient?offset=${page}&limit=${size}`);
  }
}

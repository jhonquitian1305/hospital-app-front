import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponsePagination } from '../../shared/interfaces/response-pagination.interface';
import { Appointment } from '../interfaces/appointments.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppointmentsService {

  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  getAll(page: number, size: number): Observable<ResponsePagination<Appointment>> {
    return this.http.get<ResponsePagination<Appointment>>(`${this.baseUrl}/appointments?offset=${page}&limit=${size}`)
  }
}

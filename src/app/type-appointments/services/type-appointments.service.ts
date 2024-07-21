import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TypeAppointment } from '../interfaces/type-appointment.interface';

@Injectable({providedIn: 'root'})
export class TypeAppointmentsService {

  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  getAll(): Observable<TypeAppointment[]> {
    return this.http.get<TypeAppointment[]>(`${this.baseUrl}/type-appointments`);
  }
}

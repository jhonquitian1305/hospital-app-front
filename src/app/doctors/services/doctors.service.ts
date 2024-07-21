import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DateInput } from '@formkit/tempo';
import { Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({providedIn: 'root'})
export class DoctorsService {
  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  getDoctorsAvailable(typeId: number, date: DateInput, startHour: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors/search/available?typeId=${typeId}&date=${date}&startHour=${startHour}`);
  }
}

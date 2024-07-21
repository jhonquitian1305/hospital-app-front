import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient } from '../interfaces/patients.interface';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PatientsService {
  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl

  createOne(patient: Patient): Observable<void> {
    console.log({ patient });
    return this.http.post<void>(`${this.baseUrl}/patients`, patient)
    .pipe(
      catchError( err => {
        return throwError(() => err.error.message);
      })
    );
  }

  getOne(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patients/${id}`);
  }
}

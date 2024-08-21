import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Schedule, StartHour } from '../interfaces/schedule.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateSchedulesDto } from '../interfaces/create-schedule.interface';

@Injectable({providedIn: 'root'})
export class SchedulesService {
  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  createSchedule(createScheduledto: CreateSchedulesDto[]): Observable<void>{
    const body = { schedulesDto: createScheduledto }

    return this.http.post<void>(`${this.baseUrl}/schedules`, body)
    .pipe(
      catchError(err => {
        return throwError(() => err.error.message);
      })
    )
  }

  getOnlySchedulesByTypeAppointmentId(typeAppointmentId: number): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.baseUrl}/schedules/only-schedules?typeId=${typeAppointmentId}`);
  }

  getHoursAllow(date: string): Observable<StartHour[]> {
    return this.http.get<StartHour[]>(`${this.baseUrl}/schedules/hours-allow?date=${date}`);
  }
}

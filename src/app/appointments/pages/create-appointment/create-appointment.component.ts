import { Component, inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { format } from '@formkit/tempo';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchedulesService } from '../../../schedules/services/schedules.service';
import { switchMap, tap } from 'rxjs';
import { Schedule } from '../../../schedules/interfaces/schedule.interface';
import { TypeAppointmentsService } from '../../../type-appointments/services/type-appointments.service';
import { TypeAppointment } from '../../../type-appointments/interfaces/type-appointment.interface';
import { DoctorsService } from '../../../doctors/services/doctors.service';
import { Doctor } from '../../../doctors/interfaces/doctor.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-GB' },
    provideNativeDateAdapter(),
  ],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent implements OnInit {

  fb = inject(FormBuilder);
  typeAppointmentsService = inject(TypeAppointmentsService);
  schedulesService = inject(SchedulesService);
  doctorsService = inject(DoctorsService);

  typeAppointments: TypeAppointment[] = [];
  schedules: Schedule[] = [];
  hours: number[] = [];
  doctors: Doctor[] = [];

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentDate = new Date().getDate();
  minDate = new Date(this.currentYear - 0, this.currentMonth, this.currentDate);

  scheduleForms = this.fb.group({
    typeAppointmentId: [0, Validators.required],
    date: ['', Validators.required],
    hour: [0, Validators.required],
    doctor: [0, Validators.required],
  })

  ngOnInit(): void {
    this.getSpecialities();
    this.getOnlySchedules();
    this.getDoctors();
  }

  getSpecialities(){
    this.typeAppointmentsService.getAll()
    .subscribe(typeAppointments => this.typeAppointments = typeAppointments);
  }

  getOnlySchedules(): void {
    this.scheduleForms.get('typeAppointmentId')!.valueChanges
    .pipe(
      tap(() => this.scheduleForms.get('date')!.setValue('')),
      tap(() => this.hours = []),
      tap(() => {
        this.doctors = [];
        this.scheduleForms.get('doctor')?.setValue(0);
      }),
      switchMap(typeAppointmentId => this.schedulesService.getOnlySchedulesByTypeAppointmentId(typeAppointmentId!))
    )
    .subscribe(schedules => {
      this.schedules = schedules;
    })
  }

  getDoctors(){
    let typeId: number | null;
    let date: string | null;
    this.scheduleForms.get('hour')?.valueChanges
    .pipe(
      tap(() => typeId = this.scheduleForms.get('typeAppointmentId')!.value),
      tap(() => date = this.scheduleForms.get('date')!.value),
      switchMap(hour => this.doctorsService.getDoctorsAvailable(typeId!, format(date!, "YYYY-MM-DD"), hour!))
    )
    .subscribe(doctors => {
      this.doctors = doctors;
      console.log(this.doctors);
    })
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    const date = event.value as Date;
    const datetime =  format(date, "short");
    this.schedulesService.getHoursAllow(format(date!, "YYYY-MM-DD"))
    .subscribe( startHour => {
      this.hours = startHour.map(hours => hours.startHour);
    })
  }

  dateFilter = (d: Date | null) => {
    const datesAllow: string[] = this.schedules.map(schedule => schedule.date);
    const dates = format(d!, "DD-MM-YYYY");
    return datesAllow.includes(dates);
  };
}

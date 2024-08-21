import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { addDay, diffDays, format } from '@formkit/tempo';
import { CreateSchedulesDto } from '../../interfaces/create-schedule.interface';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { SchedulesService } from '../../services/schedules.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-GB' },
    provideNativeDateAdapter(),
  ],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css'
})
export class CreateScheduleComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private schedulesService = inject(SchedulesService);
  private dialogRef = inject(MatDialogRef<CreateScheduleComponent>);

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentDate = new Date().getDate();
  minDate = new Date(this.currentYear - 0, this.currentMonth, this.currentDate);

  scheduleForm = this.fb.group({
    start: ['', Validators.required ],
    end: ['', Validators.required ],
    hourStart: ['', Validators.required ],
    hourEnd: ['', Validators.required ],
  }, {
    validators: [
      this.validatorsService.isMinuteZero('hourStart'),
      this.validatorsService.isMinuteZero('hourEnd'),
      this.validatorsService.isFieldOneLessThanFieldTwo('hourStart', 'hourEnd')
    ]
  })

  saveSchedule(){
    if(this.scheduleForm.invalid) return;

    const { ...range } = this.scheduleForm;

    const createScheduleDto: CreateSchedulesDto[] = [];
    let scheduleDto!: CreateSchedulesDto;

    const hourStart = Number(range.value.hourStart![0] + range.value.hourStart![1]);
    const hourEnd = Number(range.value.hourEnd![0] + range.value.hourEnd![1]);

    let day = format(this.scheduleForm.value.start!, "YYYY-MM-DD");
    const dayEnd = format(this.scheduleForm.value.end!, "YYYY-MM-DD");
    const differentDays = diffDays(dayEnd, day);
    let value = 0;

    while(value <= differentDays){
      scheduleDto = {
        date: day,
        startTime: hourStart,
        endTime: hourEnd,
      };
      createScheduleDto.push(scheduleDto);
      day = format(addDay(day, 1), "YYYY-MM-DD");
      value += 1;
    }

    this.schedulesService.createSchedule(createScheduleDto)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Horario creado',
          html: 'El horario fue creado con éxito',
          timer: 2000,
        });
        this.closeDialog();
      },
      error: (messages: string[]) => {
        Swal.fire({
          icon: 'error',
          html: `${messages}`
        })
      }
    })

  }

  getFieldError(field: string){
    return this.validatorsService.getFieldError(this.scheduleForm, field);
  }

  closeDialog(){
    this.dialogRef.close();
  }

}

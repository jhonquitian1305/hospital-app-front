import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateScheduleComponent } from '../create-schedule/create-schedule.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScheduleComplete } from '../../interfaces/schedule.interface';
import { SchedulesService } from '../../services/schedules.service';
import { addDay, DateInput, dayEnd, format, isAfter, isEqual, weekEnd, weekStart } from '@formkit/tempo';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../../auth/services/auth.service';

interface week{
  day: string,
  date: DateInput,
}

@Component({
  selector: 'app-my-schedules',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './my-schedules.component.html',
  styleUrl: './my-schedules.component.css'
})
export class MySchedulesComponent implements OnInit {
  targetChildren: number[] = [];
  schedule: ScheduleComplete[] = [];
  counter = Array(24*7).fill(0);
  count = 0;
  week: week[] = [];
  startWeek: DateInput = format(weekStart(new Date()), 'YYYY-MM-DD');
  endWeek: DateInput = format(weekEnd(new Date()), 'YYYY-MM-DD');
  selectedDate: DateInput | null = null;

  applyStyle(index: number): object {
    return this.targetChildren.includes(index+1) ? { 'background-color': 'orange', 'cursor': 'pointer' } : {};
  }

  private dialog = inject(MatDialog);
  private scheduleService = inject(SchedulesService);
  private authService = inject(AuthService);

  idDoctor = this.authService.payload()!.id

  schedules: ScheduleComplete[] = [];

  createSchedule(){
    const dialogRef = this.dialog.open(CreateScheduleComponent, {
      width: "500px",
      height: "500px",
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getSchedules(this.idDoctor, this.startWeek, this.endWeek);
    })
  }

  ngOnInit(): void {
    this.getSchedules(this.idDoctor, this.startWeek, this.endWeek);
  }

  getDate(index: number){
    console.log(index+1);
    if(this.targetChildren.indexOf(index+1) < 0) return;
    console.log(this.targetChildren.indexOf(index+1));
    console.log(Math.floor(this.targetChildren.indexOf(index+1) / 12));
    const indexDate = Math.floor(this.targetChildren.indexOf(index+1) / 12);
    console.log(this.schedule.at(indexDate));
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    const startWeek = format(weekStart(date), 'YYYY-MM-DD');
    if(isEqual(this.startWeek, startWeek)) return;
    const endWeek = format(weekEnd(date), 'YYYY-MM-DD');

    this.getSchedules(this.idDoctor, startWeek, endWeek);
  }

  getSchedules(doctorId: number, dateStart: DateInput, dateEnd: DateInput){
    const daysOfWeek = [
      'Dom',
      'Lun',
      'Mar',
      'Mie',
      'Jue',
      'Vie',
      'Sáb',
    ]

    let date = dateStart;
    let i = 0;
    this.week.splice(0, this.week.length)
    while(!isAfter(date, dateEnd)){
      this.week.push({
        day: daysOfWeek.at(i)!,
        date
      })
      date = format(addDay(date), 'YYYY-MM-DD');
      i++;
    }

    this.scheduleService.getAll(doctorId, dateStart, dateEnd)
    .subscribe(paginationSchedules => {
      this.startWeek = dateStart;
      this.endWeek = dateEnd;
      this.schedule.splice(0, this.schedule.length);
      this.targetChildren.splice(0, this.targetChildren.length)
      this.schedules = paginationSchedules.elements;
      this.schedules.forEach((schedule) => {
        this.schedule.push(schedule);
        const date = Number(format(schedule.date, 'DD'));
        const weekend = Number(format(dateEnd, 'DD'));
        this.count = schedule.endTime - schedule.startTime;
        let i = 0;
        while(i < this.count){
          this.targetChildren.push((schedule.startTime+i)*daysOfWeek.length-weekend+date);
          i++;
        }
      })
    });
  }
}

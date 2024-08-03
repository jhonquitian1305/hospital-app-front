import { Component, inject, OnInit } from '@angular/core';
import { MyAppointmentsComponent } from '../../../shared/components/my-appointments/my-appointments.component';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from '../../../appointments/interfaces/appointments.interface';
import { AppointmentsService } from '../../../appointments/services/appointments.service';
import { RequestPagination } from '../../../shared/interfaces/request-pagination.interface';

@Component({
  standalone: true,
  imports: [
    MyAppointmentsComponent,
  ],
  templateUrl: './list-my-appointments.component.html',
  styleUrl: './list-my-appointments.component.css'
})
export class ListMyAppointmentsComponent implements OnInit {

  private appointmentsService = inject(AppointmentsService);

  length: number = 0;
  page: number = 0;
  size: number = 10;
  offset: number = this.page * this.size;

  appointments: Appointment[] = [];

  dataSource!: MatTableDataSource<Appointment>;

  ngOnInit(): void {
    this.getAppointments(this.offset, this.size);
  }

  changePage(event: RequestPagination){
    this.getAppointments(event.offset, event.size);
  }

  getAppointments(offset: number, size: number){
    this.appointmentsService.appointmentsDoctor(offset, size)
    .subscribe(appointmentsPagination => {
      this.length = appointmentsPagination.totalElements;
      this.appointments = appointmentsPagination.elements;
      this.dataSource = new MatTableDataSource(this.appointments);
    })
  }
}

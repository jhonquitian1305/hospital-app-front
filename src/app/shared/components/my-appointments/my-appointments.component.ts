import { AfterContentInit, AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../../appointments/interfaces/appointments.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { Role } from '../../../auth/interfaces/role.enum';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RequestPagination } from '../../interfaces/request-pagination.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'shared-my-appointments',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit {

  @Input({ required: true })
  dataSource!: MatTableDataSource<Appointment>;

  @Input({ required: true })
  length!: number;

  @Output()
  onPage = new EventEmitter<RequestPagination>();

  page: number = 0;

  size: number = 10;
  offset: number = this.page * this.size;

  private authService = inject(AuthService);

  user = this.authService.payload()!;

  patientDisplayedColumns = [
    "schedule",
    "hour",
    "type",
    "state",
    "actions",
  ];

  doctorDisplayedColumns = this.patientDisplayedColumns;

  columnsToDisplay: string[] = [];

  ngOnInit(): void {
    if(!this.onPage || !this.onPage.observed){
      throw new Error('onPage output is required');
    }

    if(this.user.role === Role.PATIENT){
      this.patientDisplayedColumns.splice(2, 0, "doctor");
      this.columnsToDisplay = this.patientDisplayedColumns;
    }

    if(this.user.role === Role.DOCTOR){
      this.patientDisplayedColumns.splice(2, 0, "patient");
      this.columnsToDisplay = this.doctorDisplayedColumns;
    }
  }

  changePage(event: PageEvent){
    const offset = event.pageIndex * event.pageSize;
    const value = {offset, size: event.pageSize};
    this.onPage.emit(value);
  }
}

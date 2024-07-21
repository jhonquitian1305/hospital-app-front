import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../interfaces/appointments.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './list-appointments.component.html',
  styleUrl: './list-appointments.component.css'
})
export class ListAppointmentsComponent implements OnInit {

  private appointmentsService = inject(AppointmentsService);
  @ViewChild(MatSort) sort!: MatSort;
  length: number = 0;
  page: number = 0;
  size: number = 10;
  offset: number = this.page * this.size;

  appointments: Appointment[] = [];
  dataSource!: MatTableDataSource<Appointment>;
  displayedColumns: string[] = ['id', 'dni', 'fullname', 'schedule', 'hour', 'doctor', 'estado', 'actions']

  ngOnInit(): void {
    this.getAll(this.offset, this.size);
  }

  changePage(event: PageEvent){
    const offset = event.pageIndex * event.pageSize;
    this.getAll(offset, event.pageSize);
  }

  getAll(page: number, size: number){
    this.appointmentsService.getAll(page, size)
      .subscribe(
        paginationAppoinments => {
          this.length = paginationAppoinments.totalElements;
          this.appointments = paginationAppoinments.elements;
          this.dataSource = new MatTableDataSource(this.appointments);
          this.dataSource.sort = this.sort;
        }
      )
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { Patient } from '../../interfaces/patients.interface';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-patient',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './info-patient.component.html',
  styleUrl: './info-patient.component.css'
})
export class InfoPatientComponent implements OnInit {

  private patientsService = inject(PatientsService);
  private activatedRoute = inject(ActivatedRoute);

  patient?: Patient;

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.patientsService.getOne(id))
    )
    .subscribe(patient => {
      this.patient = patient;

      return;
    });
  }

}

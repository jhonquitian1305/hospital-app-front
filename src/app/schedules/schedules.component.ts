import { Component } from '@angular/core';
import { SidemenuComponent } from '../shared/sidemenu/sidemenu.component';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [
    SidemenuComponent
  ],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {

}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {

  private authService = inject(AuthService);

  public sidemenuItems = [
    { label: 'Citas', icon: 'local_hospital', url: '/appointments/list' },
    { label: 'Mis Citas', icon: 'local_hospital', url: '/doctors/my-appointments' },
    { label: 'Mis horarios', icon: 'list_alt', url: '/schedules/list' },
  ];

  onLogout(){
    this.authService.logout();
  }

}

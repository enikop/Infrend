import { Component, inject } from '@angular/core';
import { CenterListComponent } from '../center-list/center-list.component';
import { CenterAddComponent } from '../center-add/center-add.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CenterListComponent, CenterAddComponent, CommonModule],
  templateUrl: './centers.component.html',
  styleUrl: './centers.component.css'
})
export class CentersComponent {

  changeCount: number = 0;

  authService = inject(AuthService);

  increaseChangeCount() {
    this.changeCount++;
  }
}

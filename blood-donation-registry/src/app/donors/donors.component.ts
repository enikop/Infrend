import { Component, inject } from '@angular/core';
import { DonorListComponent } from '../donor-list/donor-list.component';
import { DonorFormComponent } from '../donor-form/donor-form.component';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donors',
  standalone: true,
  imports: [DonorFormComponent, DonorListComponent, CommonModule],
  templateUrl: './donors.component.html',
  styleUrl: './donors.component.css'
})
export class DonorsComponent {
  changeCount = 0;

  authService = inject(AuthService);

  increaseChangeCount() {
    this.changeCount++;
  }
}

import { Component } from '@angular/core';
import { DonorListComponent } from '../donor-list/donor-list.component';
import { DonorFormComponent } from '../donor-form/donor-form.component';

@Component({
  selector: 'app-donors',
  standalone: true,
  imports: [DonorFormComponent, DonorListComponent],
  templateUrl: './donors.component.html',
  styleUrl: './donors.component.css'
})
export class DonorsComponent {
  changeCount = 0;

  increaseChangeCount() {
    this.changeCount++;
  }
}

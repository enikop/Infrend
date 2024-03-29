import { Component } from '@angular/core';
import { DonorFormComponent } from '../donor-form/donor-form.component';
import { DonorListComponent } from '../donor-list/donor-list.component';

@Component({
  selector: 'app-donors',
  standalone: true,
  imports: [DonorFormComponent, DonorListComponent],
  templateUrl: './donors.component.html',
  styleUrl: './donors.component.css'
})
export class DonorsComponent {

}

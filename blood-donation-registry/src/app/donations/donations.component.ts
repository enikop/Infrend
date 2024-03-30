import { Component } from '@angular/core';
import { DonationFilterComponent } from '../donation-filter/donation-filter.component';
import { DonationListComponent } from '../donation-list/donation-list.component';
import { DonationDTO } from '../models/dto';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [DonationFilterComponent, DonationListComponent],
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent {
  donations: DonationDTO[] = [];
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DonationCenterDTO, DonationDTO, DonorDTO } from '../models/dto';
import { DonationService } from '../service/donation.service';
import { FormsModule } from '@angular/forms';
import { DonorService } from '../service/donor.service';
import { DonationCenterService } from '../service/donation-center.service';
import { isIntervalValid, formatDate, formatSocialSecurity } from '../helpers/helpers';
import { DonationFilterComponent } from '../donation-filter/donation-filter.component';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DonationFilterComponent],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent {

  donations: DonationDTO[] = [];

  constructor(
    private donationService: DonationService) { }


  formatDate(dateString: string) : string{
    return formatDate(dateString);
  }

  formatSocialSecurity(socialSecurity: string) : string{
    return formatSocialSecurity(socialSecurity);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DonationDTO } from "../../../models";
import { FormsModule } from '@angular/forms';
import { formatDate, formatSocialSecurity } from '../helpers/formatters';
import { DonationFilterComponent } from '../donation-filter/donation-filter.component';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DonationFilterComponent],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent {

  //Get donation list from parent
  @Input()
  donations: DonationDTO[] = [];

  formatDate(dateString: string) : string{
    return formatDate(dateString);
  }

  formatSocialSecurity(socialSecurity: string) : string{
    return formatSocialSecurity(socialSecurity);
  }
}

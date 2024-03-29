import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DonationCenterDTO, DonationDTO, DonorDTO } from '../models/dto';
import { DonationService } from '../service/donation.service';
import { FormsModule } from '@angular/forms';
import { DonorService } from '../service/donor.service';
import { DonationCenterService } from '../service/donation-center.service';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent {

  donations: DonationDTO[] = [];
  donors: DonorDTO[] = [];
  centers: DonationCenterDTO[] = [];
  selectedFilterType: string = 'all';

  chosenDonorId!: number;
  chosenCenterId!: number;
  chosenInterval = {
    startDate: '2024-01-01',
    endDate: '2024-01-01'
  }

  constructor(
    private donationService: DonationService,
    private donorService: DonorService,
    private donationCenterService: DonationCenterService) { }

  ngOnInit() {
    this.loadDonations();
    this.loadCenters();
    this.loadDonors();
  }

  loadCenters(){
    this.donationCenterService.getAll().subscribe({
      next: (center) => {
        this.centers = center;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadDonors(){
    this.donorService.getAll().subscribe({
      next: (donors) => {
        this.donors = donors;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadDonations() {
    this.donationService.getAll().subscribe({
      next: (donations) => {
        this.donations = donations;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadFilteredDonations(json: any) {
    this.donationService.getAllFiltered(json).subscribe({
      next: (donations) => {
        this.donations = donations;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter() {
    switch (this.selectedFilterType) {
      case 'all':
        this.loadDonations();
        break;
      case 'success':
        this.loadFilteredDonations({ eligible: true });
        break;
      case 'place':
        this.loadFilteredDonations({ "place.id": this.chosenCenterId });
        break;
      case 'donor':
        this.loadFilteredDonations({ "donor.id": this.chosenDonorId});
        break;
      case 'date':
        this.loadFilteredDonations(this.chosenInterval);
        break;
    }
  }
  formatSocialSecurity(socialSecurity: string) {
    const groups = socialSecurity.match(/.{1,3}/g);
    if (groups) {
      return groups.join('-');
    }
    return socialSecurity;
  }

  formatDate(dateString: string) {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const formattedDate = `${year}. ${month}. ${day}.`;

    return formattedDate;
  }
}

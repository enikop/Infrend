import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DonationCenterDTO, DonationDTO, DonorDTO } from '../models/dto';
import { DonationService } from '../service/donation.service';
import { FormsModule } from '@angular/forms';
import { DonorService } from '../service/donor.service';
import { DonationCenterService } from '../service/donation-center.service';
import { isIntervalValid, formatDate, formatSocialSecurity } from '../helpers/helpers';


@Component({
  selector: 'app-donation-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donation-filter.component.html',
  styleUrl: './donation-filter.component.css'
})
export class DonationFilterComponent {
  @Output()
  donationsChangeEvent = new EventEmitter<DonationDTO[]>();
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
      next: (centers) => {
        this.centers = centers;
        if(this.centers.length > 0){
          this.chosenCenterId = this.centers[0].id;
        }
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
        if(this.donors.length > 0){
          this.chosenDonorId = this.donors[0].id;
        }
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
        this.donationsChangeEvent.emit(this.donations);
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
        this.donationsChangeEvent.emit(this.donations);
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
        if(isIntervalValid(this.chosenInterval.startDate, this.chosenInterval.endDate)){
          this.loadFilteredDonations(this.chosenInterval);
        } else {
          alert("Hibás adatok.")
        }
        break;
    }
  }
}

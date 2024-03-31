import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DonationCenterDTO, DonationDTO, DonorDTO } from '../models/dto';
import { DonationService } from '../service/donation.service';
import { FormsModule } from '@angular/forms';
import { DonorService } from '../service/donor.service';
import { DonationCenterService } from '../service/donation-center.service';
import { isIntervalValid, formatSocialSecurity } from '../helpers/helpers';
import { ToastrService } from 'ngx-toastr';


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

  private toastr = inject(ToastrService);
  private donationService = inject(DonationService);
  private donorService = inject(DonorService);
  private donationCenterService = inject(DonationCenterService);

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
        this.toastr.error('A helyszínek betöltése sikertelen, töltse újra az oldalt!', 'Hiba', {toastClass: 'ngx-toastr toast-danger'});
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
        this.toastr.error('A véradók betöltése sikertelen, töltse újra az oldalt!', 'Hiba', {toastClass: 'ngx-toastr toast-danger'});
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
        this.toastr.error('A véradások betöltése sikertelen, töltse újra az oldalt!', 'Hiba', {toastClass: 'ngx-toastr toast-danger'});
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
        this.toastr.error('A véradások betöltése sikertelen, töltse újra az oldalt!', 'Hiba', {toastClass: 'ngx-toastr toast-danger'});
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
        this.loadFilteredDonations({ eligible: true, 'place.id': this.chosenCenterId });
        break;
      case 'donor':
        this.loadFilteredDonations({ eligible: true, 'donor.id': this.chosenDonorId});
        break;
      case 'date':
        if(isIntervalValid(this.chosenInterval.startDate, this.chosenInterval.endDate)){
          this.loadFilteredDonations({startDate: this.chosenInterval.startDate, endDate: this.chosenInterval.endDate, eligible: true});
        } else {
          this.toastr.error('Érvénytelen intervallumot adott meg.', 'Szűrés sikertelen', {toastClass: 'ngx-toastr toast-danger'});
        }
        break;
    }
  }
  formatSocialSecurity(socialSecurity: string) : string{
    return formatSocialSecurity(socialSecurity);
  }
}

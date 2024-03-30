import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BeneficiaryDTO, DonationCenterDTO, DonationDTO, DonorDTO } from '../models/dto';
import { DonorService } from '../service/donor.service';
import { DonationCenterService } from '../service/donation-center.service';
import { formatSocialSecurity } from '../helpers/helpers';
import { DonationService } from '../service/donation.service';
import { BeneficiaryService } from '../service/beneficiary.service';
import { BeneficiaryFormComponent } from '../beneficiary-form/beneficiary-form.component';

interface BoundModels {
  general: NgModel[],
  eligibleBound: NgModel[],
}

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, BeneficiaryFormComponent],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.css'
})
export class DonationFormComponent {

  canCreateNew : boolean = true;
  currentDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
  donors: DonorDTO[] = [];
  centers: DonationCenterDTO[] = [];
  beneficiaries: BeneficiaryDTO[] = [];

  newDonation: DonationDTO = this.defaultDonation();

  errorMessage = {
    date: "A mai napot vagy annál korábbi dátumot adjon meg!",
    doctor: "A doktor neve nem lehet üres.",
    reason: "Sikertelen véradás esetén kötelező.",
  }

  constructor(
    private donationService: DonationService,
    private beneficiaryService: BeneficiaryService,
    private donorService: DonorService,
    private donationCenterService: DonationCenterService) { }

  ngOnInit() {
    this.newDonation = this.defaultDonation();
    this.loadCenters();
    this.loadDonors();
    this.loadBeneficiaries();
  }

  loadCenters(){
    this.donationCenterService.getAllFilteredBy({isActive: true}).subscribe({
      next: (centers) => {
        this.centers = centers;
        if(this.centers.length > 0){
          this.newDonation.place = this.centers[0];
        } else {
          this.canCreateNew = false;
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
          this.newDonation.donor = this.donors[0];
        } else {
          this.canCreateNew = false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadBeneficiaries() {
    this.beneficiaryService.getAll().subscribe({
      next: (beneficiaries) => {
        this.beneficiaries = beneficiaries;
        if(this.beneficiaries.length > 0){
          this.newDonation.beneficiary = this.beneficiaries[0];
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  saveDonation(models: BoundModels){
    //if the basic data part is valid
    if(this.isFormValid(models.general)) {
      //if donor is not eligible
      if(!this.newDonation.eligible){
        if(this.isFormValid(models.eligibleBound)){
          //if reason is valid, directed should be false, beneficiary should be null
          this.newDonation.directed = false;
          this.newDonation.beneficiary = null;
        } else {
          //else, data cannot be saved
          alert("Mentés sikertelen, hibás adatok.");
          return;
        }
      } else {
        //if donor is eligible, reason must be null
        this.newDonation.reason = null;
        //if donation is not directed, beneficiary must be null
        if(!this.newDonation.directed){
          this.newDonation.beneficiary = null;
        } else if (this.newDonation.beneficiary == null){
          //if there is no valid beneficiary while directed is set, data cannot be saved
          alert("Mentés sikertelen, hibás adatok.");
          return;
        }
      }
      this.createDonation([...models.general, ...models.eligibleBound]);
    } else {
      alert("Mentés sikertelen, hibás adatok.");
    }
  }

  createDonation(models: NgModel[]) {
    this.donationService.create(this.newDonation).subscribe({
      next: () => {
        this.resetForm(models);
        alert("Sikeres művelet: véradás létrehozva.");
      },
      error: (err) => {
        console.log(this.newDonation);
        alert("Sikertelen művelet: véradás nem létrehozva.");
      }
    })
  }

  resetForm(models: NgModel[]){
    for( var model of models ){
      model.control.markAsUntouched();
    }
    this.newDonation = this.defaultDonation();
  }

  validateDate(dateModel: NgModel){
    if(dateModel.value == ""){
      dateModel.control.setErrors({ 'dateInvalid': true });
      return;
    }
    const selectedDate: Date = new Date(dateModel.value);
    const currentDate: Date = new Date();
    if (selectedDate > currentDate) {
      dateModel.control.setErrors({ 'dateInvalid': true });
    } else {
      dateModel.control.setErrors(null);
    }
  }

  isFormValid(models: NgModel[]): boolean {
    for(var model of models){
      if(model.invalid){
        return false;
      }
    }
    return true;
  }

  defaultDonation() : DonationDTO {
    return {
      id: -1,
      place: this.centers.length > 0 ? this.centers[0] : null,
      donor: this.donors.length > 0 ? this.donors[0] : null,
      date: formatDate(Date.now(), 'yyyy-MM-dd', 'en-US'),
      doctor: "",
      eligible: true,
      reason: null,
      directed: false,
      beneficiary:  this.beneficiaries.length > 0 ? this.beneficiaries[0] : null,
    }
  }

  formatSocialSecurity(socialSecurity: string) : string{
    return formatSocialSecurity(socialSecurity);
  }
}

import { CommonModule, formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BeneficiaryDTO, DonationCenterDTO, DonationDTO, DonorDTO } from "../../../models";
import { DonorService } from '../service/donor.service';
import { DonationCenterService } from '../service/donation-center.service';
import { formatSocialSecurity } from '../helpers/formatters';
import { donationFormValidator, maxDateValidator } from "../helpers/validators";
import { DonationService } from '../service/donation.service';
import { BeneficiaryService } from '../service/beneficiary.service';
import { BeneficiaryFormComponent } from '../beneficiary-form/beneficiary-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BeneficiaryFormComponent],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.css'
})
export class DonationFormComponent {

  private toastr = inject(ToastrService);
  private donationService = inject(DonationService);
  private beneficiaryService = inject(BeneficiaryService);
  private donorService = inject(DonorService);
  private donationCenterService = inject(DonationCenterService);
  private formBuilder = inject(FormBuilder);

  canCreateNew: boolean = true;
  currentDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
  donors: DonorDTO[] = [];
  centers: DonationCenterDTO[] = [];
  beneficiaries: BeneficiaryDTO[] = [];
  canBeDirected: boolean = true;

  private nameRegex = /^[A-ZÍÉÁÖŐÜÚÓŰa-zíéáöőüűóú ,.'-]+/;

  donationForm = this.formBuilder.group({
    id: -1,
    place: this.formBuilder.control({}, [Validators.required]),
    donor: this.formBuilder.control({}, [Validators.required]),
    date: this.formBuilder.control(this.currentDate, [Validators.required, maxDateValidator(this.currentDate)]),
    doctor: this.formBuilder.control('', [Validators.required, Validators.pattern(this.nameRegex)]),
    eligible: this.formBuilder.control(true, [Validators.required]),
    reason: this.formBuilder.control(''),
    directed: this.formBuilder.control(false, [Validators.required]),
    beneficiary: this.formBuilder.control({}),
  }, { validators: donationFormValidator });

  errorMessage = {
    date: 'A mai napot vagy annál korábbi érvényes dátumot adjon meg!',
    doctor: 'Az orvos neve nem lehet üres, tartalmazhat latin betűket, szóközt és ,.\'- karaktereket.',
    reason: 'Sikertelen véradás esetén kötelező.',
  }

  ngOnInit() {
    this.loadCenters();
    this.loadDonors();
    this.loadBeneficiaries();
  }

  loadCenters() {
    this.donationCenterService.getAllFilteredBy({ isActive: true }).subscribe({
      next: (centers) => {
        this.centers = centers;
        if (this.centers.length > 0) {
          this.donationForm.get('place')?.setValue(this.centers[0]);
        } else {
          this.canCreateNew = false;
        }
      },
      error: (err) => {
        this.toastr.error('A helyszínek betöltése sikertelen, töltse újra az oldalt!', 'Hiba', { toastClass: 'ngx-toastr toast-danger' });
      }
    });
  }

  loadDonors() {
    this.donorService.getAll().subscribe({
      next: (donors) => {
        this.donors = donors;
        if (this.donors.length > 0) {
          this.donationForm.get('donor')?.setValue(this.donors[0]);
        } else {
          this.canCreateNew = false;
        }
      },
      error: (err) => {
        this.toastr.error('A véradók betöltése sikertelen, töltse újra az oldalt!', 'Hiba', { toastClass: 'ngx-toastr toast-danger' });
      }
    });
  }

  loadBeneficiaries() {
    this.beneficiaryService.getAll().subscribe({
      next: (beneficiaries) => {
        this.beneficiaries = beneficiaries;
        if (this.beneficiaries.length > 0) {
          this.donationForm.get('beneficiary')?.setValue(this.beneficiaries[0]);
          this.donationForm.get('directed')?.enable();
          this.canBeDirected = true;
        } else {
          this.donationForm.get('directed')?.disable();
          this.canBeDirected = false;
        }
      },
      error: (err) => {
        this.toastr.error('A betegek betöltése sikertelen, töltse újra az oldalt!', 'Hiba', { toastClass: 'ngx-toastr toast-danger' });
      }
    });
  }

  save() {
    if (this.donationForm.valid) {
      const formData = this.donationForm.value as DonationDTO;
      if (!formData.eligible) {
        //If donor is not found eligible, donation cannot be directed
        formData.directed = false;
        formData.beneficiary = null;
      } else {
        //If donor is found eligible, reason is not needed
        formData.reason = null;
        if (!formData.directed) {
          //If donation is not directed, beneficiary must be null
          formData.beneficiary = null;
        }
      }
      this.createDonation(formData);
    } else {
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen mentés', { toastClass: 'ngx-toastr toast-danger' });
    }
  }

  createDonation(donation: DonationDTO) {
    this.donationService.create(donation).subscribe({
      next: () => {
        this.toastr.success('Véradás mentve.', 'Sikeres mentés', { toastClass: 'ngx-toastr toast-success' });
        this.donationForm.reset({
          place: this.centers[0],
          donor: this.donors[0],
          beneficiary: this.beneficiaries.length > 0 ? this.beneficiaries[0] : null,
          date: this.currentDate,
          eligible: true,
          directed: false
        });
      },
      error: (err) => {
        this.toastr.error('Szerverhiba.', 'Sikertelen mentés', { toastClass: 'ngx-toastr toast-danger' });
      }
    })
  }

  formatSocialSecurity(socialSecurity: string): string {
    return formatSocialSecurity(socialSecurity);
  }
}

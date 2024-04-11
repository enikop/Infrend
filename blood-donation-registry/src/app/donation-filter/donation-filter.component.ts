import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DonationCenterDTO, DonationDTO, DonorDTO } from "../../../models";
import { DonationService } from '../service/donation.service';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DonorService } from '../service/donor.service';
import { DonationCenterService } from '../service/donation-center.service';
import { formatSocialSecurity } from '../helpers/formatters';
import { isIntervalValid } from "../helpers/validators";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-donation-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './donation-filter.component.html',
  styleUrl: './donation-filter.component.css'
})
export class DonationFilterComponent {

  //To pass filtered donations to parent
  @Output()
  donationsChangeEvent = new EventEmitter<DonationDTO[]>();

  private toastr = inject(ToastrService);
  private donationService = inject(DonationService);
  private donorService = inject(DonorService);
  private donationCenterService = inject(DonationCenterService);
  private formBuilder = inject(FormBuilder);

  options = [
    {name: 'all', description: 'Mind'},
    {name: 'success', description: 'Sikeres véradások'},
    {name: 'place', description: 'Helyszín alapján (csak sikeres)'},
    {name: 'donor', description: 'Véradó alapján (csak sikeres)'},
    {name: 'interval', description: 'Intervallumra (csak sikeres)'},
  ];

  donations: DonationDTO[] = [];
  donors: DonorDTO[] = [];
  centers: DonationCenterDTO[] = [];

  filterForm = this.formBuilder.group({
    filterBy: this.formBuilder.control(this.options[0].name, [Validators.required]),
    placeId: this.formBuilder.control(0),
    donorId: this.formBuilder.control(0),
    startDate: this.formBuilder.control('2024-01-01'),
    endDate: this.formBuilder.control('2024-01-01')
  }, {validators: this.intervalValidator});

  ngOnInit() {
    this.loadFilteredDonations({});
    this.loadCenters();
    this.loadDonors();
  }

  //Get all donation centers, if there is more than 0, set select box value
  loadCenters(){
    this.donationCenterService.getAll().subscribe({
      next: (centers) => {
        this.centers = centers;
        if(this.centers.length > 0){
          this.filterForm.get('placeId')?.setValue(this.centers[0].id);
        }
      },
      error: (err) => {
        this.toastr.error('A helyszínek betöltése sikertelen, töltse újra az oldalt!', 'Hiba', {toastClass: 'ngx-toastr toast-danger'});
      }
    });
  }

  //Get all donors centers, if there is more than 0, set select box value
  loadDonors(){
    this.donorService.getAll().subscribe({
      next: (donors) => {
        this.donors = donors;
        if(this.donors.length > 0){
          this.filterForm.get('donorId')?.setValue(this.donors[0].id);
        }
      },
      error: (err) => {
        this.toastr.error('A véradók betöltése sikertelen, töltse újra az oldalt!', 'Hiba', {toastClass: 'ngx-toastr toast-danger'});
      }
    });
  }

  //Get donations with specific filters given as an object e.g. { field1: 'value1', field2: 'value2' }
  loadFilteredDonations(json: any) {
    this.donationService.getAllFiltered(json).subscribe({
      next: (donations) => {
        this.donations = donations;
        //Pass result to parent component in event
        this.donationsChangeEvent.emit(this.donations);
      },
      error: (err) => {
        this.toastr.error('A véradások betöltése sikertelen, töltse újra az oldalt!', 'Hiba', {toastClass: 'ngx-toastr toast-danger'});
      }
    });
  }

  //Call the filter method based on the filterBy value set currently
  applyFilter() {
    const filterData = this.filterForm.value;
    switch (filterData.filterBy) {
      case 'all':
        this.loadFilteredDonations({});
        break;
      case 'success':
        this.loadFilteredDonations({ eligible: true });
        break;
      case 'place':
        this.loadFilteredDonations({ eligible: true, 'place.id': filterData.placeId });
        break;
      case 'donor':
        this.loadFilteredDonations({ eligible: true, 'donor.id': filterData.donorId});
        break;
      case 'interval':
        if(this.filterForm.valid) {
          this.loadFilteredDonations({startDate: filterData.startDate, endDate: filterData.endDate, eligible: true});
        } else {
          this.toastr.error('Érvénytelen intervallumot adott meg.', 'Szűrés sikertelen', {toastClass: 'ngx-toastr toast-danger'});
        }
        break;
    }
  }

  //Validate date interval
  intervalValidator(control: AbstractControl): ValidationErrors | null {
    const filterBy = control.get('filterBy');
    const start = control.get('startDate');
    const end = control.get('endDate');
    if(filterBy && filterBy.value == 'interval' && start && end){
      //If start is not a valid date
      if(start.value == '') {
        start.setErrors({startInvalid: true});
      }
      //If end is not a valid date
      if(end.value == '') {
        end.setErrors({endInvalid: true});
      }
      //If end is sooner than start
      if(start.value != '' && end.value != '' && !isIntervalValid(start.value, end.value)){
        return { intervalInvalid: true };
      }
    }
    return null;
  }

  formatSocialSecurity(socialSecurity: string) : string{
    return formatSocialSecurity(socialSecurity);
  }
}

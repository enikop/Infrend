import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DonorDTO, GENDER_OPTIONS } from '../models/dto';
import {CommonModule, formatDate} from '@angular/common';
import { DonorService } from '../service/donor.service';
import { FormsModule, NgModel } from '@angular/forms';
import { formatSocialSecurity, isSocialSecurityValid } from '../helpers/helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donor-form.component.html',
  styleUrl: './donor-form.component.css'
})
export class DonorFormComponent {

  @Output()
  donorChangeEvent= new EventEmitter<void>();

  private toastr = inject(ToastrService);
  private donorService = inject(DonorService);

  newDonor : DonorDTO = this.defaultDonor();
  maxDate = formatDate(this.getMaxBirthDate(), 'yyyy-MM-dd', 'en-US');

  errorMessage = {
    name: 'A név nem lehet üres.',
    citizenship: 'Az állampolgárság nem lehet üres.',
    birthPlace: 'A születési hely nem lehet üres.',
    birthDate: '18 éves kor alatti személy nem vehető fel.',
    address: 'Érvényes címformátum (magyar vagy más): 1055 Budapest, Kossuth Lajos tér 1-3.',
    socialSecurity: 'A TAJ szám 9 jegyű szám, a jogszabályoknak megfelelő felépítésű (pl. 111111110, kötőjelek nélkül).',
  };

  genderOptions = GENDER_OPTIONS;

  //TODO fix form and validation
  validateDate(dateModel: NgModel){
    if(dateModel.value == ''){
      dateModel.control.setErrors({ 'dateInvalid': true });
      this.errorMessage.birthDate = 'A születési dátum nem lehet üres.';
      return;
    }
    const selectedDate: Date = new Date(dateModel.value);
    const currentDate: Date = new Date(this.maxDate);
    if (selectedDate > currentDate) {
      dateModel.control.setErrors({ 'dateInvalid': true });
      this.errorMessage.birthDate = '18 éves kor alatti személy nem vehető fel.';
    } else {
      dateModel.control.setErrors(null);
    }
  }

  validateSocialSecurity(secModel: NgModel){
    const socialSecNumber = secModel.value;
    if(isSocialSecurityValid(socialSecNumber)){
      secModel.control.setErrors(null);
    } else {
      secModel.control.setErrors({ 'socialsecurityInvalid': true });
    }
  }

  saveDonor(models: NgModel[]){
    if(this.isFormValid(models)) {
      this.donorService.create(this.newDonor).subscribe({
        next: () => {
          this.toastr.success(`Új véradó elmentve: ${this.newDonor.name} (${formatSocialSecurity(this.newDonor.socialSecurity)})`, 'Sikeres mentés');
          this.newDonor = this.defaultDonor();
          //Mark controls as untouched so that error messages don't appear instantly
          for(var model of models){
            model.control.markAsUntouched();
          }
          this.donorChangeEvent.emit();
        },
        error: (err) => {
          var message = 'Szerverhiba.';
          if(err.status == 422 ) message = 'A megadott TAJ szám már szerepel az adatbázisban.';
          this.toastr.error(message, 'Sikertelen mentés');
        }
      });
    } else {
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen mentés');
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

  defaultDonor(): DonorDTO {
    return {
      id: -1,
      name: '',
      gender: 'egyéb',
      citizenship: '',
      birthPlace: '',
      birthDate: '2000-01-01',
      address: '',
      socialSecurity: '000000000',
      donations: []

    }
  }

  getMaxBirthDate(): Date {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 18);
    return newDate;
  }

}

import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DonorDTO, Gender } from "../../../models";
import {CommonModule, formatDate} from '@angular/common';
import { DonorService } from '../service/donor.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatSocialSecurity } from '../helpers/formatters';
import { maxDateValidator, socialSecurityValidator } from "../helpers/validators";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './donor-form.component.html',
  styleUrl: './donor-form.component.css'
})
export class DonorFormComponent {

  //To notify parent about changes in donors
  @Output()
  donorChangeEvent= new EventEmitter<void>();

  private toastr = inject(ToastrService);
  private donorService = inject(DonorService);
  private formBuilder = inject(FormBuilder);

  private nameRegex = /^[A-ZÍÉÁÖŐÜÚÓŰa-zíéáöőüűóú ,.'-]+$/;
  private addressRegex = /^[0-9A-Z]+ [A-ZÍÉÁÖŐÜÚÓŰ][a-zA-ZíéáöőüűóúÍÉÁÖŐÜÚÓŰ ]+, [a-zA-Z0-9íéáöőüűóúÍÉÁÖŐÜÚÓŰ .-/,]+/; //international

  genderOptions = Object.values(Gender);
  maxDate = formatDate(this.getMaxBirthDate(), 'yyyy-MM-dd', 'en-US');

  donorForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, Validators.pattern(this.nameRegex)]),
    gender: this.formBuilder.control('egyéb', [Validators.required]),
    citizenship: this.formBuilder.control('', [Validators.required, Validators.pattern(this.nameRegex)]),
    birthPlace: this.formBuilder.control('', [Validators.required, Validators.pattern(this.nameRegex)]),
    birthDate: this.formBuilder.control('2000-01-01', [Validators.required, maxDateValidator(this.maxDate)]),
    address: this.formBuilder.control('', [Validators.required, Validators.pattern(this.addressRegex)]),
    socialSecurity: this.formBuilder.control('', [Validators.required, socialSecurityValidator()])
  });

  errorMessage = {
    name: 'A név nem lehet üres, tartalmazhat latin betűket, szóközt és ,.\'- karaktereket.',
    citizenship: 'Az állampolgárság nem lehet üres, tartalmazhat latin betűket, szóközt és ,.\'- karaktereket.',
    birthPlace: 'A születési hely nem lehet üres, tartalmazhat latin betűket, szóközt és ,.\'- karaktereket.',
    birthDate: 'A születési dátumot kötelező megadni, 18 éves kor alatti személy nem vehető fel.',
    address: 'Érvényes címformátum (magyar vagy más): 1055 Budapest, Kossuth Lajos tér 1-3.',
    socialSecurity: 'A TAJ szám 9 jegyű szám, a jogszabályoknak megfelelő felépítésű (pl. 111111110, kötőjelek nélkül).',
  };

  //Get form data and save as new donor if valid
  saveDonor() {
    if(this.donorForm.valid) {
      //Add missing members, not necessary
      const donorData = { ...this.donorForm.value, ...{ id: -1, donations:[] } } as DonorDTO;
      this.createDonor(donorData);
    } else {
      //Give the correct error message for date
      if(this.donorForm.value.birthDate == '') {
        this.errorMessage.birthDate = 'A születési dátumot kötelező megadni.';
      } else {
        this.errorMessage.birthDate = '18 éves kor alatti személy nem vehető fel.';
      }
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen mentés', {toastClass: 'ngx-toastr toast-danger'});
    }
  }

  //Create a new donor and notify parent about the change
  createDonor(donor: DonorDTO) {
    this.donorService.create(donor).subscribe({
      next: () => {
        this.toastr.success(`Új véradó elmentve: ${donor.name} (${formatSocialSecurity(donor.socialSecurity)})`,
        'Sikeres mentés', {toastClass: 'ngx-toastr toast-success'});
        this.donorForm.reset({gender: 'egyéb', birthDate: '2000-01-01'});
        this.donorChangeEvent.emit();
      },
      error: (err) => {
        var message = 'Szerverhiba.';
        //If there has been a unique constraint error
        if(err.status == 422 ) message = 'A megadott TAJ szám már szerepel az adatbázisban.';
        this.toastr.error(message, 'Sikertelen mentés', {toastClass: 'ngx-toastr toast-danger'});
      }
    });
  }

  //Calculate the maximum of birth date so that new donor is over 18 years at the moment
  getMaxBirthDate(): Date {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 18);
    return newDate;
  }

}

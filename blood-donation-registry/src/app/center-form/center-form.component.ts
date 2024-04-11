import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DonationCenterService } from '../service/donation-center.service';
import { DonationCenterDTO } from "../../../models";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-center-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './center-form.component.html',
  styleUrl: './center-form.component.css'
})
export class CenterFormComponent {

  //To signal to parent if centers are changed
  @Output()
  centerChangeEvent = new EventEmitter<void>();

  private toastr = inject(ToastrService);
  private donationCenterService = inject(DonationCenterService);
  private formBuilder = inject(FormBuilder);

  private institutionIdRegex = /^[0-9]{6}$/;
  private nameRegex = /^[0-9\wíéáöőüűóúÍÉÁÖŐÜÚÓŰ]{1}[\s\SíéáöőüűóúÍÉÁÖŐÜÚÓŰ]{3,}/;
  private addressRegex=/^[0-9]{4} [A-ZÍÉÁÖŐÜÚÓŰ][a-zA-ZíéáöőüűóúÍÉÁÖŐÜÚÓŰ ]+, [a-zA-Z0-9íéáöőüűóúÍÉÁÖŐÜÚÓŰ .-/,]+/;

  centerForm = this.formBuilder.group({
    institutionId: this.formBuilder.control('', [Validators.required, Validators.pattern(this.institutionIdRegex)]),
    name: this.formBuilder.control('', [Validators.required, Validators.pattern(this.nameRegex)]),
    address: this.formBuilder.control('', [Validators.required, Validators.pattern(this.addressRegex)]),
    isActive: this.formBuilder.control(true)
  });

  errorMessage = {
    id: 'A szervezeti azonosító hatjegyű szám.',
    name: 'Az érvényes nevek legalább 4 karakter hosszúak, és számmal vagy betűvel kezdődnek.',
    address: 'Érvényes címformátum (csak magyarországi): 1055 Budapest, Kossuth Lajos tér 1-3.'
  }

  //Save form data as new donation center
  saveCenter() {
    if(this.centerForm.valid){
      //Get form data, add missing fields (works without it too)
      const centerData = {...this.centerForm.value,...{id:-1, donations: []}} as DonationCenterDTO;
      this.createCenter(centerData);
    } else {
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen mentés', {toastClass: 'ngx-toastr toast-danger'});
    }
  }

  //Create a new donation center, notify user of server error and violation of unique constraint
  createCenter(center: DonationCenterDTO) {
    this.donationCenterService.create(center).subscribe({
      next: () => {
        this.toastr.success(`Helyszín elmentve: ${center.name} (${center.institutionId})`,
        'Sikeres mentés', {toastClass: 'ngx-toastr toast-success'});
        //Reset form and signal to parent about data change
        this.centerForm.reset({isActive: true});
        this.centerChangeEvent.emit();
      },
      error: (err) => {
        var message = 'Szerverhiba.';
        //Special case: institutionId is not unique
        if( err.status == 422 ) message = 'A megadott intézményi azonosító már szerepel az adatbázisban.';
        this.toastr.error(message, 'Sikertelen mentés', {toastClass: 'ngx-toastr toast-danger'});
      }
    });
  }
}

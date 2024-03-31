import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DonationCenterService } from '../service/donation-center.service';
import { DonationCenterDTO } from '../models/dto';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-center-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center-form.component.html',
  styleUrl: './center-form.component.css'
})
export class CenterFormComponent {

  @Output()
  centerChangeEvent = new EventEmitter<void>();

  private toastr = inject(ToastrService);
  private donationCenterService = inject(DonationCenterService);

  newCenter: DonationCenterDTO = this.defaultCenter();

  errorMessage = {
    id: 'A szervezeti azonosító hatjegyű szám.',
    name: 'Az érvényes nevek legalább 4 karakter hosszúak, és számmal vagy betűvel kezdődnek.',
    address: 'Érvényes címformátum (csak magyarországi): 1055 Budapest, Kossuth Lajos tér 1-3.'
  }


  saveCenter(models: NgModel[]) {
    if(this.isFormValid(models)){
      this.donationCenterService.create(this.newCenter).subscribe({
        next: () => {
          this.toastr.success(`Helyszín elmentve: ${this.newCenter.name} (${this.newCenter.institutionId})`, 'Sikeres mentés');
          this.newCenter = this.defaultCenter();
          //Mark controls as untouched so that error messages don't appear instantly
          for(var model of models){
            model.control.markAsUntouched();
          }
          this.centerChangeEvent.emit();
        },
        error: (err) => {
          var message = 'Szerverhiba.';
          if(err.status == 422 ) message = 'A megadott intézményi azonosító már szerepel az adatbázisban.';
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

  defaultCenter() : DonationCenterDTO {
    return {
      id: -1,
      institutionId: '',
      name: '',
      address: '',
      isActive: true,
      donations: []
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BeneficiaryDTO } from '../models/dto';
import { formatSocialSecurity, isSocialSecurityValid } from '../helpers/helpers';
import { BeneficiaryService } from '../service/beneficiary.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficiary-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiary-form.component.html',
  styleUrl: './beneficiary-form.component.css'
})
export class BeneficiaryFormComponent {

  @Output()
  beneficiaryChangeEvent = new EventEmitter<void>();

  private toastr = inject(ToastrService);
  private beneficiaryService = inject(BeneficiaryService);

  beneficiary: BeneficiaryDTO = this.defaultBeneficiary();

  errorMessage = {
    beneficiaryName: 'A név nem lehet üres.',
    beneficiarySocialSec: 'Érvénytelen formátum, helyesen: 111111110.',
  }

  saveBeneficiary(models: NgModel[]){
    if(this.isFormValid(models)){
      this.beneficiaryService.create(this.beneficiary).subscribe({
        next: () => {
          this.toastr.success(`Beteg elmentve: ${this.beneficiary.name} (${formatSocialSecurity(this.beneficiary.socialSecurity)})`, 'Sikeres mentés');
          this.resetForm(models);
          this.beneficiaryChangeEvent.emit();
        },
        error: (err) => {
          var message = 'Szerverhiba.';
          if(err.status == 422 ) message = 'A megadott TAJ szám már szerepel az adatbázisban.';
          this.toastr.error(message, 'Sikertelen mentés');
        }
      })
    } else {
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen mentés');
    }
  }

  resetForm(models: NgModel[]){
    for( var model of models ){
      model.control.markAsUntouched();
    }
    this.beneficiary = this.defaultBeneficiary();
  }

  isFormValid(models: NgModel[]): boolean {
    for(var model of models){
      if(model.invalid){
        return false;
      }
    }
    return true;
  }

  defaultBeneficiary() : BeneficiaryDTO {
    return {
      id: -1,
      name: '',
      socialSecurity: '000000000',
      donations: []
    }
  }

  validateSocialSecurity(secModel: NgModel){
    const socialSecNumber = secModel.value;
    if(isSocialSecurityValid(socialSecNumber)){
      secModel.control.setErrors(null);
    } else {
      secModel.control.setErrors({ 'socialSecurityInvalid': true });
    }
  }

  formatSocialSecurity(socialSecurity: string) : string{
    return formatSocialSecurity(socialSecurity);
  }
}

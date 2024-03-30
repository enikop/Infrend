import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BeneficiaryDTO } from '../models/dto';
import { formatSocialSecurity, isSocialSecurityValid } from '../helpers/helpers';
import { BeneficiaryService } from '../service/beneficiary.service';

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

  beneficiary: BeneficiaryDTO = this.defaultBeneficiary();

  errorMessage = {
    beneficiaryName: "A név nem lehet üres.",
    beneficiarySocialSec: "Érvénytelen formátum, helyesen: 111111110.",
  }

  constructor(private beneficiaryService: BeneficiaryService) { }

  saveBeneficiary(models: NgModel[]){
    if(this.isFormValid(models)){
      this.beneficiaryService.create(this.beneficiary).subscribe({
        next: () => {
          alert("Mentés sikeres.");
          this.resetForm(models);
          this.beneficiaryChangeEvent.emit();
        },
        error: (err) => {
          if(err.status == 422){
            alert("Duplikált tajszám, mentés sikertelen.");
          } else {
            alert("Szerverhiba, mentés sikertelen.");
          }
        }
      })
    } else {
      alert("Hibás adatok, mentés sikertelen.");
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
      name: "",
      socialSecurity: "000000000",
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

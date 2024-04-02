import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormsModule,  ReactiveFormsModule, Validators } from '@angular/forms';
import { BeneficiaryDTO } from '../models/dto';
import { formatSocialSecurity } from '../helpers/formatters';
import { socialSecurityValidator } from "../helpers/validators";
import { BeneficiaryService } from '../service/beneficiary.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficiary-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './beneficiary-form.component.html',
  styleUrl: './beneficiary-form.component.css'
})
export class BeneficiaryFormComponent {

  @Output()
  beneficiaryChangeEvent = new EventEmitter<void>();

  private toastr = inject(ToastrService);
  private beneficiaryService = inject(BeneficiaryService);
  private formBuilder = inject(FormBuilder);

  private nameRegex = /^[A-ZÍÉÁÖŐÜÚÓŰa-zíéáöőüűóú ,.'-]+$/;

  beneficiaryForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, Validators.pattern(this.nameRegex)]),
    socialSecurity: this.formBuilder.control('', [Validators.required, socialSecurityValidator()])
  });

  errorMessage = {
    name: 'A név nem lehet üres, tartalma: latin betűk, szóköz, vessző, pont, aposztróf, kötőjel.',
    socialSecurity: 'Érvénytelen formátum, helyesen például: 111111110.',
  }

  //Save beneficiary given in form data
  saveBeneficiary(){
    //If the data given conforms to the rules given in the form initialization
    if (this.beneficiaryForm.valid) {
      //Get form data and add missing fields (latter not necessary)
      const beneficiaryData = {...this.beneficiaryForm.value, ...{id: -1, donations: []}} as BeneficiaryDTO;
      this.createBeneficiary(beneficiaryData);
    } else {
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen mentés', {toastClass: 'ngx-toastr toast-danger'});
    }
  }

  //Create beneficiary in database, notify user about server error or violation of the unique constraint
  createBeneficiary(beneficiary: BeneficiaryDTO) {
    this.beneficiaryService.create(beneficiary).subscribe({
      next: () => {
        this.toastr.success(`Beteg elmentve: ${beneficiary.name} (${formatSocialSecurity(beneficiary.socialSecurity)})`,
         'Sikeres mentés', {toastClass: 'ngx-toastr toast-success'});
        //Reset form to original state and signal to parent about data change
        this.beneficiaryForm.reset();
        this.beneficiaryChangeEvent.emit();
      },
      error: (err) => {
        var message = 'Szerverhiba.';
        //Handle unique constraint violation as a special case
        if( err.status == 422 ) message = 'A megadott TAJ szám már szerepel az adatbázisban.';
        this.toastr.error(message, 'Sikertelen mentés', {toastClass: 'ngx-toastr toast-danger'});
      }
    });
  }
}

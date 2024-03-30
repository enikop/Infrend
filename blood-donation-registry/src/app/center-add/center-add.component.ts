import { Component, EventEmitter, Output } from '@angular/core';
import { DonationCenterService } from '../service/donation-center.service';
import { DonationCenterDTO } from '../models/dto';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-center-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center-add.component.html',
  styleUrl: './center-add.component.css'
})
export class CenterAddComponent {

  @Output()
  centerChangeEvent = new EventEmitter<void>();

  newCenter: DonationCenterDTO = this.defaultCenter();
  institutionIdErrorMessage: string = "A szervezeti azonosító hatjegyű szám.";
  nameErrorMessage: string = "Az érvényes nevek legalább 4 karakter hosszúak, és számmal vagy betűvel kezdődnek.";
  addressErrorMessage:string = "Érvényes címformátum (csak magyarországi): 1055 Budapest, Kossuth Lajos tér 1-3.";

  constructor(private donationCenterService: DonationCenterService){  }

  saveCenter(models: NgModel[]) {
    if(this.isFormValid(models)){
      this.donationCenterService.create(this.newCenter).subscribe({
        next: () => {
          this.newCenter = this.defaultCenter();
          //Mark controls as untouched so that error messages don't appear instantly
          for(var model of models){
            model.control.markAsUntouched();
          }
          this.centerChangeEvent.emit();
        },
        error: (err) => {
          alert("Operation unsuccessful, invalid data.");
        }
      });
    } else {
      alert("Operation unsuccessful, invalid data.");
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
      institutionId: "",
      name: "",
      address: "",
      isActive: true,
      donations: []
    }
  }
}

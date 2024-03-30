import { Component, Input, SimpleChange, inject } from '@angular/core';
import { DonationCenterService } from '../service/donation-center.service';
import { CommonModule } from '@angular/common';
import { DonationCenterDTO } from '../models/dto';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-center-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './center-list.component.html',
  styleUrl: './center-list.component.css'
})
export class CenterListComponent {

  @Input()
  changeCount !: number;

  authService = inject(AuthService);

  centers : DonationCenterDTO[] = [];

  constructor(private donationCenterService: DonationCenterService){  }

  ngOnInit(){
    this.loadCenters();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    this.loadCenters();
  }

  loadCenters(){
    this.donationCenterService.getAll().subscribe({
      next: (center) => {
        this.centers = center;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleActive(center: DonationCenterDTO){
    center.isActive = !center.isActive;
    this.donationCenterService.update(center).subscribe({
      error: () => {
        center.isActive = !center.isActive;
        alert("Hiba történt.");
      }
    });
  }
}

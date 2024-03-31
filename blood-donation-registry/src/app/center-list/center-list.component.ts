import { Component, Input, SimpleChange, inject } from '@angular/core';
import { DonationCenterService } from '../service/donation-center.service';
import { CommonModule } from '@angular/common';
import { DonationCenterDTO } from '../models/dto';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);
  private donationCenterService = inject(DonationCenterService);

  centers : DonationCenterDTO[] = [];

  ngOnInit(){
    this.loadCenters();
  }

  ngOnChanges() {
    this.loadCenters();
  }

  loadCenters(){
    this.donationCenterService.getAll().subscribe({
      next: (center) => {
        this.centers = center;
      },
      error: (err) => {
        this.toastr.error('A helyszínek betöltése sikertelen, töltse újra az oldalt!', 'Hiba');
      }
    });
  }

  toggleActive(center: DonationCenterDTO){
    center.isActive = !center.isActive;
    this.donationCenterService.update(center).subscribe({
      error: () => {
        center.isActive = !center.isActive;
        this.toastr.error('Nem sikerült az aktivitás módosítása (szerverhiba).', 'Hiba');
      }
    });
  }
}

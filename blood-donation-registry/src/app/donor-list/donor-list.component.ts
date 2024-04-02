import { Component, Input, SimpleChange, inject } from '@angular/core';
import { DonorService } from '../service/donor.service';
import { DonorDTO } from '../models';
import { CommonModule } from '@angular/common';
import { formatDate, formatSocialSecurity } from '../helpers/formatters';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css'
})
export class DonorListComponent {

  @Input()
  changeCount!: number;

  private toastr = inject(ToastrService);
  private donorService = inject(DonorService);

  donors : DonorDTO[] = [];


  ngOnInit(){
    this.loadDonors();
  }

  ngOnChanges() {
    this.loadDonors();
  }

  loadDonors(){
    this.donorService.getAll().subscribe({
      next: (donors) => {
        this.donors = donors;
      },
      error: (err) => {
        this.toastr.error('Véradók lekérdezése sikertelen.', 'Szerverhiba', {toastClass: 'ngx-toastr toast-danger'});
      }
    });
  }

  formatDate(dateString: string) : string{
    return formatDate(dateString);
  }

  formatSocialSecurity(socialSecurity: string) : string{
    return formatSocialSecurity(socialSecurity);
  }
}

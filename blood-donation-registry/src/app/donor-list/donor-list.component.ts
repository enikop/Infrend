import { Component } from '@angular/core';
import { DonorService } from '../service/donor.service';
import { DonorDTO } from '../models/dto';
import { CommonModule } from '@angular/common';
import { formatDate, formatSocialSecurity } from '../helpers/helpers';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css'
})
export class DonorListComponent {

  donors : DonorDTO[] = [];

  constructor(private donorService: DonorService){  }

  ngOnInit(){
    this.donorService.getChangeSubject().subscribe(() => {
      this.loadDonors();
    })
    this.loadDonors();
  }

  loadDonors(){
    this.donorService.getAll().subscribe({
      next: (donors) => {
        this.donors = donors;
      },
      error: (err) => {
        console.log(err);
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

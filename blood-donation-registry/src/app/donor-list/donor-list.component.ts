import { Component } from '@angular/core';
import { DonorService } from '../service/donor.service';
import { DonorDTO } from '../models/dto';
import { CommonModule } from '@angular/common';

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

  formatSocialSecurity(socialSecurity: string) {
    const groups = socialSecurity.match(/.{1,3}/g);
    if (groups) {
      return groups.join('-');
    }
    return socialSecurity;
  }

  formatDate(dateString: string){
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const formattedDate = `${year}. ${month}. ${day}.`;

    return formattedDate;
  }
}

import { Routes } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { DonorsComponent } from './donors/donors.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationsComponent } from './donations/donations.component';

export const routes: Routes = [
  {
    path: 'centers',
    component: CentersComponent
  },
  {
    path: 'donors',
    component: DonorsComponent
  },
  {
    path: 'donations',
    component: DonationsComponent
  },
  {
    path: 'registerDonation',
    component: DonationFormComponent
  }
];

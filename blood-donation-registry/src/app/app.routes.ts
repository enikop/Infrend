import { Routes } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { DonorsComponent } from './donors/donors.component';
import { DonationListComponent } from './donation-list/donation-list.component';
import { DonationFormComponent } from './donation-form/donation-form.component';

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
    component: DonationListComponent
  },
  {
    path: 'registerDonation',
    component: DonationFormComponent
  }
];

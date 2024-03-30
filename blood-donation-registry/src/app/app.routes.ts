import { Routes } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { DonorsComponent } from './donors/donors.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationsComponent } from './donations/donations.component';
import { LoginComponent } from './login/login.component';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: DonationsComponent
  },
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
    component: DonationFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ () => inject(AuthService).preventAuthenticatedAccess() ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ () => inject(AuthService).preventAuthenticatedAccess() ]
  }
];

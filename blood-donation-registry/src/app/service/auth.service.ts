import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'accessToken';

  router = inject(Router);

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  //Guest user cannot see editable sites
  preventGuestAccess(): boolean {
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    return isLoggedIn;
  }

  //Authenticated user cannot login, register etc
  preventAuthenticatedAccess(): boolean {
    const isLoggedIn = this.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigateByUrl('/');
    }

    return !isLoggedIn;
  }
}

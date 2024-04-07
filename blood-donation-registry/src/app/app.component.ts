import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbCollapseModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blood-donation-registry';

  //Navbar toggle bool for small screen - menu open or not
  isMenuCollapsed = true;

  //Current route for highlighting of menu item
  activeRoute: string = '';

  authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  constructor() {
    //Subscribe to router events to always be aware of current url
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.activeRoute = e.url;
      }
    });
  }

  //Menu item handler: Navigate to url and close menu (if closable)
  navigateTo(relativeUrl: string): void {
    this.router.navigateByUrl(relativeUrl);
    this.isMenuCollapsed = true;
  }

  //Logout handler
  logout() {
    this.authService.removeToken();
    //Redirect to login page
    this.router.navigateByUrl('/login');
    this.toastr.success('Várjuk vissza!', 'Sikeres kijelentkezés', {toastClass: 'ngx-toastr toast-success'});
  }
}

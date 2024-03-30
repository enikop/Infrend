import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbCollapseModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blood-donation-registry';
  isMenuCollapsed = true;
  activeRoute: string = '';
  authService = inject(AuthService);

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.activeRoute = e.url;
      }
    });
  }

  navigateTo(relativeUrl: string): void {
    this.router.navigateByUrl(relativeUrl);
    this.isMenuCollapsed = true;
  }

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    alert("Sikeresen kijelentkezett");
  }
}

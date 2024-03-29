import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbCollapseModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blood-donation-registry';
  isMenuCollapsed = true;
  activeRoute: string = '';

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
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgbCollapseModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blood-donation-registry';

  //Navbar toggle bool for small screen - menu open or not
  isMenuCollapsed = true;

  authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  //For highlighting menu item
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  //Check if given route is active
  isActiveRoute(route: string): boolean {
    if(this.activatedRoute.snapshot.firstChild?.url.length == 0){
      if(route == '') return true;
      else return false;
    }
    if(this.activatedRoute.snapshot.firstChild &&
    this.activatedRoute.snapshot.firstChild.url[0].toString() == route) {
      return true;
    }
    return false;
  }

  //Logout handler
  logout() {
    this.authService.removeToken();
    //Redirect to login page
    this.router.navigateByUrl('/login');
    this.toastr.success('Várjuk vissza!', 'Sikeres kijelentkezés', {toastClass: 'ngx-toastr toast-success'});
  }
}

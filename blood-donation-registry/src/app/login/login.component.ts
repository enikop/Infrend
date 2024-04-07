import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginDTO } from '../models/dto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,  ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.formBuilder.group({
    email: this.formBuilder.control(''),
    password: this.formBuilder.control('')
  });

  //Read form data and attempt login
  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.userService.login(loginData).subscribe({
      next: (response) => {
        //Store token
        this.authService.setToken(response.accessToken);
        //Go to root path (login will be unavailable)
        this.router.navigateByUrl('/');
        this.toastr.success('Most már végezhet módosítási műveletet is.', 'Sikeres bejelentkezés', {toastClass: 'ngx-toastr toast-success'});
      },
      error: (err) => {
        this.toastr.error('Hibás e-mail cím vagy jelszó.', 'Sikertelen bejelentkezés', {toastClass: 'ngx-toastr toast-danger'});
        this.loginForm.reset();
      }
    });
  }
}

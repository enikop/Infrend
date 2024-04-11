import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { UserDTO } from "../../../models";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  private passwordPattern = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  registerForm = this.formBuilder.group({
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required, Validators.pattern(this.passwordPattern)])
  });

  errorMessage = {
    name: 'A név mezők kitöltése kötelező.',
    email: 'Érvénytelen e-mail címet adott meg.',
    password: 'A jelszó legalább 8 karakter hosszú, kis-, nagybetűt és számot tartalmaz.',
  }

  //Attempt to save new user
  saveUser(registerData: UserDTO) {
    this.userService.create(registerData).subscribe({
      next: () => {
        this.toastr.success('Most már bejelentkezhet.', 'Sikeres regisztráció', { toastClass: 'ngx-toastr toast-success' });
        //Redirect to login page
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        var message = 'Szerverhiba';
        //If unique constraint is violated
        if (err.status == 422) message = 'Ez az e-mail cím már használatban van.';
        this.toastr.error(message, 'Sikertelen regisztráció', { toastClass: 'ngx-toastr toast-danger' });
      }
    });
  }

  //Get form data and initiate registration if valid
  register() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value as UserDTO;
      this.saveUser(registerData);
    } else {
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen regisztráció', { toastClass: 'ngx-toastr toast-danger' });
    }
  }
}

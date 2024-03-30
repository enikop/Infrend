import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { UserDTO } from '../models/dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private passwordPattern = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  registerForm = this.formBuilder.group({
    firstName: this.formBuilder.control(''),
    lastName: this.formBuilder.control(''),
    email: this.formBuilder.control('', [Validators.email]),
    password: this.formBuilder.control('', [Validators.pattern(this.passwordPattern)])
  });

  errorMessage = {
    name: 'A név mezők kitöltése kötelező.',
    email: 'Érvénytelen e-mail címet adott meg.',
    password: 'A jelszó legalább 8 karakter hosszú, kis-, nagybetűt és számot tartalmaz.',
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

    saveUser(registerData: UserDTO){
      this.userService.create(registerData).subscribe({
        next: () => {
          alert("Sikeres regisztráció.");
          this.registerForm.reset();
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err);
          alert('Hiba');
        }
      });
    }

  register() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value as UserDTO;
      this.saveUser(registerData);
    } else {
      alert('Érvénytelen adatok, sikertelen regisztráció.');
    }
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('',),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    location: new FormControl('', [Validators.required]),
    subLocation: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }
  isLoggedIn: boolean = false;

  async onRegister() {

    (this.authService.registerUser(this.registerForm.value))
      .subscribe({
        next: async (res: { accessToken: any; }) => {
          this.authService.login();
          this.router.navigate(['/homepage']);
          window.location.href = '/homepage';

        },
        error: (err: { error: string; status: number; }) => {
          if (err.status === 409) { // assuming 409 is the error code for "User already exists"
            this.snackBar.open('User already exists', 'Close', {
              duration: 5000
            });
          } else {
            this.snackBar.open(`Error: ${err.status}`, 'Close', {
              duration: 5000
            });
          }
        }
    });
  }

}

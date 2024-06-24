import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) { }

  async onRegister() {
  
      (this.authService.registerUser(this.registerForm.value))
        .subscribe({
          next: async (res: { accessToken: any; }) => {
  
          },
          error: (err: { status: string; }) => {
            //this.snackBar.open("Login Error! Error Code " + err.status, "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
          }
        });
  
    }

}

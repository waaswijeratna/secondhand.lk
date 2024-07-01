import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { ApiPathsService } from '../../services/apipaths/api-paths.service';


@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrl: './forgotPassword.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted: any;
  f: any;
  message: any;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar, private http: HttpClient,     private route: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;

      axios.post('http://localhost:3000/forgotPassword', { email })
        .then(response => {
          console.log('Password reset email sent', response);
          this.snackBar.open('Password reset email sent successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-success']
          });
          this.route.navigate(['/login']);
        })
        .catch(error => {
          let errorMessage = 'Error sending password reset email. Please try again later.';
          if (error.response && error.response.data) {
            errorMessage = error.response.data.error || errorMessage;
          }
          console.error('Error sending password reset email', error);
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-error']
          });
        });
    } else {
      this.snackBar.open('Please enter a valid email address.', 'Close', {
        duration: 3000,
        panelClass: ['snack-bar-warning']
      });
    }
  }
}

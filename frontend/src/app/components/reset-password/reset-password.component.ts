import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { ApiPathsService } from '../../services/apipaths/api-paths.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  token!: string | null;
  resetPasswordForm!: FormGroup;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordsMatch
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('Token in ngOnInit:', this.token); 
  }

  passwordsMatch(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submitForm() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;

      axios.post(`${ApiPathsService.resetPassword.replace(':token', this.token as string)}`, { password: newPassword })  // Changed to "password"
        .then(response => {
          console.log('Password update response:', response);
          this.snackBar.open('Password updated successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-success']
          });
          localStorage.removeItem('email'); // Consider if this is necessary
          this.router.navigate(['/']);
        })
        .catch(error => {
          let errorMessage = 'Error updating password. Please try again later.';
          if (error.response && error.response.data) {
            errorMessage = error.response.data.error || errorMessage;
          }
          console.error('Password update error:', error);
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-error']
          });
        });
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snack-bar-warning']
      });
    }
  }
}

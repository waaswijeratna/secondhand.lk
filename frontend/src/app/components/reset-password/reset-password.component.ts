import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  
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

  token!: string | null;
  resetPasswordForm!: FormGroup; // Initialize in ngOnInit
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('Token in ngOnInit:', this.token); // added console log
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordsMatch
    });
  }
  
  submitForm() {
    if (this.resetPasswordForm && this.resetPasswordForm.valid) {
      console.log('Token in submitForm:', this.token); // added console log
      // const email = localStorage.getItem('email');
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;

      axios.post('http://localhost:3000/reset-password', { token: this.token, newPassword })
        .then(response => {
          this.snackBar.open('Password updated successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-success']
          });
          localStorage.removeItem('email');
          this.router.navigate(['/']);
        })
        .catch(error => {
          let errorMessage = 'Error updating password. Please try again later.';
          if (error.response && error.response.data) {
            errorMessage = error.response.data;
          }
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

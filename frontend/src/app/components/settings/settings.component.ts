import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'] // Note the plural 'styleUrls'
})

export class SettingsComponent implements OnInit{

  newPassword: string = '';
  confirmPassword: string = '';
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  userId: string | null;
  //    this.userId = this.authService.getUserId();

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    // Check if userId is set in localStorage
    this.userId = this.authService.getUserId();
    // console.log('Retrieved userId from localStorage:', this.userId);

    if (!this.userId) {
      console.log('User ID not found in localStorage');
    }
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    // console.log('Retrieved userId in ngOnInit:', this.userId);
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  async changePassword() {
    console.log('Current userId:', this.userId);
    console.log('New Password:', this.newPassword);
    console.log('Confirm Password:', this.confirmPassword);
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (!this.userId) {
      this.snackBar.open('Invalid user ID.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/passwordUpdate/${this.userId}`, {
        userId: this.userId,
        password: this.newPassword
      });
      console.log('Password updated successfully');
      this.snackBar.open('Password changed successfully.', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      localStorage.removeItem('userId');
      // this.router.navigate(['/']);
    } catch (error) {
      console.error('Failed to change password:', error);
      this.snackBar.open('Failed to change password. Please try again.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}




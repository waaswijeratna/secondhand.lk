import { Component, OnInit } from '@angular/core';
import { ApiPathsService } from '../../services/apipaths/api-paths.service';
import axios from 'axios';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface userData {
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  subLocation: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userData: userData = {} as userData;
  userId: string | null = null;
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    if (!this.userId) {
      console.log('User ID not found in localStorage');
      this.router.navigate(['/login']); // redirect to login if userId is not found
      return;
    }

    const userEmail = this.auth.getEmail();
    if (userEmail) {
      this.getProfile({ email: userEmail });
    }
  }

  logout(): void {
    console.log("Logout");
    this.auth.signOut();
    this.router.navigate(['/homepage']);
    window.location.href = '/homepage';
  }

  async getProfile(userData: any): Promise<void> {
    try {
      const response = await axios.post(ApiPathsService.getProfile, userData);
      this.userData = response.data;
      console.log(this.userData);
    } catch (error) {
      console.log("Error Occured: " + error);
    }
  }

  async updateProfile(): Promise<void> {
    if (this.userId) {
      try {
        const response = await axios.put(`${ApiPathsService.updateProfile}/${this.userId}`, this.userData);
        this.userData = response.data;
        console.log(this.userData);
      } catch (error) {
        console.log("Error Occured: " + error);
      }
    } else {
      console.log("User ID is not available");
    }
  }

  async changePassword(): Promise<void> {
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

  update(): void {
    this.updateProfile();
  }

  getUserDetails(): void {
    const user = {
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      subLocation: ''
    };

    this.userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      subLocation: user.subLocation
    };
  }
}


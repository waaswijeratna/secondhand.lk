import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../app-services/localStorage';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  myAccountForm: FormGroup;
  userId: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private LocalStorageService:LocalStorageService) {
    this.myAccountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: [''],
      sublocation: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // this.userId = 65; // Or dynamically retrieve the user ID as needed
    this.userId = Number(this.LocalStorageService.getItem('userId'));
    this.loadUserData();
  }

  loadUserData(): void {
    this.http.post<any>('http://localhost:3000/api/userData', { userId: this.userId })
      .subscribe(
        (data) => {
          if (data && data[0] && data[0].length > 0) {
            const user = data[0][0];
            this.myAccountForm.patchValue({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              location: user.location || '',
              sublocation: user.subLocation || '',
              email: user.email || ''
            });
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
                    // Display the snackbar message
                    this.snackBar.open('Failed to update user data', 'OK', {
                      duration: 7000,
                      verticalPosition: 'top',
                      panelClass:['customSnackbar2'] 
                    });
        }
      );
  }

  onSubmit(): void {
    if (this.myAccountForm.valid) {
      this.http.put('http://localhost:3000/api/updateUserData', { userId: this.userId, ...this.myAccountForm.value })
        .subscribe(
          (response) => {
            console.log('User data updated', response);
            // Display the snackbar message
            const snackBarRef = this.snackBar.open('User data updated successfully', 'OK', {
              duration: 7000,
              verticalPosition: 'top',
              panelClass: ['customSnackbar1']
            });
          },
          (error) => {
            console.error('Error updating user data:', error);
          }
        );
    }
  }
}

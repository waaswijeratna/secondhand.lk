import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent {
  ratings: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
    // Initialize the form with validators
    this.ratings = this.fb.group({
      rating: ['', Validators.required], // Include rating_count in the form
      review: ['', Validators.required]
    });

    console.log("works");


  }


  submitForm() {
    if (this.ratings.valid) {
      const formValue = this.ratings.value;
      console.log("Form values:", formValue);
      console.log("submitted");

      this.http.post<any>('http://localhost:3000/api/ratingDetails', formValue).subscribe(
        (response) => {
            //display snackbar
            console.log('Backend response:', response);
            const snackBarRef = this.snackBar.open('report submitted successfully', 'OK',{
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['customSnackbar1']
          });
          // Subscribe to the afterDismissed() Observable of the snackbar reference
          snackBarRef.afterDismissed().subscribe(() => {
            // Reload the browser after the snackbar is dismissed
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error sending form data:', error);
           // Display the snackbar message
           this.snackBar.open('error happened', 'OK', {
            duration: 7000,
            verticalPosition: 'top',
            panelClass:['customSnackbar2'] 
          });

        }
      );
    }
  }
}

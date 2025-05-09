import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  ratings: FormGroup;
  ad_Id: any;
  userId:any;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    // Initialize the form with validators
    this.ratings = this.fb.group({
      rating: ['', Validators.required], // Include rating_count in the form
      review: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ad_Id = +params['id'];
      }
    });
  }

  submitForm() {
    if (this.ratings.valid) {
      this.userId = Number(localStorage.getItem("userId"));
      console.log("check", this.userId);
      const formValue = this.ratings.value;
      const payload = { ...formValue, ad_id: this.ad_Id, userId:this.userId }; // Add adId to the form value
      console.log("Form values:", payload);
      console.log("submitted");

      this.http.post<any>('http://localhost:3000/api/ratingDetails', payload).subscribe(
        (response) => {
          // Display snackbar
          console.log('Backend response:', response);
          const snackBarRef = this.snackBar.open('Report submitted successfully', 'OK', {
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
          this.snackBar.open('Error happened', 'OK', {
            duration: 7000,
            verticalPosition: 'top',
            panelClass: ['customSnackbar2']
          });
        }
      );
    }
  }
}

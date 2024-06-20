import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  report: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackbar: MatSnackBar) {
    // Initialize the form with validators
    this.report = this.fb.group({
      reason: ['', Validators.required],
      reportReview: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.report.valid) {
      const formValue = this.report.value;
      console.log("Form values:", formValue);
      console.log("submitted");

      // Send form data to 'reportingDetails' endpoint
      this.http.post<any>('http://localhost:3000/api/reportingDetails', formValue).subscribe(
        (response) => {
          //display snackbar
          console.log('Backend response:', response);
          const snackBarRef = this.snackbar.open('report submitted successfully', 'OK',{
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
          this.snackbar.open('error happened', 'OK', {
            duration: 7000,
            verticalPosition: 'top',
            panelClass:['customSnackbar2'] 
          });

        }
      );
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.css'
})
export class ReportingComponent implements OnInit{
  
  report: FormGroup;
  ad_Id:any;
  userId:any;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    // Initialize the form with validators
    this.report = this.fb.group({
      reason: ['', Validators.required],
      reportReview: ['', Validators.required]
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
    if (this.report.valid) {
      this.userId = Number(localStorage.getItem("userId"));
      console.log("check", this.userId);
      const formValue = this.report.value;
      const payload = { ...formValue, ad_id: this.ad_Id, userId: this.userId }; // Add adId to the form value
      console.log("Form values:", payload);
      console.log("submitted");

      // Send form data to 'reportingDetails' endpoint
      this.http.post<any>('http://localhost:3000/api/reportingDetails', payload).subscribe(
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

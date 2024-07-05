import { Component,OnInit  , ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit{ 
  
  isUpdate = false;
  adId!: number;
  chatbotVisible = false;
  userId:any;


  // Stepper linear mode
  isLinear = true;
  loading :boolean =false;

  // Stepper restrict next step
  step1Completed: boolean = true;
  step2Completed: boolean = true;
  step3Completed: boolean = true;
  step4Completed: boolean = false;

  //selected category and subcategory by user
  selectedSubcategoryName!: string;
  selectedCategoryName!: string;
  

  //input of child components to submit their forms back
  submitForms: boolean = false;

  // Initialize FormData object to hold combined form data
  allForms: FormData = new FormData();

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef ) {}

  ngOnInit() {
    // Retrieve route parameters
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.adId = +params['id']; // Convert id to number
        this.isUpdate = true; // Assuming having an id means it's an update
        this.step1Completed = true;
        this.step2Completed = true;
        this.step3Completed = true;
        this.step4Completed = true;
        this.allForms.append('ad_id', this.adId.toString());


        console.log('Advertisement Id:', this.adId, this.isUpdate);
      } else {
        this.isUpdate = false; // No id means it's a new advertisement
        console.log('No Advertisement Id provided.');
      }
      this.cdr.detectChanges();

    });
  }

  toggleChatbot() {
    this.chatbotVisible = !this.chatbotVisible;
  }

  // Handlers for form validity changes
  handleValidityChanged1(event: boolean) {
    this.step1Completed = event;
  }

  handleValidityChanged2(event: boolean) {
    this.step2Completed = event;
  }

  handleValidityChanged3(event: boolean) {
    this.step3Completed = event;
  }

  handleValidityChanged4(event: boolean) {
    this.step4Completed = event;
    this.checkSubmitForms();
  }

  // Transmit selected subcategory
  transmitSubcategory(subcategoryName:string){
    this.selectedSubcategoryName = subcategoryName;    
  }
  // Transmit selected subcategory
  transmitCategory(categoryName:string){
    this.selectedCategoryName = categoryName;  
  }

  // Append form data for form 1
  form1test(formData: FormData){
    formData.forEach((value: FormDataEntryValue, key: string) => {
      this.allForms.append(key, value);
    });
  }


  // Check if all steps are completed
  checkSubmitForms() {
    // Logic to determine when to submit forms
    this.submitForms = this.areAllStepsCompleted();
    if (this.submitForms) {
      this.submitAllForms();
    }
  }

  // Method to check if all steps are completed
  areAllStepsCompleted(): boolean {
    return this.step1Completed && this.step2Completed && this.step3Completed && this.step4Completed;
  }
  
  // Show popup message and submit form
  submitAllForms(): void {
    this.userId = Number(localStorage.getItem("userId"));
    console.log("check", this.userId);
    this.allForms.append('userId', this.userId.toString());  

    let urlApi="http://localhost:3000/api/generalDetails";
    // Send the HTTP request after a delay of one second
    // this.allForms.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    this.loading = true;

    setTimeout(() => {

      this.allForms.forEach((value: FormDataEntryValue, key: string) => {
        console.log(`${key}: ${value}`);
      });   

    
      const successfullMsg = 'Advertisement submitted successfully.We will inform you once it is published.';
      const errorMsg = 'There was a problem posting your ad. Please try submitting it once more.';

      this.http.post(urlApi, this.allForms).subscribe(
        response => {
          this.loading = false;
          // Display the snackbar message
          const snackBarRef = this.snackBar.open(successfullMsg, 'OK', {
            duration: 7000,
            verticalPosition: 'top',
            panelClass: ['customSnackbar1']
          });

          // Subscribe to the afterDismissed() Observable of the snackbar reference
          snackBarRef.afterDismissed().subscribe(() => {
            // Reload the browser after the snackbar is dismissed
            window.location.reload();
          });
          },

        error => {
          this.loading = false;
          console.error('Error submitting advertisement:', error);
          // Display the snackbar message
          this.snackBar.open(errorMsg, 'OK', {
            duration: 7000,
            verticalPosition: 'top',
            panelClass:['customSnackbar2'] 
          });
        }
      );
    }, 1000); // Delay of 1000 milliseconds (1 second)
    
  }
}

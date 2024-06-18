import { Component, SimpleChanges, OnInit } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PaymentGatewayDialogComponent } from './payment-gateway-dialog/payment-gateway-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvertisementService } from '../../app-services/app-service-getAdvertisementData';
import { promotionDetailsService } from '../../app-services/app-services-getPromotionDetails';


interface promotion_details {
  promotion_ID: string;
  days: number;
  amount: number;
}


@Component({
  selector: 'app-forum-promote-ad',
  templateUrl: './forum-promote-ad.component.html',
  styleUrls: ['./forum-promote-ad.component.css'] // Corrected styleUrls from styleUrl
})

export class ForumPromoteAdComponent implements OnInit {

  promoteAdForm!: FormGroup;
  postChecked = true;
  promoteChecked = true;
  selectedAmount1 = 10;
  selectedAmount2 = 10;
  selectedAmount3 = 10;
  clientSecret!: any; // Declare the clientSecret property
  total_amount: number = 0;
  formData = new FormData();
  selectedPromotions: any[] = [];
  message: string = ''; // Message to display
  disableOptionBumpUp = false;
  disableOptionTopAd = false;
  disableOptionUrgent = false;

  promotionDetails: promotion_details[] = [
    { promotion_ID: "B1", days: 4, amount: 10 },
    { promotion_ID: "B2", days: 7, amount: 15 },
    { promotion_ID: "B3", days: 14, amount: 20 },
    { promotion_ID: "T1", days: 4, amount: 10 },
    { promotion_ID: "T2", days: 7, amount: 15 },
    { promotion_ID: "T3", days: 14, amount: 20 },
    { promotion_ID: "U1", days: 4, amount: 10 },
    { promotion_ID: "U2", days: 7, amount: 15 },
    { promotion_ID: "U3", days: 14, amount: 20 },
  ];

  @Output() form4ValidityChanged = new EventEmitter<boolean>();
  @Output() form4: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Input() submitForms: boolean = false;
  @Input() isUpdate: boolean = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar, private advertisementService: AdvertisementService, private promotionDetailsService: promotionDetailsService) {
    // Initialize form group and form controls
    this.promoteAdForm = this.fb.group({
      free: [false],
      bumpUp: [false],
      topAd: [false],
      urgent: [false],
    });

    // Subscribe to changes in the "free" checkbox
    this.promoteAdForm.get('free')?.valueChanges.subscribe((value) => {
      if (value) {
        // If "Free" is checked, uncheck the other checkboxes
        this.resetPromotionCheckboxes();
      } else {
        this.postChecked = true;
      }
    });

    // Subscribe to changes in other checkboxes
    ['bumpUp', 'topAd', 'urgent'].forEach(controlName => {
      this.promoteAdForm.get(controlName)?.valueChanges.subscribe((value) => {
        if (value) {
          // If any other checkbox is checked, uncheck "Free"
          this.resetFreeCheckbox();
        } else {
          this.updatePromoteCheckedState();
        }
      });
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.promotionDetailsService.fetchData().subscribe(
        (data: promotion_details[]) => {
          this.promotionDetails = data;
        },
        error => {
          console.log('Error fetching promotion details:', error);
        }
      );
    }, 2000);
  }

  // Lifecycle hook for detecting changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isUpdate'] && changes['isUpdate'].currentValue) {
      this.initializeIfUpdate();
    }
    // if (changes['submitForms'] && changes['submitForms'].currentValue) {
    //   this.submitForm();
    // }
  }

  initializeIfUpdate() {
    const promotions = this.advertisementService.getForm4Data();
    let promotionName = "";

    if (promotions && promotions.length > 0) {
      this.message = 'You already subscribed for promotions,\n';

      promotions.forEach((promotion: any) => {
        const promoDetails = this.promotionDetails.find(p => p.promotion_ID === promotion.promotion_ID);

        // Disable the corresponding checkboxes
        if (promotion.promotion_ID.startsWith('B')) {
          promotionName = "BumpUp";
          this.promoteAdForm.get('bumpUp')?.disable();
          this.disableOptionBumpUp = true;
        }
        if (promotion.promotion_ID.startsWith('T')) {
          promotionName = "TopAd";
          this.promoteAdForm.get('topAd')?.disable();
          this.disableOptionTopAd = true;
        }
        if (promotion.promotion_ID.startsWith('U')) {
          promotionName = "Urgent";
          this.promoteAdForm.get('urgent')?.disable();
          this.disableOptionUrgent = true;
        }

        if (promoDetails) {
          this.message += ` ${promotionName} (expires on ${new Date(promotion.expiration_date).toLocaleDateString()})\n`;
        }
      });

      this.message += '\nChoose free and Click post to update your ad, if you want to promote further, choose promote options and continue.';
    } else {
      this.message = 'Choose free and Click post to update your ad, if you want to promote, choose promote options and continue.';
    }

    this.selectedPromotions = promotions || [];
  }


  // Method to reset all promotion checkboxes
  resetPromotionCheckboxes() {
    this.promoteAdForm.get('bumpUp')?.setValue(false);
    this.promoteAdForm.get('topAd')?.setValue(false);
    this.promoteAdForm.get('urgent')?.setValue(false);
    this.postChecked = false;
    this.promoteChecked = true;
  }

  // Method to reset the "Free" checkbox
  resetFreeCheckbox() {
    this.promoteAdForm.get('free')?.setValue(false);
    this.postChecked = true;
    this.promoteChecked = false;
  }

  // Method to update the state of "promoteChecked" based on other checkboxes
  updatePromoteCheckedState() {
    const allUnchecked = !this.promoteAdForm.get('bumpUp')?.value &&
      !this.promoteAdForm.get('topAd')?.value &&
      !this.promoteAdForm.get('urgent')?.value;

    this.promoteChecked = allUnchecked ? true : false;
  }

  // Method triggered when the post button is clicked
  onPostButtonClick() {
    // Emit true when the post button is clicked
    this.form4ValidityChanged.emit(true);
  }

  //Method triggered when the continue button is clicked.
  onContinueButtonClick() {
    this.promoteChecked = true;
    let totalAmount = 0;
    let selected_Promotions: any[] = [];

    // Find the total amount and selected promotions.
    const promotionTypes = [
      { controlName: 'bumpUp', selectedAmount: this.selectedAmount1, prefix: 'B' },
      { controlName: 'topAd', selectedAmount: this.selectedAmount2, prefix: 'T' },
      { controlName: 'urgent', selectedAmount: this.selectedAmount3, prefix: 'U' }
    ];

    promotionTypes.forEach(type => {
      if (this.promoteAdForm.get(type.controlName)?.value) {
        totalAmount += type.selectedAmount;
        let promotion = this.promotionDetails.find(p => p.amount === type.selectedAmount && p.promotion_ID.startsWith(type.prefix));
        if (promotion) {
          // Push an object with both promotion_ID and days to selected_Promotions
          selected_Promotions.push({
            promotion_ID: promotion.promotion_ID,
            days: promotion.days
          });
        }
      }
    });

    this.total_amount = totalAmount;
    this.selectedPromotions = selected_Promotions;

    console.log(this.selectedPromotions);
    console.log(this.total_amount);

    // Send the total amount in the HTTP request
    this.handleCheckout(totalAmount)
  }

  async handleCheckout(total_amount: any) {
    try {
      const response: any = await this.http.post('http://localhost:3000/api/selectedPromotions', { total_amount }).toPromise();
      this.clientSecret = response.clientSecret;
      console.log(this.clientSecret);

      const dialogRef = this.dialog.open(PaymentGatewayDialogComponent, {
        width: '800px',
        data: { clientSecret: this.clientSecret, total_amount: this.total_amount }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.promoteChecked = false;
        if (result && result.error) {
          this.handleError(result.error);
        } else if (result && result.status) {
          this.handleSuccess(result.status);
        }
      });

    } catch (error) {
      console.error('Error:', error);
    }
  }

  handleError(error: any) {
    // Display the snackbar message
    const snackBarRef = this.snackBar.open(error, 'OK', {
      duration: 7000,
      verticalPosition: 'top',
      panelClass: ['customSnackbar2']
    });
  }

  handleSuccess(status: any) {
    this.promoteChecked = true;
    // Display the snackbar message
    const snackBarRef = this.snackBar.open(status, 'OK', {
      duration: 7000,
      verticalPosition: 'top',
      panelClass: ['customSnackbar1']
    });

    // Subscribe to the afterDismissed() Observable of the snackbar reference
    snackBarRef.afterDismissed().subscribe(() => {
      this.submitForm();
    });

  }



  submitForm() {
    // Append total_amount
    this.formData.append('total_amount', this.total_amount.toString());

    // Append each selected promotion with ID and days
    this.selectedPromotions.forEach(promotion => {
      this.formData.append('selected_promotions[]', JSON.stringify({
        promotion_ID: promotion.promotion_ID,
        days: promotion.days
      }));
    });

    // Emit form4 with formData
    this.form4.emit(this.formData);
    this.form4ValidityChanged.emit(true);
  }
}

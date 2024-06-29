import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stripe, StripeCardElement, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { StripeService } from '../../../app-services/app-services-stripe';

@Component({
  selector: 'app-payment-gateway-dialog',
  templateUrl: './payment-gateway-dialog.component.html',
  styleUrls: ['./payment-gateway-dialog.component.css']
})
export class PaymentGatewayDialogComponent implements OnInit {

  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  paymentElement: StripePaymentElement | null = null;
  elements!: StripeElements;
  clientSecret: string;
  total_amount!: number;

  constructor(
    public dialogRef: MatDialogRef<PaymentGatewayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stripeService: StripeService
  ) {
    this.clientSecret = data.clientSecret;
    this.total_amount = data.total_amount;
  }

  ngOnInit() {
    this.initializeStripe();
  }

  async initializeStripe() {
    const options = {
      clientSecret: this.clientSecret,
      appearance: {/*...*/},
    };
    this.stripe = await this.stripeService.getStripe();
    if (this.stripe) {
      this.elements = this.stripe.elements(options);
      this.paymentElement = this.elements.create('payment');
      this.paymentElement.mount('#payment-element');
    }
  }

  async handlePayment() {
    if (this.stripe && this.elements) {
      const { error, paymentIntent } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // Since we are not using return_url, handle the result here
        },
        redirect: 'if_required'  // This option prevents automatic redirection
      });

      if (error) {
        // Handle error here
        console.error('Payment error:', error.message);
        this.dialogRef.close({ error: error.message });
      } else if (paymentIntent) {
        // Handle successful payment here
        console.log('Payment successful:', paymentIntent);
        this.dialogRef.close({ status: paymentIntent.status });
      }
    }
  }
}

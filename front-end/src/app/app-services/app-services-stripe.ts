// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})

export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51PJ9B4P2cTSweUcpGP7gmth2UCzLfU0u62Y98VkDXJi8qIMsnA39OH0ZSqfidByfnXzGTRy4GBj3vdLxgtScrrrz00si1iOhQv');
  }

  getStripe() {
    return this.stripePromise;
  }
}

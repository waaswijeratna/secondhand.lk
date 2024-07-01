import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css'
})
export class MyAdsComponent implements OnInit{
  ads: any[] = [];
  userId: string | null = null; // Add this line

  constructor(private adService: AdService, private authService: AuthService, private snackBar: MatSnackBar) {
    // this.getAds();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.adService.getAdsByUser(this.userId).subscribe({
        next: (ads) => {
          this.ads = ads;
          console.log('Ads fetched:', this.ads); // Log the ads data
        },
        error: (err) => {
          console.error('Error fetching ads:', err);
          this.snackBar.open('Failed to fetch ads. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  deleteAd(adId: number): void {
    if (this.userId) {
      this.adService.deleteAd(this.userId, adId).subscribe({
        next: (response) => {
          this.ads = this.ads.filter(ad => ad.id !== adId);
          this.snackBar.open('Ad deleted successfully.', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.error('Error deleting ad:', err);
          this.snackBar.open('Failed to delete ad. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  modifyAd(adId: number): void {
    const ad = this.ads.find(ad => ad.id === adId);
    if (ad && this.userId) {
      // Implement your modify logic here, e.g., open a dialog for modifying the ad
      // For demonstration, we'll just log the ad data
      console.log('Modify ad:', ad);
      // You might want to update this method to actually modify the ad and save changes
    }
  }
}





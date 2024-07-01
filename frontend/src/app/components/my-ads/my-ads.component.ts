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
  adId: number | any;

  constructor(private adService: AdService, private authService: AuthService, private snackBar: MatSnackBar) {
    // this.getAds();
  }

  ngOnInit(): void {
    this.adService.getAdsByUser('userId').subscribe((ads) => {
      this.ads = ads;
    });
  }

  // deleteAd(adId: number): void {
  //   if (this.userId) {
  //     this.adService.deleteAd(this.userId, adId).subscribe({
  //       next: (response) => {
  //         this.ads = this.ads.filter(ad => ad.id !== adId);
  //         this.snackBar.open('Ad deleted successfully.', 'Close', {
  //           duration: 3000,
  //           panelClass: ['success-snackbar']
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Error deleting ad:', err);
  //         this.snackBar.open('Failed to delete ad. Please try again.', 'Close', {
  //           duration: 3000,
  //           panelClass: ['error-snackbar']
  //         });
  //       }
  //     });
  //   }
  // }

  deleteAd(adId: number) {
    this.adService.deleteAd(adId).subscribe((response) => {
      console.log(response);
      // Remove the ad from the component's ads array
      this.ads = this.ads.filter((ad) => ad.adId!== adId);
    });
  }
  
}





import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css'
})
export class MyAdsComponent implements OnInit{
  ads: any[] = [];
  userId: number | null = null; // Add this line

  constructor(private adService: AdService, private authService: AuthService) {
    // this.getAds();
  }

  // getAds(): void {
  //   this.adService.getAdsByUser(this.userId).subscribe(
  //     (response) => {
  //       this.ads = response;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('User ID:', this.userId); // Log user ID

    if (this.userId) {
      this.adService.getAdsByUser(this.userId).subscribe({
        next: (ads) => {
          this.ads = ads;
          console.log('Ads fetched:', this.ads); // Log the ads data
        },
        error: (err) => console.error('Error fetching ads:', err)
      });
    } else {
      console.error('User ID is null');
    }
  }
}



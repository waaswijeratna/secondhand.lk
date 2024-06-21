import { Component,OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-admin-accept-ads',
  templateUrl: './admin-accept-ads.component.html',
  styleUrl: './admin-accept-ads.component.scss'
})
export class AdminAcceptAdsComponent implements OnInit  {
  ads: any[] = [];
  displayedAds: any[] = [];
  selectedAd: any = {};
  showPopup = false;
  currentPage: number = 1;
  adsPerPage: number = 6;

  ngOnInit(): void {
    this.fetchPendingAds();
  }

  async fetchPendingAds() {
    try {
      const response = await axios.get('http://localhost:8000/admin/get-accept-ads');
      this.ads = response.data;

      // Fetch images for each ad
      for (const ad of this.ads) {
        ad.image_url = await this.fetchImageUrl(ad.ad_id);
      }

      this.updateDisplayedAds();
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  }

  async fetchImageUrl(adId: string) {
    try {
      const response = await axios.get(`http://localhost:8000/admin/get-ad-image/${adId}`);
      return response.data.image_url;
    } catch (error) {
      console.error(`Error fetching image for ad ${adId}:`, error);
      return '';
    }
  }

  updateDisplayedAds() {
    const startIndex = (this.currentPage - 1) * this.adsPerPage;
    const endIndex = startIndex + this.adsPerPage;
    this.displayedAds = this.ads.slice(startIndex, endIndex);
  }

  viewMore(ad: any) {
    this.selectedAd = ad;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  async acceptAd(adId: string) {
    try {
      await axios.put(`http://localhost:8000/admin/update-ad-status/${adId}`, { status: 'approved' });
      this.closePopup();
      this.fetchPendingAds(); // Refresh ads list after action
    } catch (error) {
      console.error('Error accepting ad:', error);
    }
  }

  async rejectAd(adId: string) {
    try {
      await axios.put(`http://localhost:8000/admin/update-ad-status/${adId}`, { status: 'rejected' });
      this.closePopup();
      this.fetchPendingAds(); // Refresh ads list after action
    } catch (error) {
      console.error('Error rejecting ad:', error);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedAds();
  }


}

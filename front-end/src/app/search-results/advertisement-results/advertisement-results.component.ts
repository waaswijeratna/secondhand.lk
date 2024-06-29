import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-advertisement-results',
  templateUrl: './advertisement-results.component.html',
  styleUrls: ['./advertisement-results.component.css']
})
export class AdvertisementResultsComponent implements OnInit {
  adDetails: any;
  images!: string[];
  selectedImage!: string;
  description!: string;
  contactNumbers!: string[];
  categoryDetails!: any[];
  firstArray!: { key: string, value: any }[];
  currentIndex: number = 0; // Added for carousel navigation
  ad_id:any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log("params pased");
      if (params && params['ad']) {
        this.adDetails = JSON.parse(params['ad']);
        console.log("Advertisement Details:", this.adDetails);
        this.detailsInitialization();
      }
    });
  }

  detailsInitialization() {
    this.images = this.adDetails.imagePaths;
    this.selectedImage = this.images[0];
    this.description = this.adDetails.description;
    this.contactNumbers = this.adDetails.telephoneNumbers;
    this.fetchCategoryDetails();
    this.ad_id = this.adDetails.ad_id;
  }

  fetchCategoryDetails() {
    let urlApi = "http://localhost:3000/api/categoryDetails";
    const ad_id = this.adDetails.ad_id;
    const category_id = this.adDetails.category_id;

    this.http.post<any[]>(urlApi, { "ad_id": ad_id, "category_id": category_id })
      .subscribe(
        (data) => {
          this.categoryDetails = data;
          if (this.categoryDetails && this.categoryDetails.length > 0) {
            this.firstArray = this.transformToKeyValueArray(this.categoryDetails[0][0]);
          } else {
            this.firstArray = [];
          }
          console.log('Fetched category details:', this.firstArray);
        },
        (error) => {
          console.error('Error in fetching category details:', error);
        }
      );
  }

  transformToKeyValueArray(obj: any): { key: string, value: any }[] {
    return Object.keys(obj)
      .filter(key => obj[key] !== null && key !== 'id' && key !== 'ad_id')
      .map(key => ({ key, value: obj[key] }));
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  openChat(): void {
    alert('Chat opened!');
  }

  reportAd(): void {
    this.router.navigate(['/reporting', this.ad_id]);
  }

  rateAd(): void {
    this.router.navigate(['/Ratings', this.ad_id]);
  }

  // Carousel methods
  visibleImages(): string[] {
    return this.images.slice(this.currentIndex, this.currentIndex + 4);
  }

  next(): void {
    if (this.currentIndex + 4 < this.images.length) {
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}

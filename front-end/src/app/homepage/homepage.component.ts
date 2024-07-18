import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../app-services/app-service-getAdvertisementData';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../app-services/localStorage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  categories = [
    { name: 'Vehicles', icon: 'icon1', category_id : 1 },
    { name: 'Property', icon: 'icon2', category_id : 2 },
    { name: 'Electronics', icon: 'icon3', category_id : 3 },
    { name: 'Home applicances', icon: 'icon4' , category_id : 4},
    { name: 'Fashion', icon: 'icon5', category_id : 5 },
    { name: 'Furniture & Home decors', icon: 'icon6' , category_id : 6},
    { name: 'Sport & Fitness', icon: 'icon7', category_id : 7 },
    { name: 'Musical Instrument', icon: 'icon8' , category_id : 8},
    { name: 'Animals', icon: 'icon9', category_id : 9 },
    { name: 'Tools & Equipment', icon: 'icon10', category_id : 10 },
    { name: 'Education', icon: 'icon11', category_id : 11 },
    { name: 'Other', icon: 'icon12' , category_id : 12}
  ];

  ad_id = 296;
  searchForm: FormGroup;

  constructor(
    private http: HttpClient,
    private advertisementService: AdvertisementService, 
    private router: Router, 
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.searchForm = this.fb.group({
      adType: ['']
    });

  }

  ngOnInit(): void {
    this.localStorageService.setItem("userId","66");
  }

  // sendAdId() {   
  //   this.advertisementService.getAdvertisement(this.ad_id)
  //     .subscribe(
  //       data => {
  //         console.log('Advertisement data loaded:', data);
  //         this.router.navigate(['/advertisement', this.ad_id]);
  //       },
  //       error => {
  //         console.error('Error loading advertisement data:', error);
  //       }
  //     );
  // }

  selectCategory(categoryName: string) {
    const encodeName = encodeURIComponent(categoryName);
    window.location.href = `/searchResults?category=${encodeName}`;
  }
  navigateToAdvertisement() {
    // this.router.navigate(['/advertisement']);
    window.location.href = '/advertisement';
  }
}

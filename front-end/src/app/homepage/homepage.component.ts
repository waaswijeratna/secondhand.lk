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
    { name: 'Vehicle', icon: 'icon1' },
    { name: 'Property', icon: 'icon2' },
    { name: 'Electronics', icon: 'icon3' },
    { name: 'Home applicances', icon: 'icon4' },
    { name: 'Fashion', icon: 'icon5' },
    { name: 'Furniture & Home decors', icon: 'icon6' },
    { name: 'Sport & Fitness', icon: 'icon7' },
    { name: 'Musical Instrument', icon: 'icon8' },
    { name: 'Animals', icon: 'icon9' },
    { name: 'Tools & Equipment', icon: 'icon10' },
    { name: 'Education', icon: 'icon11' },
    { name: 'Other', icon: 'icon12' }
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

  sendAdId() {   
    this.advertisementService.getAdvertisement(this.ad_id)
      .subscribe(
        data => {
          console.log('Advertisement data loaded:', data);
          this.router.navigate(['/advertisement', this.ad_id]);
        },
        error => {
          console.error('Error loading advertisement data:', error);
        }
      );
  }

  selectCategory(categoryName: string) {
    this.router.navigate(['/searchResults'], { queryParams: { category: categoryName } });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { CategoryService } from '../app-services/app-service-categories';
import { Category, Subcategory } from '../app-services/app-service-categories';
import { LocationService } from '../app-services/app-services-locations';
import { Location, Sublocation } from '../app-services/app-services-locations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLocationService } from '../app-services/app-get-user-location';



@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchResults: any[] = [];
  categories: Category[] = [];
  locations: Location[] = [];
  sublocations: { [key: string]: Sublocation[] } = {};
  filterForm: FormGroup;
  topAds: any[] = [];
  randomTopAds: any[] = [];
  isLocationIconClicked: boolean = false;
  TopAdSelected!: boolean;
  displayNoresults: boolean = false;
  userLocation:any;
  filters:any;




  constructor(private http: HttpClient, private fb: FormBuilder, private categoryService: CategoryService, private locationService: LocationService, private route: ActivatedRoute, private UserLocationService: UserLocationService) {
    this.filterForm = this.fb.group({
      keywords: [''],
      sell: [false],
      rent: [false],
      urgent: [false],
      top: [false],
      category: [''],
      location: [''],
      sublocation: [''],
      nearMe : ['']
    });

  }

  ngOnInit(): void {
    this.fetchCategorieAndLocations();

    this.UserLocationService.getLocation().subscribe((response) =>{
      const data = response;
      this.userLocation = data;
      console.log("ladasd", this.userLocation.city);
    })

    // Combine subscriptions to query params
    this.route.queryParams.subscribe(params => {
      if (params['location']) {
        this.setLocationByName(params['location']);
      }
      if (params['keywords']) {
        this.filterForm.get('keywords')?.setValue(params['keywords']);
      }
      if (params['nearMe']) {
        this.filterForm.get('nearMe')?.setValue(params['nearMe']);
      }
      if (params['category']) {
        this.setCategoryByName(params['category']);
      }
    });

    // Subscribe to form value changes
    this.filterForm.valueChanges.subscribe(values => {
      this.retrievingResults();
    });

    this.retrievingResults();

    // Subscribe to sell checkbox value changes
    this.filterForm.get('sell')?.valueChanges.subscribe(value => {
      if (value) {
        this.filterForm.get('rent')?.setValue(false, { emitEvent: false });
      }
    });

    // Subscribe to rent checkbox value changes
    this.filterForm.get('rent')?.valueChanges.subscribe(value => {
      if (value) {
        this.filterForm.get('sell')?.setValue(false, { emitEvent: false });
      }
    });

  }

  fetchCategorieAndLocations() {
    console.log("happened");

    this.categories = this.categoryService.categories;
    this.locations = this.locationService.locations;
    this.sublocations = this.locationService.sublocations;
    console.log("ffffffff", this.categories)

  }

  setLocationByName(locationName: string) {
    const location = this.locations.find(loc => loc.location === locationName);
    if (location) {
      this.filterForm.get('location')?.setValue(location.location_id);
    }
  }

  setCategoryByName(categoryName: string) {
    const category = this.categories.find(cat => cat.category === categoryName);
    if (category) {
      const categoryControl = this.filterForm.get('category');
      categoryControl?.setValue(category.category_id);
      categoryControl?.markAsUntouched();
      categoryControl?.updateValueAndValidity();
    }
  }

  private buildPayload() {
    console.log("asd", this.filterForm.valid);
    const formValues = this.filterForm.value;
    let payload: any = {};

    const filtersSelected = formValues.keywords || formValues.sell || formValues.rent || formValues.urgent ||
      formValues.top || formValues.category || formValues.subcategory ||
      formValues.location || formValues.sublocation || formValues.topAds || formValues.nearMe;


    console.log("filterssmnmn",filtersSelected);
    if (!filtersSelected) {
      payload.defaultFlag = true;
      console.log("asdas", payload.defaultFlag)
    }

    if (formValues.keywords) {
      payload.keywords = this.filterForm.get('keywords')?.value;
    }

    if (formValues.sell) {
      payload.adType = 'sell';
    }
    if (formValues.rent) {
      payload.adType = 'rent';
    }
    if (formValues.urgent) {
      payload.urgent = 'true';
    }
    if (formValues.top) {
      payload.top = 'true';
    }
    if (formValues.category) {
      payload.category = formValues.category;
    }
    if (formValues.location) {
      payload.location = formValues.location;
    }
    if (formValues.sublocation) {
      payload.sublocation = formValues.sublocation;
    }
    if (formValues.nearMe) {
      payload.nearMe = formValues.nearMe;
    }

    return payload;
  }



  
  retrievingResults() {
    let urlApi = "http://localhost:3000/api/search";
    const payload = this.buildPayload();
    this.filters = payload;
    // this.BannerService.setFilterPayload(payload)
    console.log("payloadd", payload);

    this.http.post<any[]>(urlApi, payload)
      .subscribe(
        (data) => {
          this.searchResults = data;  // Assign fetched data to searchResults array
          if(this.searchResults.length===0){
            this.displayNoresults = true;
          }
          else{
            this.displayNoresults = false;
            this.sortAds(this.searchResults);
          }
          console.log('Search results:', this.searchResults);
        },
        (error) => {
          console.error('Error in search request:', error);
        }
      );
  }

  toggleTopad() {
    this.TopAdSelected = !this.TopAdSelected;
  }
  // Sort ads so top ads appear first
  sortAds(ads: any[]) {
    this.topAds = ads.filter(ad => Array.isArray(ad.promotionDetails) && ad.promotionDetails.some((detail: any) => detail.promotion_ID.startsWith('T')));
    console.log("top ads", this.topAds);
    this.selectRandomTopAds();
  }

  selectRandomTopAds() {
    const shuffled = this.topAds.sort(() => 0.5 - Math.random());
    this.randomTopAds = shuffled.slice(0, 2);
  }

  isTopFilterSelected(): boolean {
    return this.filterForm.get('top')?.value;
  }

  // Update sublocations based on the selected location
  updateSublocations() {
    console.log("triggered2");
    const location = this.filterForm.get('location')?.value;
    this.filterForm.get('sublocation')?.setValue('');
    this.filterForm.get('sublocation')?.markAsUntouched();
    this.filterForm.get('sublocation')?.updateValueAndValidity();
    if (location) {
      this.sublocations[location];
    }
  }

  clearFilters() {
    console.log("triggeredasd")
    this.filterForm.reset({
      sell: false,
      rent: false,
      urgent: false,
      top: false,
      category: '',
      subcategory: '',
      location: '',
      sublocation: '',
      nearMe:''
    });
  }

  toggleLocationIcon() {
    this.isLocationIconClicked = !this.isLocationIconClicked;
    if(this.isLocationIconClicked){
      this.filterForm.get('nearMe')?.setValue(this.userLocation.city);    
    }else {
      this.filterForm.get('nearMe')?.setValue('');
    }
  }

  // Method to set the keyword form control value
  setKeyword(value: string): void {
    console.log("searched");
    this.filterForm.get('keywords')?.setValue(value);
    console.log("sfvsd", this.filterForm.get('keywords')?.value)
  }


  // Function to calculate how many days/hours ago the ad was created
  calculateTimeAgo(createdAt: string): string {
    try {
      const now = new Date();
      const createdDate = new Date(createdAt);

      // Check if createdDate is valid
      if (isNaN(createdDate.getTime())) {
        console.error('Invalid date:', createdAt);
        return 'Invalid date';
      }

      const diffTime = now.getTime() - createdDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

      if (diffDays >= 1) {
        return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
      } else {
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
      }
    } catch (error) {
      console.error('Error calculating time ago:', error);
      return 'Error calculating time';
    }
  }

  addToCart(event: Event, ad_id:any){
    event.stopPropagation(); // This stops the click event from propagating to the parent elements

    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    if (!userId) {
      console.error('User is not logged in');
      return;
    }
  
    const payload = { ad_id, userId };
  
    this.http.post('http://localhost:3000/api/insert_cart', payload).subscribe(
      response => {
        console.log('Add to cart response:', response);
        // Handle success (e.g., show a success message)
      },
      error => {
        console.error('Error adding to cart:', error);
        // Handle error (e.g., show an error message)
      }
    );
  }

}

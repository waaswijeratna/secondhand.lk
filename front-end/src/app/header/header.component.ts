import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { UserLocationService } from '../app-services/app-get-user-location';
import { LocalStorageService } from '../app-services/localStorage';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  searchForm: FormGroup;
  isLocationIconClicked: boolean = false;
  showFullHeader: boolean = false;
  userLocation:any;
  userId: string | null = null;



  districts: string[] = [
    "All Sri Lanka",
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Moneragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya"
  ];

  constructor(private fb: FormBuilder, private router: Router, private UserLocationService: UserLocationService, private localStorageService:LocalStorageService) {
    this.searchForm = this.fb.group({
      searchText: [''],
      district: ['All Sri Lanka'],
      nearMe:['']
    });
  }

  ngOnInit(): void {

    this.UserLocationService.getLocation().subscribe((response) =>{
      const data = response;
      this.userLocation = data;
      console.log("ladasd", this.userLocation.city);
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFullHeader = event.url === '/' || event.url === '/home'; // Adjust according to your home route
        console.log("asdas",this.showFullHeader )
      }
    });
  }

  search() {
    // Perform any search-related logic here
    console.log('Search initiated');
    // Submit the form
    this.submitForm();
  }

  submitForm() {
    const selectedLocation = this.searchForm.get('district')?.value;
    const searchText = this.searchForm.get('searchText')?.value;
    const user_location = this.searchForm.get('nearMe')?.value;

    this.router.navigate(['/searchResults'], {
      queryParams: { location: selectedLocation, keywords: searchText , nearMe:user_location}
    });
    this.searchForm.get('searchText')?.setValue('');
  }


  navigateToCart() {
    // this.userId = localStorage.getItem("userId");
    this.userId = this.localStorageService.getItem('userId'); // Retrieve the user ID from localStorage
    console.log("gsfs", this.userId);
    if (this.userId) {
      this.router.navigate(['/cart'], { queryParams: { userId: this.userId } });
    } else {
      console.error('User ID is not available');
    }
  }

  toggleLocationIcon() {
    this.isLocationIconClicked = !this.isLocationIconClicked;
    if(this.isLocationIconClicked){
      this.searchForm.get('nearMe')?.setValue(this.userLocation.city);
    }
  }

  navigateToAdvertisement() {
    // this.router.navigate(['/advertisement']);
    window.location.href = '/advertisement';
  }

}

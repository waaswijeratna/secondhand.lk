import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  publicRouter: any;
  navigateToLogin() {
    throw new Error('Method not implemented.');
  }
  openDialog() {  
    throw new Error('Method not implemented.');
  }

  isLoggedIn: boolean = false;
  searchForm: FormGroup;
  isLocationIconClicked: boolean = false;
  user: any = null; 

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

  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService) {
    this.searchForm = this.fb.group({
      searchText: ['']
    });
  }

  ngOnInit():void{
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadUserProfile(); // Load user profile if logged in
    }
  }

  loadUserProfile() {
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        // Handle error accordingly
      }
    });
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  search() {
    // Perform any search-related logic here
    console.log('Search initiated');
    // Submit the form
    this.submitForm();
  }

  submitForm() {
    // Process form submission logic here
    console.log('Form submitted');
    // Clear the search text
    this.searchForm.get('searchText')?.setValue('');
  }

  toggleLocationIcon() {
    this.isLocationIconClicked = !this.isLocationIconClicked;
  }
  redirectToAdvertisement() {
    this.router.navigate(['/advertisement']);
  }
  
  toggleLoginStatus() {
    this.isLoggedIn = !this.isLoggedIn;
    if (this.isLoggedIn) {
      // User is logged in, change header text to "Profile"
      // and route to "my-account"
      // Example: You can implement your specific logic here
      console.log('User logged in');
      // Redirect to profile page
      this.router.navigate(['/my-account']);
    } else {
      // User is logged out, change header text to "Login"
      // and route to "login"
      console.log('User logged out');
      // Redirect to login page
      this.router.navigate(['/login']);
    }
  }
}

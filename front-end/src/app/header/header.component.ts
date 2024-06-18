import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchForm: FormGroup;
  isLocationIconClicked: boolean = false;

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

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: ['']
    });
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

}

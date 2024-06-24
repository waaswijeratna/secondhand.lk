import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'] // Note the plural 'styleUrls'
})
export class SettingsComponent implements OnInit {
  accountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      name: [''],
      location: [''],
      subLocation: ['']
    });
  }

  ngOnInit(): void {
    // Fetch user details and populate the form
    this.getUserDetails();
  }

  getUserDetails(): void {
    // Simulating fetching user details from an API
    const userDetails = {
      name: 'John Doe',
      location: 'New York',
      subLocation: 'Manhattan'
    };

    this.accountForm.setValue({
      name: userDetails.name,
      location: userDetails.location,
      subLocation: userDetails.subLocation
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const updatedDetails = this.accountForm.value;
      console.log('Updated Details:', updatedDetails);
      // Here you can handle the form submission, e.g., s
    }
  }
}
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.component.html',
  styleUrls: ['./profilesetting.component.scss']
})
export class ProfilesettingComponent {
  // Variables to store admin details
  adminName = 'John Doe';
  adminUsername = 'admin123';
  adminEmail = 'admin@example.com';

  // Variables to control edit mode
  isEditingName = false;
  isEditingUsername = false;
  isEditingEmail = false;

  constructor(private dialog: MatDialog) {}

  // Function to toggle edit mode for specific fields
  toggleEdit(field: string) {
    switch(field) {
      case 'name':
        this.isEditingName = !this.isEditingName;
        break;
      case 'username':
        this.isEditingUsername = !this.isEditingUsername;
        break;
      case 'email':
        this.isEditingEmail = !this.isEditingEmail;
        break;
    }
  }

  

}

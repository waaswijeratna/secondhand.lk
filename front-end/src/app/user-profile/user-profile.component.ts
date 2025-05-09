import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  myAds: boolean = false;
  myReviews: boolean = false;
  myAccount: boolean = true;
  settings: boolean = false;

  toggleSection(section: string) {
    this.myAds = section === 'myAds';
    this.myReviews = section === 'myReviews';
    this.myAccount = section === 'myAccount';
    this.settings = section === 'settings';
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  logout() {
  throw new Error('Method not implemented.');
}
  user: any;

  
}

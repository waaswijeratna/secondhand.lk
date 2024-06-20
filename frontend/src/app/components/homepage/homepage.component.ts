import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  categories = [
    { name: 'Vehicle', icon: 'icon1' },
    { name: 'Property', icon: 'icon2' },
    { name: 'Electronics', icon: 'icon3' },
    { name: 'Home & Appliances', icon: 'icon4' },
    { name: 'Fashion', icon: 'icon5' },
    { name: 'Furniture & Home Decor', icon: 'icon6' },
    { name: 'Sport & Fitness', icon: 'icon7' },
    { name: 'Musical Instrument', icon: 'icon8' },
    { name: 'Animals', icon: 'icon9' },
    { name: 'Tools & Equipment', icon: 'icon10' },
    { name: 'Education', icon: 'icon11' },
    { name: 'Other', icon: 'icon12' }
  ];

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.googleLogin(token);
      }
    });
  }

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

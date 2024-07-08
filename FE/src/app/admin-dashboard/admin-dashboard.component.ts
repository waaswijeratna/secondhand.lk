import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adCount: number = 0; // Initialize adCount to 0
  userCount: number = 0; // Initialize userCount to 0
  totalRevenue: number = 0; // Initialize totalRevenue to 0

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAdCount();
    this.fetchUserCount();
    this.fetchRevenue(); // Fetch revenue data on initialization
  }

  fetchAdCount() {
    this.http.get<{ total_ad_count: number }>('http://localhost:8000/get-ad-count')
      .subscribe(
        (data) => {
          this.adCount = data.total_ad_count;
        },
        (error) => {
          console.error('Error fetching ad count:', error);
        }
      );
  }

  fetchUserCount() {
    this.http.get<{ total_user_count: number }>('http://localhost:8000/get-user-count')
      .subscribe(
        (data) => {
          this.userCount = data.total_user_count;
        },
        (error) => {
          console.error('Error fetching user count:', error);
        }
      );
  }

  fetchRevenue() {
    this.http.get<{ Total_amount: number }>('http://localhost:8000/get-revenue')
      .subscribe(
        (data) => {
          this.totalRevenue = data.Total_amount;
        },
        (error) => {
          console.error('Error fetching total revenue:', error);
        }
      );
  }
}

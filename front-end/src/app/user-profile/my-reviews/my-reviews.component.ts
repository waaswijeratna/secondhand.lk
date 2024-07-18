import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../app-services/localStorage';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {
  userId: string | null = null;
  reviewItem: any[] = [];
  totalRating: number = 0;
  ratingCount: number = 0;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 1;
  paginatedReviews: any[] = [];

  constructor(private http: HttpClient, private LocalStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.retrieveReviews();
  }

  private buildPayload() {
    let payload: any = {};
    // this.userId = '66';
    this.userId = this.LocalStorageService.getItem('userId');

    

    if (this.userId) {
      payload.userId = this.userId;
    }

    return payload;
  }

  retrieveReviews() {
    let urlApi = "http://localhost:3000/api/user_reviews";
    const payload = this.buildPayload();

    this.http.post<any[]>(urlApi, payload)
      .subscribe(
        (data) => {
          this.reviewItem = data;
          this.calculateTotalRating();
          this.updatePagination();
        },
        (error) => {
          console.error('Error fetching review data:', error);
        }
      );
  }

  calculateTotalRating() {
    let sum = 0;
    let count = 0;

    if (this.reviewItem[0]) {
      this.reviewItem[0].forEach((review: any) => {
        sum += review.rating;
        count++;
      });
    }

    this.totalRating = sum / count;
    this.ratingCount = count;
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.reviewItem[0].length / this.itemsPerPage);
    this.paginateResults();
  }

  paginateResults() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedReviews = this.reviewItem[0].slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateResults();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateResults();
    }
  }
}
 
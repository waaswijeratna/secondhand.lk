import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating: number = 0;  // Providing a default value

  fullStars: number = 0;
  hasHalfStar: boolean = false;
  stars: number[] = Array(5).fill(0);  // Always display 5 stars

  ngOnChanges() {
    this.fullStars = Math.floor(this.rating);
    this.hasHalfStar = this.rating % 1 !== 0;
  }
}


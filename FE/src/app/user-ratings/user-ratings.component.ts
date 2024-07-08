import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import axios from 'axios';
import { Chart, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.scss']
})
export class UserRatingsComponent implements OnInit {
  @ViewChild('pieChart') pieChartCanvas!: ElementRef;
  
  ratingsData: any[] = [];
  pieChart: Chart | undefined;
  ratingColors = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949'];

  constructor() { }

  ngOnInit(): void {
    this.fetchUserRatings();
  }

  fetchUserRatings() {
    axios.get<any[]>('http://localhost:8000/user-rating')
      .then(response => {
        this.ratingsData = response.data.filter(item => item.rating !== null);
        this.renderPieChart();
      })
      .catch(error => {
        console.error('Error fetching user ratings:', error);
      });
  }

  renderPieChart() {
    const labels = this.ratingsData.map(item => `Rating ${item.rating}`);
    const data = this.ratingsData.map(item => item.num_ads);

    if (this.pieChart) {
      this.pieChart.destroy();
    }

    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.ratingColors.slice(0, data.length),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 15,
              padding: 10,
              font: {
                size: 12,
                family: "'Poppins', sans-serif"
              },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              size: 14,
              weight: 'bold',
              family: "'Poppins', sans-serif"
            },
            bodyFont: {
              size: 12,
              family: "'Poppins', sans-serif"
            },
            padding: 10,
            cornerRadius: 4,
            displayColors: false
          }
        }
      } as ChartOptions
    });
  }
}
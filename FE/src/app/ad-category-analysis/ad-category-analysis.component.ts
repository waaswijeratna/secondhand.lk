import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Chart, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-ad-category-analysis',
  templateUrl: './ad-category-analysis.component.html',
  styleUrls: ['./ad-category-analysis.component.scss']
})
export class AdCategoryAnalysisComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Initialize data fetching when component is loaded
    this.fetchData();
  }

  fetchData(): void {
    // Fetch data from the backend API
    axios.get('http://localhost:8000/ad-count-by-category')
      .then(response => {
        const data = response.data;
        // Create the chart with the fetched data
        this.createChart(data);
      })
      .catch(error => {
        console.error('There was an error fetching the ad data!', error);
      });
  }

  createChart(data: any): void {
    // Get the canvas element by ID
    const ctx = document.getElementById('adCountChart') as HTMLCanvasElement;
    
    // Define colors for the chart
    const colors = [
      '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
      '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
    ];

    // Create a new Chart.js instance
    new Chart(ctx, {
      type: 'bar',
      data: {
        // Map data categories and ad counts to chart labels and datasets
        labels: data.map((item: any) => item.category),
        datasets: [{
          label: 'Number of Ads',
          data: data.map((item: any) => item.ad_count),
          backgroundColor: colors.map(color => this.adjustColorOpacity(color, 0.7)), // Adjust color opacity
          borderColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 16,
              weight: 'bold'
            },
            bodyFont: {
              size: 14
            },
            padding: 12,
            cornerRadius: 4,
            displayColors: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              font: {
                size: 12,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      } as ChartOptions
    });
  }

  adjustColorOpacity(color: string, opacity: number): string {
    // Adjust the opacity of the color
    return color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
  }
}

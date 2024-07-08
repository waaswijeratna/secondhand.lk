import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Chart, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-ad-count-by-location',
  templateUrl: './ad-count-by-location.component.html',
  styleUrls: ['./ad-count-by-location.component.scss']
})
export class AdCountByLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    axios.get('http://localhost:8000/ad-count-by-location')
      .then(response => {
        const data = response.data;
        this.createChart(data);
      })
      .catch(error => {
        console.error('There was an error fetching the ad data!', error);
      });
  }

  createChart(data: any): void {
    const ctx = document.getElementById('adCountByLocation') as HTMLCanvasElement;

    const colors = [
      '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
      '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
    ];

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item: any) => item.location),
        datasets: [{
          label: '# of Ads',
          data: data.map((item: any) => item.ad_count),
          backgroundColor: colors.map(color => this.adjustColorOpacity(color, 0.7)),
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
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}

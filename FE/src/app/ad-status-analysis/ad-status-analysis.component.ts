import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-ad-status-analysis',
  templateUrl: './ad-status-analysis.component.html',
  styleUrls: ['./ad-status-analysis.component.scss']
})
export class AdStatusAnalysisComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    axios.get('http://localhost:8000/ads-status-analysis')
      .then(response => {
        const data = response.data;
        this.createDoughnutChart(data);
      })
      .catch(error => {
        console.error('There was an error fetching the ad data!', error);
      });
  }

  createDoughnutChart(data: any): void {
    const ctx = document.getElementById('adStatusDoughnutChart') as HTMLCanvasElement;
   
    const chartConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: data.map((item: any) => item.approved_status),
        datasets: [{
          label: 'Number of Ads',
          data: data.map((item: any) => item.ad_count),
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',  // Blue for Approved
            'rgba(255, 99, 132, 0.8)',  // Red for Rejected
            'rgba(255, 206, 86, 0.8)',  // Yellow for Pending
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14,
                family: "'Poppins', sans-serif"
              },
              padding: 20
            }
          },
          title: {
            display: true,
            // text: 'Ad Status Analysis',
            font: {
              size: 24,
              weight: 'bold',
              family: "'Poppins', sans-serif"
            },
            padding: {
              top: 20,
              bottom: 30
            },
            color: '#304E74'
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              size: 16,
              weight: 'bold',
              family: "'Poppins', sans-serif"
            },
            bodyFont: {
              size: 14,
              family: "'Poppins', sans-serif"
            },
            padding: 12,
            cornerRadius: 6,
            callbacks: {
              label: function(context: any) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== undefined) {
                  label += context.parsed + ' ads';
                }
                return label;
              }
            }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      }
    };

    new Chart(ctx, chartConfig);
  }
}
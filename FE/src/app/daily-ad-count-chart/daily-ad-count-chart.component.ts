import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartDataset, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-daily-ad-count',
  templateUrl: './daily-ad-count-chart.component.html',
  styleUrls: ['./daily-ad-count-chart.component.scss']
})
export class DailyAdCountChartComponent implements OnInit {
  adData: any[] = [];
  selectedMonth: string = '';
  dropdownOpen: boolean = false;
  months: { name: string, value: string }[] = [];
  chart: Chart | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.populateMonths();
    this.selectCurrentMonth();
  }

  populateMonths(): void {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 12; i++) {
      this.months.push({
        name: monthNames[i],
        value: `${currentYear}-${(i + 1).toString().padStart(2, '0')}`
      });
    }
  }

  selectCurrentMonth(): void {
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    this.selectedMonth = currentMonth;
    this.fetchData(this.selectedMonth);
  }

  fetchData(month: string): void {
    this.http.get<any[]>(`http://localhost:8000/daily-ad-count?month=${month}`)
      .subscribe(data => {
        this.adData = data;
        this.createChart();
      });
  }

  createChart(): void {
    const dates = this.adData.map(entry => new Date(entry.date_created).toLocaleDateString());
    const adCounts = this.adData.map(entry => entry.ad_count);

    const options: ChartOptions = {
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
        x: {
          type: 'category',
          title: {
            display: true,
            font: {
              size: 14,
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            }
          },
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12,
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            }
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Ad Count',
            font: {
              size: 14,
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            font: {
              size: 12,
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            }
          }
        }
      }
    };

    const chartData: ChartDataset[] = [
      {
        data: adCounts,
        label: 'Ad Count',
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ];

    const ctx = document.getElementById('adCountChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: chartData
      },
      options: options
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectMonth(month: string): void {
    this.selectedMonth = month;
    this.dropdownOpen = false;
    this.fetchData(this.selectedMonth);
  }
}
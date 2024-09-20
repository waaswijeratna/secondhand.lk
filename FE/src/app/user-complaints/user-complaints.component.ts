import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Complaint {
  advertisement_id: number;
  user_id: number;
  total_complaints: number;
  latest_complaint_date: string;
  complaint_type: string;
  complaint_description: string;
  earliest_complaint_date: string;
}

@Component({
  selector: 'app-user-complaints',
  templateUrl: './user-complaints.component.html',
  styleUrls: ['./user-complaints.component.scss']
})
export class UserComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];
  isPopupVisible = false;
  selectedAdId: number | null = null;

  constructor() { }

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints() {
    axios.get<Complaint[]>('http://localhost:8000/all-user-complaints')
      .then(response => {
        this.complaints = response.data.map(complaint => ({
          ...complaint,
          latest_complaint_date: this.formatDate(complaint.latest_complaint_date),
          earliest_complaint_date: this.formatDate(complaint.earliest_complaint_date)
        }));
      })
      .catch(error => {
        console.error('Error fetching complaints:', error);
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  showPopup(adId: number) {
    this.selectedAdId = adId;
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
    this.selectedAdId = null;
  }

  banAd() {
    if (this.selectedAdId !== null) {
      console.log("Banning ad:", this.selectedAdId);
      axios.post(`http://localhost:8000/baned-ads`, { ad_id: this.selectedAdId })
        .then(response => {
          this.complaints = this.complaints.filter(complaint => complaint.advertisement_id !== this.selectedAdId);
          alert('Ad has been deleted.');
          this.closePopup();
        })
        .catch(error => {
          console.error('Error deleting ad:', error);
          alert('Failed to delete ad. Please try again.');
        });
    }
  }
}
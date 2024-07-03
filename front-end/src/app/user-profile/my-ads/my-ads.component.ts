import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdvertisementService } from '../../app-services/app-service-getAdvertisementData';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../app-services/localStorage';



@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {
  user_id: string | null = null;
  myAdsData: any[] = [];
  searchResults: any[] = [];
  ad_id:any;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  paginatedResults: any[] = [];

  constructor(private http: HttpClient, private advertisementService:AdvertisementService, private router: Router,private snackBar: MatSnackBar, private LocalStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.retrievingResults();
  }

  private buildPayload() {
    let payload: any = {};
    // this.user_id = '66';
    this.user_id = this.LocalStorageService.getItem('userId');


    if (this.user_id) {
      payload.userId = this.user_id;
    }

    return payload;
  }

  retrievingResults() {
    let urlApi = "http://localhost:3000/api/search";
    const payload = this.buildPayload();

    this.http.post<any[]>(urlApi, payload)
      .subscribe(
        (data) => {
          this.searchResults = data;
          this.updatePagination();
        },
        (error) => {
          console.error('Error in search request:', error);
        }
      );
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.searchResults.length / this.itemsPerPage);
    this.paginateResults();
  }

  paginateResults() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedResults = this.searchResults.slice(start, end);
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

  sendAdId(ad_id:any) {   
    this.advertisementService.getAdvertisement(ad_id)
      .subscribe(
        data => {
          console.log('Advertisement data loaded:', data);
          this.router.navigate(['/advertisement', ad_id]);
        },
        error => {
          console.error('Error loading advertisement data:', error);
        }
      );
  }

  deleteAd(ad_id: any) {
    console.log("id?", ad_id);
      this.http.post('http://localhost:3000/api/deleteAd', { ad_id })
        .subscribe(
          (response) => {
                      // Display the snackbar message
                      const snackBarRef = this.snackBar.open('Advertisement deleted Successfully', 'OK', {
                        duration: 7000,
                        verticalPosition: 'top',
                        panelClass: ['customSnackbar1']
                      });
  
            console.log('Ad deleted:', response);
            // Refresh the cart data after deletion
            this.retrievingResults();
          },
          (error) => {
            console.error('Error deleting ad:', error);
                      // Display the snackbar message
                      this.snackBar.open('Error deleting advertisement, Try again', 'OK', {
                        duration: 7000,
                        verticalPosition: 'top',
                        panelClass:['customSnackbar2'] 
                      });
          }
        );
    }

}

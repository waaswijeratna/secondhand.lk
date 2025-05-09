import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  payloadFilters: any;

  private apiUrl = 'http://localhost:3000/api/bannerImages';

  constructor(private http: HttpClient) { }

  getFilteredImages(filters: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, filters);
  }

  setFilterPayload(filters: any){
    this.payloadFilters = filters;
    console.log("sett", filters)
  }

  getFilterPayload(){
    return this.payloadFilters;
  }
}

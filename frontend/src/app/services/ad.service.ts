import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {
private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getAdsByUser(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  deleteAd(userId: string, adId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${userId}`, { body: { adId } });
  }

  modifyAd(userId: string, adId: number, adData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${userId}`, { adId, ...adData });
  }
  
}

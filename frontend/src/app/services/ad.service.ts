import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  deleteAd(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ad/${id}`);
  }  

  // deleteAd(userId: string, adId: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/ad/${adId}`, { 
  //     params: new HttpParams().set('userId', userId)
  //   });
  // }
}
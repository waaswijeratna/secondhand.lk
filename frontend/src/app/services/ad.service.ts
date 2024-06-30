import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {
private baseUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getAdsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}/ads`);
  }
  
}

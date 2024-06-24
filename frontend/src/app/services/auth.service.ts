import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPathsService } from './apipaths/api-paths.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000';
  private loggedInStatus: boolean = false;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean{
    return this.loggedInStatus;
  }

  login():void{
    this.loggedInStatus = true;
  }

  logout(): void{
    this.loggedInStatus = false;
  }

  // register(username: string, email: string, password: string) {
  //   return this.http.post(`${this.baseURL}/register`, { username, email, password });
  // }

  // login(email: string, password: string): Observable<{ accessToken: string }> {
  //   return this.http.post<{ accessToken: string }>(`${this.baseURL}/login`, { email, password });
  // }

  // async registerUser(regObj: any) {
  //   return await this.http.post<any>(ApiPathsService.register, regObj)
  // }

  // async loginNew(loginObj: any) {
  //   return await this.http.post<any>(ApiPathsService.login, loginObj);
  // }

  loginNew(credentials: { email: string; password: string }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(ApiPathsService.login, credentials);
  }

  registerUser(user:any): Observable<any> {
    return this.http.post<any>(ApiPathsService.register, user);
  }
  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/profile`);
  }

}

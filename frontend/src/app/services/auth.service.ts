import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPathsService } from './apipaths/api-paths.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseURL = 'http://localhost:3000';

  getBaseURL(): string {
    return this.baseURL;
  }
  
  private userPayload: any;

  constructor(private http: HttpClient,private router:Router, private jwtHelper: JwtHelperService) { }

  isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  login(): void {
    console.log("Logged in");
  }
  
  logOut(){
    this.signOut();
  }

  signOut() {
    localStorage.clear();
  }

  storeToken(accessToken: string) {
    // this.setCookie('accessToken', token);
    console.log('Storing token:', accessToken); // Add this line
    localStorage.setItem('accessToken', accessToken);
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    if (decodedToken && decodedToken.userId) {
      localStorage.setItem('userId', decodedToken.userId);
    }
  }

  getToken(){
    // return this.getCookie('accessToken')!;
    return localStorage.getItem('accessToken');
  }

  loginNew(credentials: { email: string; password: string }): Observable<{ accessToken: string }> {
    return this.http.post<any>(ApiPathsService.login, credentials);
  }

  loginWithGoogle(accessToken: string): Observable<any> {
    return this.http.get(`${this.baseURL}/auth/google`, { params: { accessToken } });
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(ApiPathsService.register, user);
  }

  googleLogin() {
    window.location.href = `${this.baseURL}/auth/google`;
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/profile`);
  }  
  // decodedToken() {
  //   const jwtHelper = new JwtHelperService();
  //   const token = this.getToken()!;
  //   this.userPayload = jwtHelper.decodeToken(token);
  //   return jwtHelper.decodeToken(token)
  // }

  decodedToken() {
    const token = this.getToken();
    console.log('Token:', token); // Log token

    if (token) {
      this.userPayload = this.jwtHelper.decodeToken(token);
      console.log('Decoded Payload:', this.userPayload); // Log decoded payload
      return this.userPayload;
    }
    return null;
  }

  // getEmail() {//Get Email from token
  //   this.decodedToken();
  //   //return this.userPayload.email
  //   if(this.userPayload){
  //     console.log(this.userPayload.email);
  //     return this.userPayload.email;
  //   }
  //   //console.log(this.userPayload.email);
  // }

  getEmail() {
    const payload = this.decodedToken();
    return payload ? payload.email : null;
  }

  // getUserId() {
  //   const payload = this.decodedToken();
  //   return payload ? payload.userId : null;
  // }

  getUserId() {
    const token = this.getToken();
    if (token) {
      const payload = this.jwtHelper.decodeToken(token);
      return payload.userId;
    }
    return null;
  }

}

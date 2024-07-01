import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPathsService } from './apipaths/api-paths.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'http://localhost:3000';
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private jwtHelper: JwtHelperService) {
    // Subscribe to route changes to handle query params
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.googleLogin(token);
      }
    });
  }

  login(): void {
    console.log("Logged in");
  }

  isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  logOut() {
    this.signOut();
  }

  signOut() {
    localStorage.clear();
  }

  storeToken(token: string) {
    console.log('Storing token:', token);
    localStorage.setItem('accessToken', token);
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken && decodedToken.userId) {
      localStorage.setItem('userId', decodedToken.userId);
    }
  }

  decodedToken() {
    const token = this.getToken();
    if (token) {
      this.userPayload = this.jwtHelper.decodeToken(token);
      return this.userPayload;
    }
    return null;
  }

  loginNew(credentials: { email: string; password: string }): Observable<{ accessToken: string }> {
    return this.http.post<any>(ApiPathsService.login, credentials);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(ApiPathsService.register, user);
  }

  googleLogin(token: string) {
    this.storeToken(token);
    this.router.navigate(['/homepage']);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/profile`);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  getEmail() {
    const payload = this.decodedToken();
    return payload ? payload.email : null;
  }

  getUserId() {
    const token = this.getToken(); // Ensure token is retrieved first
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken && decodedToken.userId) {
      return decodedToken.userId; // Return userId from decoded token
    }
  }
  return null;
  }

  isGoogleAuthenticated(): boolean {
    // Assuming 'authProvider' is stored in local storage or any other persistent storage after login
    const authProvider = localStorage.getItem('authProvider');
    return authProvider === 'google';
  }
}

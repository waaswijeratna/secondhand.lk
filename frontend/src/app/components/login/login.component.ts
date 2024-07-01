import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private route: Router) { }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit(): void {}

  async onLogin() {

    if (this.loginForm.invalid) {
      this.message = 'Please fill in all fields correctly.';
      return;
    }

    (this.authService.loginNew({
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    })).subscribe({
      next: (res: { accessToken: string; }) => {
        console.log('Login successful', res);
        this.message = 'Login successful!';
        this.authService.storeToken(res.accessToken);
        localStorage.setItem('accessToken', res.accessToken); // Store the token in local storage
        this.route.navigate(['/homepage']); // Redirect to homepage
        window.location.href = '/homepage';
      },
      error: (err: any) => {
        console.error('Login error', err);
        this.message = 'Invalid email or password.';
      }
    });

    // console.log('About to send login request...');
    // this.authService.loginWithGoogle('token').subscribe({
    //   next: (res: { token: string, user: any }) => {
    //     console.log('Google Login successful', res);
    //     this.authService.storeToken(res.token);
    //     localStorage.setItem('accessToken', res.token); // Store the token in local storage
    //     this.route.navigate(['/homepage']);
    //     window.location.href = '/homepage';
    //   },
    //   error: (err: any) => {
    //     console.error('Google Login error', err);
    //     this.message = 'Failed to login with Google.';
    //   }
    // });
  }

  googleLogin() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  // handleGoogleCallback() {
  //   const accessToken = this.authService.getToken();
  //   if (accessToken) {
  //     // Token exists, store it in local storage
  //     localStorage.setItem('accessToken', accessToken);
  //     // Redirect to homepage
  //     window.location.href = '/homepage';
  //   } else {
  //     console.error('Google authentication failed: no access token received.');
  //   }
  // }


}

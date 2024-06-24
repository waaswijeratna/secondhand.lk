import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  router: any;
  hide: any;

  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

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
        localStorage.setItem('accessToken', res.accessToken); // Store the token in local storage
        this.router.navigate(['/homepage']); // Redirect to homepage

      },
      error: (err: any) => {
        console.error('Login error', err);
        this.message = 'Invalid email or password.';
      }
    });


  }


  // onSubmit() {
  //   // Ensure that email and password are not undefined
  //   if (!this.email || !this.password) {
  //     this.message = 'Email and password are required.';
  //     return;
  //   }

  //   this.authService.login(this.email, this.password)
  //     .subscribe(
  //       (data: { accessToken: string }) => { // Specify the type for data
  //         console.log(data);
  //         this.message = 'Login successful!';
  //       },
  //       (error: any) => { // Specify the type for error
  //         console.log(error);
  //         this.message = 'Invalid email or password.';
  //       }
  //     );
  // }

}

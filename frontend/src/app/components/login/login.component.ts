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
  auth: any;
  userStore: any;
  snackBar: any;
  spinner: any;
  router: any;
  hide: any;

  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  async onLogin() {

    (await this.authService.loginNew(this.loginForm.value))
      .subscribe({
        next: async (res: { accessToken: any; }) => {

        },
        error: (err: { status: string; }) => {
          this.snackBar.open("Login Error! Error Code " + err.status, "", { panelClass: ['app-notification-error'] })._dismissAfter(3000);
        }
      });

  }


  onSubmit() {
    // Ensure that email and password are not undefined
    if (!this.email || !this.password) {
      this.message = 'Email and password are required.';
      return;
    }

    this.authService.login(this.email, this.password)
      .subscribe(
        (data: { accessToken: string }) => { // Specify the type for data
          console.log(data);
          this.message = 'Login successful!';
        },
        (error: any) => { // Specify the type for error
          console.log(error);
          this.message = 'Invalid email or password.';
        }
      );
  }

}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted: any;
  f: any;
  message: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.http.post('/ResetPassword:token', this.forgotPasswordForm.value)
        .subscribe(response => {
          console.log('Password reset email sent', response);
        }, error => {
          console.error('Error sending password reset email', error);
        });
    }
  }
}

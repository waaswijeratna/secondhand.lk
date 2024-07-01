import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgotPassword.component';

import { SettingsComponent } from './components/settings/settings.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './profile/profile.component'; 

import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { JwtHelperService,JwtModule } from '@auth0/angular-jwt';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FaqComponent } from './components/faq/faq.component';
import { SellFastComponent } from './components/sell-fast/sell-fast.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    SettingsComponent,
    MyAdsComponent,
    MyReviewsComponent,
    ChatComponent,
    ProfileComponent,
    MyAccountComponent,
    StarRatingComponent,
    ResetPasswordComponent,
    LayoutComponent,
    PrivacyPolicyComponent,
    FaqComponent,
    SellFastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCommonModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    NgbModule,
    MatExpansionModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken');
        }
      }
    })
  ],
  providers: [
    provideAnimationsAsync(),
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

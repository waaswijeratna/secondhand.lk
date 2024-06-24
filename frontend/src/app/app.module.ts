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
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './profile/profile.component'; 

import {MatIconModule} from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    ForgotpasswordComponent,
    SettingsComponent,
    MyAdsComponent,
    MyReviewsComponent,
    ChatComponent,
    ProfileComponent,
    MyAccountComponent,
    StarRatingComponent
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
    NgbModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

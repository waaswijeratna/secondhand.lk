import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'my-ads', component: MyAdsComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'my-reviews', component: MyReviewsComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'users', component: UsersComponent},
  {path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

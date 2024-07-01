import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { ChatComponent } from './components/chat/chat.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FaqComponent } from './components/faq/faq.component';
import { SellFastComponent } from './components/sell-fast/sell-fast.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'homepage', component: HomepageComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'my-ads', component: MyAdsComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'my-reviews', component: MyReviewsComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'profile', component: ProfileComponent },
      {path: 'privacy-policy', component: PrivacyPolicyComponent},
      {path: 'faq', component: FaqComponent},
      {path: 'sell-fast', component: SellFastComponent}

    ]
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

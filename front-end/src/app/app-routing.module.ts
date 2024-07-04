import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdPromotionsComponent } from './footer/ad-promotions/ad-promotions.component'; // adjust the path as necessary
import { ChatBotComponent } from './chat-platform-and-bot/chat-bot/chat-bot.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AdvertisementResultsComponent } from './search-results/advertisement-results/advertisement-results.component';
import { RatingsComponent } from './ratings-and-reporting/ratings/ratings.component';
import { ReportingComponent } from './ratings-and-reporting/reporting/reporting.component';
import { CartComponent } from './cart/cart.component';
import { StaySafeComponent } from './footer/stay-safe/stay-safe.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellFastComponent } from './footer/sell-fast/sell-fast.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { FaqComponent } from './footer/faq/faq.component';
import { AboutUsComponent } from './footer/about-us/about-us.component';
import { ContactUsComponent } from './footer/contact-us/contact-us.component';
import { TermsComponent } from './footer/terms/terms.component';
import { FeedebackComponent } from './footer/feedeback/feedeback.component';
import { BannerAdFooterComponent } from './footer/banner-ad-footer/banner-ad-footer.component';


const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'advertisement', component: AdvertisementComponent},
  { path: 'advertisement/:id', component: AdvertisementComponent },
  { path: 'ad-promotion', component: AdPromotionsComponent },
  { path: 'iframeChatBot', component: ChatBotComponent },
  { path: 'searchResults', component: SearchResultsComponent },
  { path: 'advertisementResults', component: AdvertisementResultsComponent},
  { path: 'Ratings/:id', component: RatingsComponent },
  { path: 'reporting/:id', component: ReportingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'staySafe', component: StaySafeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'sellFast', component: SellFastComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'feedback', component: FeedebackComponent },
  { path: 'banner_footer', component: BannerAdFooterComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

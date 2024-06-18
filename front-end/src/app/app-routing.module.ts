import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdPromotionsComponent } from './footer/ad-promotions/ad-promotions.component'; // adjust the path as necessary
import { ChatBotComponent } from './chat-platform-and-bot/chat-bot/chat-bot.component';


const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'advertisement', component: AdvertisementComponent},
  { path: 'advertisement/:id', component: AdvertisementComponent },
  { path: 'ad-promotion', component: AdPromotionsComponent },
  { path: 'iframeChatBot', component: ChatBotComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

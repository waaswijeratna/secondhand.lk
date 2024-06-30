import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { ForumCategorySelectionComponent } from './advertisement/forum-category-selection/forum-category-selection.component';
import { ForumUniqueDetailsComponent } from './advertisement/forum-unique-details/forum-unique-details.component';
import { ForumGeneralDetailsComponent } from './advertisement/forum-general-details/forum-general-details.component';
import { ForumPromoteAdComponent } from './advertisement/forum-promote-ad/forum-promote-ad.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { PaymentGatewayDialogComponent } from './advertisement/forum-promote-ad/payment-gateway-dialog/payment-gateway-dialog.component';
import { AdPromotionsComponent } from './footer/ad-promotions/ad-promotions.component';
import { ChatPlatformAndBotComponent } from './chat-platform-and-bot/chat-platform-and-bot.component';
import { ChatBotComponent } from './chat-platform-and-bot/chat-bot/chat-bot.component';
import { MessagesModule } from 'primeng/messages';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AdvertisementResultsComponent } from './search-results/advertisement-results/advertisement-results.component';
import { CarouselModule } from 'primeng/carousel';
import { RatingsAndReportingComponent } from './ratings-and-reporting/ratings-and-reporting.component';
import { RatingsComponent } from './ratings-and-reporting/ratings/ratings.component';
import { ReportingComponent } from './ratings-and-reporting/reporting/reporting.component';
import { CartComponent } from './cart/cart.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { StaySafeComponent } from './footer/stay-safe/stay-safe.component';













@NgModule({
  declarations: [
    AppComponent,
    AdvertisementComponent,
    ForumCategorySelectionComponent,
    ForumUniqueDetailsComponent,
    ForumGeneralDetailsComponent,
    ForumPromoteAdComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    PaymentGatewayDialogComponent,
    AdPromotionsComponent,
    ChatPlatformAndBotComponent,
    ChatBotComponent,
    SearchResultsComponent,
    AdvertisementResultsComponent,
    RatingsAndReportingComponent,
    RatingsComponent,
    ReportingComponent,
    CartComponent,
    StaySafeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,
    MessagesModule,
    CarouselModule,
    MatTooltipModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

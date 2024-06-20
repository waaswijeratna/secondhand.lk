import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RatingsComponent } from './ratings/ratings.component';
import { RatingModule } from 'primeng/rating';
import { ReactiveFormsModule } from '@angular/forms'; 
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './report/report.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    RatingsComponent,
    ReportComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChatComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    ReactiveFormsModule,
    InputTextareaModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

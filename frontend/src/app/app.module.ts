import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AlladviewComponent } from './alladview/alladview.component';
import { HttpClientModule } from '@angular/common/http';
import {HeaderComponent} from './header/header.component'
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectComponent } from './select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { WishlistComponent } from './wishlist/wishlist.component';








@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    AlladviewComponent,
    HeaderComponent,
    FooterComponent,
    SelectComponent,
    FilterComponent,
    WishlistComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  
    
   
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

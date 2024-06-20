import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { RatingsComponent } from './ratings/ratings.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';


//routing
const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'report', component:ReportComponent},
  {path:'ratings', component:RatingsComponent},
  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

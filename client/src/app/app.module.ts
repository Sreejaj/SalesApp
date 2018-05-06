import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService, AuthInterceptor } from './services/authentication.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersearchComponent } from './customersearch/customersearch.component';
import { DebtdetailsComponent } from './debtdetails/debtdetails.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentdetailsComponent } from './paymentdetails/paymentdetails.component';
import { DataService } from './services/data.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersearchComponent,
    DebtdetailsComponent,
    PaymentComponent,
    PaymentdetailsComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },      
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'home' },
      { path: 'customer-search', component: CustomersearchComponent },
      { path: 'debt-details', component: DebtdetailsComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'payment-details', component: PaymentdetailsComponent },
  ])    
  ],
  providers: 
  [
    
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    AuthenticationService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return "http://localhost:52500/";
}

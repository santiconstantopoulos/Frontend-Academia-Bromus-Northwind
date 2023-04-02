import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service'
import { CustomerComponent } from './customers/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    FilterPipe,
    CustomerComponent,
    CustomerDetailsComponent
  ],
  providers: [CustomerService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
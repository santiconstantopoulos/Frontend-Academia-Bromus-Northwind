import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [
    EditCustomerComponent,
    CustomersComponent
  ],
  exports:[
    EditCustomerComponent,
    CustomersComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule, 
    CommonModule
  ]
  
})
export class CustomerModule { }

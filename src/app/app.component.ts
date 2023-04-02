import { Component } from '@angular/core';
import { Customer } from './models/customer';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Customers';
  customers: Customer[] = [];
  customerToEdit?: Customer= {
    customerId: '',
    companyName: '',
    contactName: '',
    contactTitle: '',
    adress: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
    fax: ''
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService
    .getCustomers()
    .subscribe((result: Customer[]) => (this.customers = result));
    };

  updateCustomerList(customers: Customer[]): void{
    this.customers = customers;
  }

  editCustomer(customer: Customer) {
    if(customer){
      this.customerToEdit = customer;
    }
  }

  createCustomer(): void {
    if (!this.customerToEdit) {
      return;
    }
    this.customerService.addCustomer(this.customerToEdit)
      .subscribe(customer => {
        this.customers.push(customer);
      }),
      (error: any) => {
        console.error(error);
        alert('Error al agregar el cliente. Intente nuevamente más tarde.');
      }
  }
}

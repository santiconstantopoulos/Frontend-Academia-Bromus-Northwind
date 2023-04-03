import { Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  title = 'Customer';
  customers: Customer[] = [];
  customerToEdit?: Customer;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService
      .getCustomers()
      .subscribe((result: Customer[]) => (this.customers = result));
  }

  createCustomer() {
    this.customerToEdit = new Customer();
    this.customerToEdit.customerId= " ";
    
  }

  updateCustomerList(customers: Customer[]) {
    this.customers = customers;
  }

  deleteCustomer(customer: Customer) {
    this.customerService
        .deleteCustomer(customer.customerId)
        .subscribe();
      }

  editCustomer(customer: Customer) {
    this.customerToEdit = customer;
  }

}

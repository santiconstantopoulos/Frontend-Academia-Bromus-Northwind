import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent {
  
  title = 'Customer';
  customers: Customer[] = [];
  customerToEdit?: Customer;
  currentPage = 0;
  pageSize = 5;
  hasMoreCustomers = true; // agregamos la propiedad booleana

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((result: Customer[]) => {
      this.customers = result;
      this.hasMoreCustomers = this.customers.length > 5; // establecemos la propiedad booleana
    });
  }

  getCustomersToDisplay(): Customer[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.customers.slice(startIndex, endIndex);
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.updateCustomerList(this.getCustomersToDisplay());
  }

  goToNextPage() {
    this.currentPage = this.currentPage + 1;
    this.updateCustomerList(this.getCustomersToDisplay());
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
        .subscribe(() => {
        //avisar que hubo cambio y que se renderize
        this.updateCustomerList(this.getCustomersToDisplay());
      });
    }

  editCustomer(customer: Customer) {
    this.customerToEdit = customer;
  }
}

import { Component, EventEmitter, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent {
  constructor(private customerService: CustomerService) { }

  Customers: Customer[] = [];
  selectedCustomer?: Customer;
  customerToEdit: Customer = {
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

  isDeleting = false;

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(Customers => this.Customers = Customers);
  }

  createCustomer(): void {
    if (!this.customerToEdit || !this.customerToEdit.customerId){
      return;
    }
    this.customerService.addCustomer(this.customerToEdit)
      .subscribe(customer => {
        this.Customers.push(customer);
        this.customerService.getCustomers().subscribe(customers => {
          this.Customers = customers;
      });
      }),
      (      error: any) => {
        // Manejar el error aquí
        console.error(error);
        alert('Error al agregar el cliente. Intente nuevamente más tarde.');
      }
  }

  updateCustomer(customer: Customer): void {
    if (!customer || !customer.customerId) {
      return;
    }
    else {

      this.customerService.updateCustomer(customer).subscribe(() => {
        this.getCustomers();
      });
    }
  }


  deleteCustomer(customer: Customer): void {
    if (!customer || !customer.customerId) {
      return;
    }
    else {
      this.customerService.deleteCustomer(customer.customerId)
        .subscribe(() => {
          this.Customers = this.Customers.filter(c => c.customerId !== customer.customerId);
          if (this.selectedCustomer?.customerId === customer.customerId) {
            this.selectedCustomer = undefined;
          }
        });
    }
  }


}
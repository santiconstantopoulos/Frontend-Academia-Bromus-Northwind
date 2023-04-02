import { Component, EventEmitter, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})




export class CustomerComponent {
  constructor(private customerService: CustomerService) { }

  showAll = false;
  filteredCustomers: Customer[] = [];
  searchTerm: string= '';
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
    //console.log("Aca entra");
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

  filterCustomers(): void {
    if (!this.searchTerm) {
      this.filteredCustomers = this.Customers;
    } else {
      const searchTerm = this.searchTerm.toLowerCase();
      this.filteredCustomers = this.Customers.filter(customer => {
        return (
          customer.companyName.toLowerCase().includes(searchTerm) ||
          customer.contactName.toLowerCase().includes(searchTerm)
        );
      });
    }
  }
  
  showAllCustomers(): void {
    this.showAll = true;
    this.filterCustomers();
  }


}
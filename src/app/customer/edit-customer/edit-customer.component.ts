import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  @Input() customer?: Customer;
  @Output() customersUpdated = new EventEmitter<Customer[]>();
  
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  updateCustomer(customer: Customer) {
    this.customerService
      .updateCustomer(customer)
      .subscribe();
  }
  createCustomer(customer: Customer) {
    this.customerService
      .addCustomer(customer)
      .subscribe();
  }
}

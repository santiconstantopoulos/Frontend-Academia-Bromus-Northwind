import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  @Input() customer?: Customer;
  @Output() customerUpdated = new EventEmitter<Customer>();
  isDeleting= false;
  isUpdating = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  updateCustomer(customer: Customer): void {
    if (!customer || !customer.customerId) {
      return;
    }
    else {
      this.customerService.updateCustomer(customer).subscribe((updatedCustomer: Customer) => {
        this.customerUpdated.emit(updatedCustomer);
      });
    }
  }

  deleteCustomer(customer: Customer) {
    this.customerService
      .deleteCustomer(customer)
      .subscribe((customers: Customer[]) => this.customerUpdated.emit(customers));
  }

}


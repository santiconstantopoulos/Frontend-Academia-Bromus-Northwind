import { Component, Input } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  @Input() customer?: Customer;

}

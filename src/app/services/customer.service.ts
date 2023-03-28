import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

const apiUrl = 'http://localhost:5000/api/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(apiUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${apiUrl}/${customer.id}`;
    return this.http.put<Customer>(url, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    const url = `${this['apiUrl']}/${id}`;
    return this.http.delete(url);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerUrl = 'https://localhost:7192/api/customers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    let response = http.get(this.customerUrl);
    response.subscribe((data) => console.log(data));
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.customerUrl}/${customer.customerId}`;
    return this.http.put<Customer>(url, customer);
  }

  public deleteCustomer(customerId?: string): Observable<Customer> {
    const url = `${this.customerUrl}/${customerId}`;
    return this.http.delete<Customer>(url, this.httpOptions);
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customer);
  }
}

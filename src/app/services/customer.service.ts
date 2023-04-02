import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private customerUrl = 'https://localhost:7192/api/customers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {

    let response = http.get(this.customerUrl);
    response.subscribe((data) => console.log(data));
    
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }



  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.customerUrl}/${customer.customerId}`;
    const { customerId, ...rest } = customer;
    return this.http.put<Customer>(url, rest);
  }
  
  public deleteCustomer(customerId: string): Observable<any> {
    const url = `${this.customerUrl}/${customerId}`; 
    return this.http.delete<void>(url, this.httpOptions);
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    console.log("aca entra tambien");
    return this.http.post<Customer>(this.customerUrl, customer);
  }

}


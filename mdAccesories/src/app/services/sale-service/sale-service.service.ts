import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from './../../API_URL/api_url';
import { Sale } from './../../model/sale'; 

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {

  private API_URL = ApiUrl.SALE;
  years = [];

  constructor(private http: HttpClient) { }

  public fillYears() {
    this.years = [];
    for (let i = 2018; i <= new Date().getFullYear(); i++) {
      this.years.push(i);      
    }
  }

  public getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API_URL}/sales`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getSalesById(saleId: any): Observable<Sale> {
    return this.http.post<Sale>(`${this.API_URL}/get-sale`, {id: saleId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteSaleById(saleId: any) {
    return this.http.delete(`${this.API_URL}/${saleId}`, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public updateNewUserName(userNameNew: string, userNameOld: string) {
    return this.http.post(`${this.API_URL}/update-new-username`, {userNameNew: userNameNew, userNameOld: userNameOld}, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getSalesByParams(date_approved:  string, userName: string, userMail: string): Observable<Sale[]> {
    return this.http.post<Sale[]>(`${this.API_URL}/search-by-params`, {date_approved: date_approved, userName: userName, userMail: userMail}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getSalesByDelivered(deliver: any): Observable<Sale[]> {
    return this.http.post<Sale[]>(`${this.API_URL}/get-sales-deliver`, {delivered: deliver}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getTotalsMonthByYear(year: string): Observable<number[]> {
    return this.http.post<number[]>(`${this.API_URL}/get-totals-year`, year).pipe(
      catchError(this.errorHandler)
    )
  }

  public changeDeliver(sale: Sale): Observable<Sale> {
    const formData = this.formDataCreate(sale);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Sale>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  private formDataCreate(sale: Sale) {
    const formData = new FormData();
    formData.append("id", sale.id);
    formData.append("sale_detail", sale.sale_detail);
    formData.append("total", sale.total);
    formData.append("installments", sale.installments);
    formData.append("status", sale.status);
    formData.append("date_approved", sale.date_approved);
    formData.append("payment_method_id", sale.payment_method_id);
    formData.append("payment_type_id", sale.payment_type_id);
    formData.append("userName", sale.userName);
    formData.append("userMail", sale.userMail);
    formData.append("delivered", sale.delivered.toString());
    return formData;
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }

}

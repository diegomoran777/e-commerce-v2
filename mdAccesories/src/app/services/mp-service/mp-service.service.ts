import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from '../../API_URL/api_url';
import { ProductCart } from '../../model/productCart';


@Injectable({
  providedIn: 'root'
})
export class MpServiceService {

  private API_URL = ApiUrl.MP_PAY;

  constructor(private http: HttpClient) { }

  public goMp(userName: string) {
    return this.http.post(`${this.API_URL}/go-mp`, {userName: userName}).pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from '../../API_URL/api_url';
import { Product } from '../../model/product';
import { ProductCart } from '../../model/productCart';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  private API_URL = ApiUrl.PRODUCT_CART;

  constructor(private http: HttpClient) { }

  public getCartAllProducts(userName: string): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.API_URL}/cart-products`, {userName: userName}).pipe(
      catchError(this.errorHandler)
    )
  }

  public getCartAllProductsAmount(userName: string): Observable<ProductCart[]> {
    return this.http.post<ProductCart[]>(`${this.API_URL}/cart-products-length`, {userName: userName}).pipe(
      catchError(this.errorHandler)
    )
  }

  public addProductToCart(userName: string, product: Product) {
    return this.http.post(`${this.API_URL}/add-product`, {userName: userName, id: product.id}).pipe(
      catchError(this.errorHandler)
    )
  }

  public deleteOneProductFromCart(userName: string, productId: string) {
    return this.http.post(`${this.API_URL}/delete-product`, {userName: userName, id: productId}, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteAllProductsByProductIdFromCart(userName: string, productId: string) {
    return this.http.post(`${this.API_URL}/delete-productsid`, {userName: userName, id: productId}, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public updateNewUserNameOnLists(userNameNew: string, userNameOld: string) {
    return this.http.post(`${this.API_URL}/update-new-username`, {userNameNew: userNameNew, userNameOld: userNameOld}, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }

}

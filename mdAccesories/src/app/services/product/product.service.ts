import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from './../../API_URL/api_url';
import { Product } from './../../model/product';
import { Photo } from 'src/app/model/photo';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = ApiUrl.PRODUCT; 
  //private photosParse: string = '';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getProductsById(productId: any): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.API_URL}/getproductid`, {id: productId}).pipe(
      catchError(this.errorHandler)
    );
  }
  
  public getProduct(productId: any): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/get-product`, {id: productId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteProductById(productId: any) {
    return this.http.delete(`${this.API_URL}/${productId}`, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public updateNewCategoryName(categoryNameNew: string, categoryNameOld: string) {
    return this.http.post(`${this.API_URL}/update-new-categoryname`, {categoryNameNew: categoryNameNew, categoryNameOld: categoryNameOld}, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getProductsByCategoryId(categoryId: any): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.API_URL}/bycategoryid`, {id: categoryId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getProductsByCategoryAndProductId(categoryId: any, productId: any): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.API_URL}//bycategory-productid`, {categoryId: categoryId, id: productId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public setProductAdd(product: Product, addUpdate: boolean) {
    const productFilter = new Product();
    productFilter.setNumberExtern(this.isUndefined(product.numberExtern));
    productFilter.setName(this.isUndefined(product.name));
    productFilter.setCategoryId(product.categoryId);
    productFilter.setCategoryName(this.isUndefined(product.categoryName));
    productFilter.setDescription(this.isUndefined(product.description));
    productFilter.setPhotos(this.isUndefined(product.photos));
    productFilter.setPrice(this.isUndefined(product.price));
    productFilter.setType(this.isUndefined(product.type));

    if(addUpdate) {
      productFilter.setId(product.id);
      return productFilter;
    } else {
      return productFilter;
    }  
  }

  public addProduct(product: Product): Observable<Product> {
    const productAdd = this.setProductAdd(product, false);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Product>(`${this.API_URL}/save-update`, productAdd, {headers: headers});
  }

  public updateProduct(product: Product): Observable<Product> {
    const productUpdate = this.setProductAdd(product, true);
    return this.http.post<Product>(`${this.API_URL}/save-update`, productUpdate);
  }

  public isUndefined(attr: any) {
    return attr !== '' && attr !== undefined ? attr : '---';
  }

  public getAllTypes() {
    return this.http.get(`${this.API_URL}/types`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getTypesById(categoryId: any) {
    return this.http.get(`${this.API_URL}/types/${categoryId}`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getProductsByParams(productName:  string, numberExtern: string, type: string, categoryId: string): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.API_URL}/search-by-paramsid`, {searchByName: productName, searchByNumberEx: numberExtern, searchByType: type, categoryId: categoryId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public filterPhotoList(photoList: Array<Photo>, unknownProduct: string): Array<Photo> {
    
    if(photoList.filter(p => p.name !== '').length === 0) {
      return new Array<Photo>(new Photo(unknownProduct));
    } else {
      return photoList.filter(p => p.name !== '');
    }
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }
}

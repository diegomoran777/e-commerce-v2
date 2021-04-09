import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from '../../API_URL/api_url';
import { Category } from '../../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL = ApiUrl.CATEGORY;

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}/categories`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getCategoriesByType(type: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}/categories-by-type/${type}`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getCategoryById(categoryId: any): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.API_URL}/getcategoryid`, {id: categoryId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getCategory(categoryId: any): Observable<Category> {
    return this.http.post<Category>(`${this.API_URL}/get-category`, {id: categoryId}).pipe(
      catchError(this.errorHandler)
    );
  }
  
  public deleteCategoryProductsById(categoryId: any) {
    return this.http.delete(`${this.API_URL}/category-products/${categoryId}`, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteCategoryImagesById(categoryId: any) {
    return this.http.delete(`${this.API_URL}/category-images/${categoryId}`, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public addCategory(category: Category): Observable<Category> {
    const formData = this.formDataCreate(category, false);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Category>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  public updateCategory(category: Category): Observable<Category> {
    const formData = this.formDataCreate(category, true);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Category>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  private formDataCreate(category: Category, addUpdate: boolean) {
    const formData = new FormData();
    formData.append("name", this.isUndefined(category.name));
    formData.append("description", this.isUndefined(category.description));
    formData.append("photo", this.isUndefined(category.photo));
    formData.append("type", this.isUndefined(category.type));
    if(addUpdate) {
      formData.append("id", category.id);
      return formData;
    } else {
      return formData;
    }
  }

  public isUndefined(attr: any) {
    return attr !== '' && attr !== undefined ? attr : '---';
  }

  public getCategoriesByParams(categoryName: string, type: string): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.API_URL}/search-by-params`, {searchByName: categoryName, searchByType: type}).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }
  
}

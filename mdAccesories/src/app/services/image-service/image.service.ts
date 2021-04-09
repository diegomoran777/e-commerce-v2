import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from './../../API_URL/api_url';
import { Image } from './../../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private API_URL = ApiUrl.IMAGE;

  constructor(private http: HttpClient) { }

  public getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.API_URL}/images`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getImagesById(imageId: any): Observable<Image[]> {
    return this.http.post<Image[]>(`${this.API_URL}/getimagetid`, {id: imageId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getImage(imageId: any): Observable<Image> {
    return this.http.post<Image>(`${this.API_URL}/get-image`, {id: imageId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteImageById(imageId: any) {
    return this.http.delete(`${this.API_URL}/${imageId}`, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getImagesByCategoryId(categoryId: any): Observable<Image[]> {
    return this.http.post<Image[]>(`${this.API_URL}/bycategoryid`, {id: categoryId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getImagesByCategoryAndImageId(categoryId: any, imageId: any): Observable<Image[]> {
    return this.http.post<Image[]>(`${this.API_URL}//bycategory-imageid`, {categoryId: categoryId, id: imageId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public addImage(image: Image): Observable<Image> {
    const formData = this.formDataCreate(image, false);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Image>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  public updateImage(image: Image): Observable<Image> {
    const formData = this.formDataCreate(image, true);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Image>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  private formDataCreate(image: Image, addUpdate: boolean) {
    const formData = new FormData();
    formData.append("name", this.isUndefined(image.name));
    formData.append("type", this.isUndefined(image.type));
    formData.append("description", this.isUndefined(image.description));
    formData.append("photo", this.isUndefined(image.photo));
    formData.append("categoryId", image.categoryId);
    formData.append("categoryName", this.isUndefined(image.categoryName));
    if(addUpdate) {
      formData.append("id", image.id);
      return formData;
    } else {
      return formData;
    }
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

  public getImagesByParams(imageName:  string, type: string, categoryId: string): Observable<Image[]> {
    return this.http.post<Image[]>(`${this.API_URL}/search-by-paramsid`, {searchByName: imageName, searchByType: type, categoryId: categoryId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public updateNewCategoryName(categoryNameNew: string, categoryNameOld: string) {
    return this.http.post(`${this.API_URL}/update-new-categoryname`, {categoryNameNew: categoryNameNew, categoryNameOld: categoryNameOld}, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }
}
